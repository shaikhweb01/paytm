import { db } from "@repo/orm";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const balance = await db.balance.findUnique({
    where: {
      userId: Number(session.user.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen bg-blue-100 rounded-4xl mt-5">
      <div className="min-w-5xl py-8">

        {/* Page Title */}
        <h1 className="text-3xl text-gray-700 font-bold text-gray-800 mb-8">
          Transfer
        </h1>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Section */}
          <div className="space-y-6">
            <AddMoney />
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <BalanceCard
              amount={balance.amount}
              locked={balance.locked}
            />

            <div className="bg-white rounded-xl shadow-sm p-4">
              <OnRampTransactions transactions={transactions} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
