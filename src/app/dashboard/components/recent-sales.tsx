export function RecentSales() {
  const transactions = [
    { quantity: "9x", name: "Banan", category: "Mad > Frugt", amount: -23.0 },
    {
      quantity: "1x",
      name: "Hakket oksekød 8-10%",
      category: "Mad > Kød",
      amount: -49.0,
    },
    {
      quantity: "2x",
      name: "1kg. kartofler",
      category: "Mad > Grøntsager",
      amount: -21.0,
    },
    {
      quantity: "2x",
      name: "Mobilepay-overførsel",
      category: "Indtægter > Andet",
      amount: 450.0,
    },
    {
      quantity: "1x",
      name: "Oksemørbrad 1,6 kg.",
      category: "Mad > Kød",
      amount: -369.0,
    },
  ];

  return (
    <div className="space-y-8">
      {transactions.map((transaction, index) => (
        <div className="flex items-center" key={index}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
            {transaction.quantity}
          </div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {transaction.name}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-gray-500">Kategori:</span>
              <span className="text-gray-600">
                {" "}
                {transaction.category.split(" > ")[0]}{" "}
              </span>
              <span className="text-gray-400">&gt;</span>
              <span className="text-gray-800">
                {" "}
                {transaction.category.split(" > ")[1]}
              </span>
            </p>
          </div>
          <div
            className={`ml-auto font-medium ${
              transaction.amount < 0 ? "text-red-800/85" : "text-green-800/85"
            }`}
          >
            {transaction.amount > 0 ? "+" : ""}
            {transaction.amount.toFixed(2)} kr.
          </div>
        </div>
      ))}
    </div>
  );
}
