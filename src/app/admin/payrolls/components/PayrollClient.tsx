'use client';

import React, { useState } from "react";
import PayrollsTable from "./PayrollsTable";
import { Label } from "@/components/ui/label";
import MonthYearPicker from "./MonthYearPicker";
import { format } from "date-fns";

const PayrollClient = () => {
  const [date, setDate] = useState<Date>();
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (selectedDate: Date) => {
    setDate(selectedDate);
    const formattedMonth = format(selectedDate, "yyyy-MM");
    setSelectedMonth(formattedMonth);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium">
          Select Month:
        </Label>

        <MonthYearPicker value={date} onChange={handleMonthChange} />
      </div>
      <PayrollsTable selectedMonth={selectedMonth} />
    </div>
  );
};

export default PayrollClient;
