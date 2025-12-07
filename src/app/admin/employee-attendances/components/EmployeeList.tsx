"use client";
import React from "react";
import { LOCATIONS } from "./PositionSidebar";

interface EmployeeListProps {
  selectedPosition: string | null;
  selectedEmployee: string | null;
  onSelectEmployee: (employeeId: string) => void;
}

export default function EmployeeList({
  selectedPosition,
  selectedEmployee,
  onSelectEmployee,
}: EmployeeListProps) {
  const location = LOCATIONS.find((loc) => loc.id === selectedPosition);
  const employees = location?.employees || [];

  return (
    <div className="w-56 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-3 border-b border-slate-200 bg-slate-50">
        <h2 className="font-semibold text-sm text-slate-900">
          {selectedPosition ? `${selectedPosition} - Employees` : "Employees"}
        </h2>
        {selectedPosition && (
          <p className="text-xs text-slate-500 mt-1">
            {employees.length} employee{employees.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {selectedPosition ? (
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {employees.map((empId) => (
              <button
                key={empId}
                onClick={() => onSelectEmployee(empId)}
                className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                  selectedEmployee === empId
                    ? "bg-blue-100 text-blue-900 font-medium border border-blue-300"
                    : "text-slate-700 hover:bg-slate-100 border border-transparent"
                }`}
              >
                {empId}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm p-4 text-center">
          Select a position to view employees
        </div>
      )}
    </div>
  );
}