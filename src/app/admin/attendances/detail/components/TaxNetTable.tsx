"use client";

import { IPayroll } from "@/types/admin/payroll";
import { BD, fmtMoney, num } from "./payroll-table-utils";

interface Props {
  payroll?: IPayroll | null;
}

export default function TaxNetTable({ payroll }: Props) {
  const summaryRows = [
    { label: "Time Pay",        amount: fmtMoney(num(payroll?.payTotal),       true) },
    { label: "Bonus Total",     amount: fmtMoney(num(payroll?.bonusTotal),     true) },
    { label: "Allowance Total", amount: fmtMoney(num(payroll?.allowanceTotal), true) },
  ];

  const deductionRows = [
    { label: "NSSF",    amount: fmtMoney(num(payroll?.deductionNssf)) },
    { label: "Absence", amount: fmtMoney(num(payroll?.deductionAbsence)) },
    { label: "Late",    amount: fmtMoney(num(payroll?.deductionLate)) },
    { label: "Tax",     amount: fmtMoney(num(payroll?.deductionTax)) },
    { label: "Loan",    amount: fmtMoney(num(payroll?.deductionLoan)) },
    { label: "Other",   amount: fmtMoney(num(payroll?.deductionOther)) },
  ];

  const footerBg = "color-mix(in srgb, var(--total-head) 85%, black 15%)";

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
            Net Pay
          </th>
        </tr>
        <tr>
          <th style={{ backgroundColor: "var(--payment-head)" }} className={`${BD} px-2 py-1 text-left font-semibold`}>
            Description
          </th>
          <th style={{ backgroundColor: "var(--payment-head)" }} className={`${BD} px-2 py-1 text-right font-semibold w-24`}>
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2} style={{ backgroundColor: "var(--normal-head)" }} className={`${BD} px-2 py-[3px] font-semibold`}>
            Summary
          </td>
        </tr>
        {renderRows(summaryRows, "var(--payment-body)")}
        <tr>
          <td style={{ backgroundColor: "var(--total-body)" }} className={`${BD} px-2 py-[3px] font-semibold`}>
            Gross Salary
          </td>
          <td style={{ backgroundColor: "var(--total-body)" }} className={`${BD} px-2 py-[3px] text-right font-semibold tabular-nums`}>
            {fmtMoney(num(payroll?.grossSalary), true)}
          </td>
        </tr>

        <tr>
          <td colSpan={2} style={{ backgroundColor: "var(--leave-head)" }} className={`${BD} px-2 py-[3px] font-semibold`}>
            Deductions
          </td>
        </tr>
        {renderRows(deductionRows, "var(--payment-body)")}
      </tbody>
      <tfoot>
        <tr>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 font-bold`}>
            Net Salary
          </td>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 text-right font-bold tabular-nums`}>
            {fmtMoney(num(payroll?.netSalary), true)}
          </td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "var(--payment-body)" }} className={`${BD} px-2 py-[3px]`}>
            Salary Advance
          </td>
          <td style={{ backgroundColor: "var(--payment-body)" }} className={`${BD} px-2 py-[3px] text-right tabular-nums`}>
            {fmtMoney(num(payroll?.salaryAdvance))}
          </td>
        </tr>
        <tr>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 font-bold`}>
            Salary Balance
          </td>
          <td style={{ backgroundColor: footerBg }} className={`${BD} px-2 py-1 text-right font-bold tabular-nums`}>
            {fmtMoney(num(payroll?.salaryBalance), true)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
