"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Appbar
      onSignin={() => signIn("credentials")}
      onSignout={async () => {
        await signOut({ redirect: false });
        router.push("/auth/signin");
      }}
      user={session?.user}
    />
  );
}
