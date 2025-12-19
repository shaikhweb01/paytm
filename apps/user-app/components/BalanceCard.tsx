import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <div>
    <Card title="Balance text-black">
      <div className="space-y-3">

        {/* Unlocked Balance */}
        <div className="flex justify-between items-center text-sm text-gray-800 border-b border-gray-300 pb-2">
          <span className="font-medium">Unlocked Balance</span>
          <span className="font-semibold">
            ₹{(amount / 100).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Locked Balance */}
        <div className="flex justify-between items-center text-sm text-gray-800 border-b border-gray-300 pb-2">
          <span className="font-medium">Locked Balance</span>
          <span className="font-semibold">
            ₹{(locked / 100).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Total Balance */}
        <div className="flex text-right justify-between items-center text-base font-semibold text-black pt-2">
          <span>Total Balance</span>
          <span className="text-green-700">
            ₹{((amount + locked) / 100).toLocaleString("en-IN")}
          </span>
        </div>

      </div>
    </Card>
    </div>
  );
};

