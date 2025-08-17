"use client";

import { Stock } from "@/types/stock";
import { SetStateAction, useEffect } from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export default function CurrentTablePort({
  stocks,
  setStocks,
  addStock,
  removeStock,
  setTotalCurrentMoney,
}: {
  stocks: Stock[];
  setStocks: (stocks: SetStateAction<Stock[]>) => void;
  addStock: () => void;
  removeStock: (id: string) => void;
  setTotalCurrentMoney: (totalMoney: number) => void;
}) {
  const total = stocks.reduce((sum, r) => {
    if (r.amount != "") {
      const n = parseFloat(r.amount);
      return sum + (Number.isFinite(n) ? n : 0);
    } else {
      return sum;
    }
  }, 0);

  const updateRow = (id: string, patch: Partial<Stock>) => {
    setStocks((prev: Stock[]) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  useEffect(() => {
    if (total > 0) {
      setTotalCurrentMoney(total);
    }
  }, [total]);

  return (
    <div className="max-w-3xl rounded-xl border bg-background p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-sm text-background">
              <th className="p-3">หุ้น (Symbol)</th>
              <th className="p-3">มูลค่าสินทรัพย์ (USD)</th>
              <th className="p-3 text-right">สัดส่วนปัจจุบัน (%)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const amount = stock.amount !== "" ? parseFloat(stock.amount) : 0;
              const amt = typeof amount === "number" ? amount : 0;
              const percent = total > 0 ? (amt / total) * 100 : 0;

              return (
                <tr key={stock.id} className="border-b last:border-0">
                  <td className="p-3 align-middle">
                    <input
                      value={stock.symbol}
                      onChange={(e) =>
                        updateRow(stock.id, {
                          symbol: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="เช่น AAPL, AMZN, PTTEP"
                      className="w-full rounded-md border px-3 py-2 outline-none focus:ring"
                    />
                  </td>
                  <td className="p-3 align-middle">
                    <input
                      inputMode="decimal"
                      value={stock.amount === "" ? "" : stock.amount}
                      onChange={(e) =>
                        updateRow(stock.id, {
                          amount: e.target.value,
                        })
                      }
                      placeholder="เช่น 15000"
                      className="w-full rounded-md border px-3 py-2 text-right outline-none focus:ring"
                    />
                  </td>
                  <td className="p-3 align-middle text-right tabular-nums">
                    <div className="flex justify-between">
                      <span>
                        {!Number.isNaN(percent.toFixed(2))
                          ? percent.toFixed(2)
                          : "0.00"}
                        %
                      </span>
                      <button
                        className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
                        onClick={() => removeStock(stock.id)}
                        title="ลบแถว"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t bg-gray-50 font-medium text-background">
              <td className="p-3">รวม</td>
              <td className="p-3 text-right tabular-nums">
                {currency.format(total)}
              </td>
              <td className="p-3 text-right">100.00%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={addStock}
        >
          + เพิ่มแถว
        </button>
      </div>
    </div>
  );
}
