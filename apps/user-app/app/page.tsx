import { db } from "@repo/orm";
import { redirect } from 'next/navigation'

export const runtime = "nodejs";

export default async function Page() {
  const user = await db.user.findMany();

 if (user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}

