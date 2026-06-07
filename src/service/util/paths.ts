import { employeeKeys } from "./query-keys/employee";
import { departmentKeys } from "./query-keys/department";
import { sectionKeys } from "./query-keys/section";
import { workingShiftKeys } from "./query-keys/working-shift";
import { deviceKeys } from "./query-keys/device";
import { holidayKeys } from "./query-keys/holiday";
import { contractKeys } from "./query-keys/contract";
import { companyKeys } from "./query-keys/company";
import { attendanceLogKeys } from "./query-keys/attendance-log";
import { attAdjustmentKeys } from "./query-keys/att-adjustment";
import { attendanceSummaryKeys } from "./query-keys/attendance-summary";
import { terminationKeys } from "./query-keys/termination";
import { payrollKeys } from "./query-keys/payroll";
import { timeShiftKeys } from "./query-keys/time-shift";

export const queryKeyMappingApiPath: Record<string, string> = {
  [employeeKeys.list_employee]: "/v1/employees",
  [departmentKeys.list_department]: "/v1/departments",
  [sectionKeys.list_section]: "/v1/sections",
  [timeShiftKeys.list_time_shift]: "/v1/time-shifts",
  [deviceKeys.list_device]: "/v1/devices",
  [holidayKeys.list_holiday]: "/v1/holidays",
  [contractKeys.list_contract]: "/v1/contracts",
  [companyKeys.list_company]: "/v1/companies",
  [attendanceSummaryKeys.list_attendance_summary]: "/v1/attendance-summary",
  [attendanceLogKeys.list_attendance_log]: "/v1/attendance-logs",
  [attAdjustmentKeys.list_att_adjustment]: "/v1/att-adjustments",
  [terminationKeys.list_termination]: "/v1/terminations",
  [payrollKeys.list_payroll]: "/v1/payrolls",
};
