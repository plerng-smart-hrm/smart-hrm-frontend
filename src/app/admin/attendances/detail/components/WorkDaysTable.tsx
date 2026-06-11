"use client";

import { IPayroll } from "@/types/admin/payroll";
import { BD, fmtMoney, fmtQty, num } from "./payroll-table-utils";

interface Props {
  payroll?: IPayroll | null;
}

export default function WorkDaysTable({ payroll }: Props) {
  const rows = [
    {
      label:  "Normal Hours",
      qty:    fmtQty(num(payroll?.totalNormalHours), "h"),
      amount: fmtMoney(num(payroll?.payNormalHours)),
      bg:     "var(--normal-body)",
    },
    {
      label:  "Night Hours",
      qty:    fmtQty(num(payroll?.totalNightHours), "h"),
      amount: fmtMoney(num(payroll?.payNightHours)),
      bg:     "var(--overtime-body)",
    },
    {
      label:  "PH Pay",
      qty:    fmtQty(num(payroll?.totalPhHours), "h"),
      amount: fmtMoney(num(payroll?.payPh)),
      bg:     "var(--ph-row)",
    },
    {
      label:  "Leave Pay",
      qty:    fmtQty(num(payroll?.leaveDays), "d"),
      amount: fmtMoney(num(payroll?.payLeave)),
      bg:     "var(--leave-body)",
    },
    {
      label:  "OT 150%",
      qty:    fmtQty(num(payroll?.totalOt1Hours), "h"),
      amount: fmtMoney(num(payroll?.payOt1)),
      bg:     "var(--overtime-body)",
    },
    {
      label:  "OT 200%",
      qty:    fmtQty(num(payroll?.totalOt2Hours), "h"),
      amount: fmtMoney(num(payroll?.payOt2)),
      bg:     "color-mix(in srgb, var(--overtime-body) 72%, black 10%)",
    },
    {
      label:  "Night OT",
      qty:    fmtQty(num(payroll?.totalOtNightHours), "h"),
      amount: fmtMoney(num(payroll?.payOtNight)),
      bg:     "var(--time-out-body)",
    },
  ];

  const footerBg = "color-mix(in srgb, var(--total-head) 85%, black 15%)";

  return (
    <table className="w-full border-collapse text-xs" style={{ color: "var(--text-main)" }}>
      <thead>
        <tr>
          <th
            colSpan={3}
            style={{ backgroundColor: "var(--total-head)" }}
            className={`${BD} px-3 py-1.5 text-center font-bold`}
          >
            Work Days / Earnings
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={{ backgroundColor: row.bg }} className={`${BD} px-2 py-[3px]`}>
              {row.label}
            </td>
            <td style={{ backgroundColor: row.bg }} className={`${BD} px-2 py-[3px] text-center tabular-nums`}>
              {row.qty}
            </td>
            <td style={{ backgroundColor: row.bg }} className={`${BD} px-2 py-[3px] text-right tabular-nums`}>
              {row.amount}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 font-bold`}>
            Time Salary
          </td>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 text-right font-bold tabular-nums`}>
            {fmtMoney(num(payroll?.payTotal), true)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
