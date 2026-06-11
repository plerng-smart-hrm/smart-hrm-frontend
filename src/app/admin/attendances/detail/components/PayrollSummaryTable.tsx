"use client";

import { CSSProperties } from "react";
import { IPayroll } from "@/types/admin/payroll";
import { colorVars } from "./payroll-table-utils";
import WorkDaysTable from "./WorkDaysTable";
import AllowancesTable from "./AllowancesTable";
import TaxNetTable from "./TaxNetTable";

interface Props {
  payroll?: IPayroll | null;
}

export default function PayrollSummaryTable({ payroll }: Props) {
  return (
    <div className="mt-4" style={colorVars as CSSProperties}>
      <div className="flex flex-col border border-gray-300">
        <div className="border-b border-gray-300">
          <WorkDaysTable payroll={payroll} />
        </div>
        <div className="border-b border-gray-300">
          <AllowancesTable payroll={payroll} />
        </div>
        <div>
          <TaxNetTable payroll={payroll} />
        </div>
      </div>
    </div>
  );
}
