"use client";

import { IPayroll } from "@/types/admin/payroll";
import { BD, fmtMoney, num } from "./payroll-table-utils";

interface Props {
  payroll?: IPayroll | null;
}

export default function AllowancesTable({ payroll }: Props) {
  const bonusRows = [
    { label: "Attendance Bonus", amount: fmtMoney(num(payroll?.bonusAttendance)) },
    { label: "Seniority Bonus", amount: fmtMoney(num(payroll?.bonusSeniority)) },
    { label: "Position Bonus", amount: fmtMoney(num(payroll?.bonusPosition)) },
    { label: "Technical Bonus", amount: fmtMoney(num(payroll?.bonusTechnical)) },
    { label: "Target Bonus", amount: fmtMoney(num(payroll?.bonusTarget)) },
  ];

  const allowanceRows = [
    { label: "OT Food", amount: fmtMoney(num(payroll?.allowanceOtFood)) },
    { label: "Lunch", amount: fmtMoney(num(payroll?.allowanceLunch)) },
    { label: "Milk", amount: fmtMoney(num(payroll?.allowanceMilk)) },
    { label: "Housing", amount: fmtMoney(num(payroll?.allowanceHousing)) },
    { label: "Transport", amount: fmtMoney(num(payroll?.allowanceTransport)) },
    { label: "Skill", amount: fmtMoney(num(payroll?.allowanceSkill)) },
    { label: "Night Shift", amount: fmtMoney(num(payroll?.allowanceNightShift)) },
    { label: "Other", amount: fmtMoney(num(payroll?.allowanceOther)) },
  ];

  const footerBg = "color-mix(in srgb, var(--total-head) 85%, black 15%)";
  const subBg = "var(--total-body)";

  const renderRows = (rows: { label: string; amount: string }[], bg: string) =>
    rows.map((row, i) => (
      <tr key={i}>
        <td style={{ backgroundColor: bg }} className={`${BD} px-2 py-[3px]`}>
          {row.label}
        </td>
        <td style={{ backgroundColor: bg }} className={`${BD} px-2 py-[3px] text-right tabular-nums`}>
          {row.amount}
        </td>
      </tr>
    ));

  return (
    <table className="w-full border-collapse text-xs" style={{ color: "var(--text-main)" }}>
      <thead>
        <tr>
          <th
            colSpan={2}
            style={{ backgroundColor: "var(--payment-head)" }}
            className={`${BD} px-3 py-1.5 text-center font-bold`}
          >
            Allowances &amp; Bonuses
          </th>
        </tr>
        <tr>
          <th style={{ backgroundColor: "var(--payment-head)" }} className={`${BD} px-2 py-1 text-left font-semibold`}>
            Description
          </th>
          <th
            style={{ backgroundColor: "var(--payment-head)" }}
            className={`${BD} px-2 py-1 text-right font-semibold w-24`}
          >
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colSpan={2}
            style={{ backgroundColor: "var(--total-head)" }}
            className={`${BD} px-2 py-[3px] font-semibold`}
          >
            Bonuses
          </td>
        </tr>
        {renderRows(bonusRows, "var(--payment-body)")}
        <tr>
          <td style={{ backgroundColor: subBg }} className={`${BD} px-2 py-[3px] font-semibold`}>
            Bonus Total
          </td>
          <td
            style={{ backgroundColor: subBg }}
            className={`${BD} px-2 py-[3px] text-right font-semibold tabular-nums`}
          >
            {fmtMoney(num(payroll?.bonusTotal), true)}
          </td>
        </tr>

        <tr>
          <td
            colSpan={2}
            style={{ backgroundColor: "var(--food-head)" }}
            className={`${BD} px-2 py-[3px] font-semibold`}
          >
            Allowances
          </td>
        </tr>
        {renderRows(allowanceRows, "var(--food-body)")}
        <tr>
          <td style={{ backgroundColor: subBg }} className={`${BD} px-2 py-[3px] font-semibold`}>
            Allowance Total
          </td>
          <td
            style={{ backgroundColor: subBg }}
            className={`${BD} px-2 py-[3px] text-right font-semibold tabular-nums`}
          >
            {fmtMoney(num(payroll?.allowanceTotal), true)}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 font-bold`}>
            Gross Salary
          </td>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 text-right font-bold tabular-nums`}>
            {fmtMoney(num(payroll?.grossSalary), true)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
