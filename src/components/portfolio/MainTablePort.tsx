"use client";

import { useState } from "react";
import AdjustableTablePort from "./AdjustableTablePort";
import CurrentTablePort from "./CurrentTablePort";
import { AdjustedValue, Stock } from "@/types/stock";

export default function MainTablePort() {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      id: crypto.randomUUID(),
      symbol: "",
      amount: "",
    },
  ]);
  const [adjustValue, setAdjustValue] = useState<AdjustedValue[]>([
    {
      id: stocks[0].id,
      percentage: "",
      amount: "",
    },
  ]);

  const [totalCurrentMoney, setTotalCurrentMoney] = useState<number>(0);
  const [totalAdjustMoney, setTotalAdjustMoney] = useState<number>(0);

  const addStock = () => {
    const fieldId = crypto.randomUUID();
    setStocks((prev) => [...prev, { id: fieldId, symbol: "", amount: "" }]);
    setAdjustValue((prev) => [
      ...prev,
      { id: fieldId, percentage: "", amount: "" },
    ]);
  };

  const removeStock = (id: string) => {
    setStocks((prev) =>
      prev.length === 1 ? prev : prev.filter((stock) => stock.id !== id)
    );
    setAdjustValue((prev) =>
      prev.length === 1 ? prev : prev.filter((item) => item.id !== id)
    );
  };

  const handleCalculateTotalDifference = () => {
    if (totalCurrentMoney >= 0 && totalAdjustMoney >= 0)
      return Math.abs(totalCurrentMoney - totalAdjustMoney);
    return 0;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <CurrentTablePort
        stocks={stocks}
        setStocks={setStocks}
        addStock={addStock}
        removeStock={removeStock}
        setTotalCurrentMoney={setTotalCurrentMoney}
      />
      <AdjustableTablePort
        stocks={stocks}
        adjustValue={adjustValue}
        totalAdjustMoney={totalAdjustMoney}
        setAdjustValue={setAdjustValue}
        setTotalAdjustMoney={setTotalAdjustMoney}
        totalDifference={handleCalculateTotalDifference()}
      />
    </div>
  );
}
