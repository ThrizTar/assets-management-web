export default function MainTablePlan() {
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-sm text-background">
              <th className="p-3 border-r" colSpan={2}>เดือน (Month)</th>
              <th className="p-3 border-r">รายรับ (Income)</th>
              <th className="p-3 border-r">รายจ่าย (Expense)</th>
              <th className="p-3 border-r">รายจ่าย (Expense)</th>
              <th className="p-3 border-r">รายจ่าย (Expense)</th>
              <th className="p-3 border-r">รายจ่าย (Expense)</th>
              <th className="p-3 border-r">รายจ่าย (Expense)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-50 text-sm text-background">
              <th className="p-3" colSpan={2}>รายรับ (Income)</th>
            </tr>
            <tr className="border-b bg-gray-50 text-sm text-background">
              <th className="p-3 border-r" rowSpan={2}>รายจ่าย (Expense)</th>
              <th className="p-3">รายจ่ายคงที่ (Fix cost)</th>
            </tr>
            <tr className="border-b bg-gray-50 text-sm text-background">
              <th className="p-3">รายจ่ายผันแปร (Variable cost)</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
