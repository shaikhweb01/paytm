import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@repo/orm";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        // 1️⃣ Missing credentials
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2️⃣ Find user
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // 3️⃣ Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        // 4️⃣ SUCCESS (this is critical)
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name
        };
      }
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  },

  pages: {
    signIn: "/signin"
  },

  secret: process.env.NEXTAUTH_SECRET
};
