"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeInfoCard from "./EmployeeInfoCard";
import AttendanceTable from "./AttendanceTable";
import MonthlyTotalsCard from "./MonthlyTotalsCard";
import { parseAsString, useQueryState } from "nuqs";
import { formatToYYYYMM } from "@/utils/shared-format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import useQueryShared from "@/stores/admin/useQuery/useQueryShared";
import { attendanceSummaryKeys } from "@/service/util/query-keys/attendance-summary";
import FullScreenLoading from "@/components/shared/fullscreen-loading";

const AttendanceDetailClient = () => {
  const [yearMonth, setYearMonth] = useQueryState("yearMonth", parseAsString.withDefault(formatToYYYYMM()));
  const [empCode, setEmpCode] = useQueryState("empCode", parseAsString.withDefault(""));

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState(empCode);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { data: attSummaryData } = useQueryShared({
    url: `/v1/attendance-summary/employee`,
    key: attendanceSummaryKeys.summary_by_employee,
    param: { empCode, yearMonth },
    setIsLoading,
    enable: empCode && yearMonth ? true : false,
  });

  const employee = attSummaryData?.data || undefined;
  const attendanceSummary = employee?.attendanceSummary || [];

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
    setYearMonth(formatToYYYYMM(date));
  };

  const handleSearch = () => {
    setEmpCode(searchInput);
  };

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 max-w-sm mb-4">
          <Input
            placeholder="Enter employee code..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} size="icon" variant="outline">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel - Employee Info */}
          <div className="col-span-12 lg:col-span-2 border-r pr-4">
            <EmployeeInfoCard employee={employee} />
          </div>

          {/* Center Panel - Attendance Table */}
          <div className="col-span-12 lg:col-span-8">
            <AttendanceTable
              attendanceData={attendanceSummary ?? []}
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
            />
          </div>

          {/* Right Panel - Monthly Totals */}
          <div className="col-span-12 lg:col-span-2 border-l pl-4">
            <MonthlyTotalsCard totals={employee?.totals ?? null} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceDetailClient;
