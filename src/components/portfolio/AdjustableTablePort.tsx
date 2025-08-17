"use client";

import { AdjustedValue, Stock } from "@/types/stock";
import { SetStateAction, useEffect, useState } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function AdjustableTablePort({
  stocks,
  adjustValue,
  totalAdjustMoney,
  totalDifference,
  setAdjustValue,
  setTotalAdjustMoney,
}: {
  stocks: Stock[];
  adjustValue: AdjustedValue[];
  totalAdjustMoney: number;
  totalDifference: number;
  setAdjustValue: (adjustValue: SetStateAction<AdjustedValue[]>) => void;
  setTotalAdjustMoney: (totalAdjustMoney: number) => void;
}) {
  // const totalMoney = adjustValue.reduce((sum, item) => {
  //   if (item.amount !== "") {
  //     return sum + parseFloat(item.amount);
  //   }
  //   return sum;
  // }, 0);

  const totalPercentage = adjustValue.reduce((sum, item) => {
    if (item.percentage !== "") {
      return sum + parseFloat(item.percentage);
    }
    return sum;
  }, 0);

  const updateRow = (id: string, patch: Partial<AdjustedValue>) => {
    setAdjustValue((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  const handleCalculateAmount = (percentage: number, itemIndex: number) => {
    if (stocks[itemIndex].amount === "") return "0.00%";

    if (itemIndex === 0) {
      const total = (parseFloat(stocks[itemIndex].amount) / percentage) * 100;
      setTotalAdjustMoney(total);
      return ((percentage / 100) * total).toFixed(2);
    } else {
      return ((percentage / 100) * totalAdjustMoney).toFixed(2);
    }
  };

  const handleCalculateDifference = (itemIndex: number) => {
    if (stocks[itemIndex].amount === "" || adjustValue[itemIndex].amount === "")
      return 0;

    const differences = Math.abs(
      parseFloat(stocks[itemIndex].amount) -
        parseFloat(adjustValue[itemIndex].amount)
    );
    return differences.toFixed(2);
  };

  return (
    <div className="max-w-3xl rounded-xl border bg-background p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm text-background">
              <th className="p-3 w-1/3 text-left">สัดส่วนเป้าหมาย (%)</th>
              <th className="p-3 w-1/3">มูลค่าสินทรัพย์เป้าหมาย (USD)</th>
              <th className="p-3 w-1/3 text-right">ส่วนต่าง (USD)</th>
            </tr>
          </thead>
          <tbody>
            {adjustValue.map((item, index) => {
              return (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="p-3 align-middle">
                    <input
                      value={item.percentage}
                      onChange={(e) =>
                        updateRow(item.id, {
                          percentage: e.target.value,
                          amount: handleCalculateAmount(
                            parseFloat(e.target.value),
                            index
                          ),
                        })
                      }
                      placeholder="เช่น 30"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring text-center"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      inputMode="decimal"
                      value={item.amount}
                      disabled
                      placeholder="Auto calculated"
                      className="w-full rounded-md border px-3 py-2 text-right outline-none focus:ring"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      inputMode="decimal"
                      value={handleCalculateDifference(index)}
                      disabled
                      placeholder="Auto calculated"
                      className="w-full rounded-md border px-3 py-2 text-right outline-none focus:ring"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t bg-gray-50 font-medium text-background">
              <td className="p-3">
                <div className="grid grid-cols-2">
                  <span>รวม</span>{" "}
                  <span className="text-right">{totalPercentage}%</span>
                </div>
              </td>
              <td className="p-3 text-right tabular-nums">
                {currency.format(
                  Number.isNaN(totalAdjustMoney) ? 0 : totalAdjustMoney
                )}
              </td>
              <td className="p-3 text-right tabular-nums">
                {currency.format(totalDifference)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
