"use client";
import React from "react";

const LOCATIONS = [
  {
    id: "A1",
    employees: [
      "A1.0001",
      "A1.0069",
      "A1.0070",
      "A1.0071",
      "A1.0073",
      "A1.0074",
      "A1.0075",
    ],
  },
  {
    id: "A2",
    employees: ["A2.0001", "A2.0002", "A2.0003"],
  },
  {
    id: "A3",
    employees: ["A3.0001", "A3.0002"],
  },
  {
    id: "A4",
    employees: ["A4.0001", "A4.0002", "A4.0003", "A4.0004"],
  },
  {
    id: "A5",
    employees: ["A5.0001", "A5.0002"],
  },
  {
    id: "Button",
    employees: ["Button.0001", "Button.0002"],
  },
  {
    id: "CL",
    employees: ["CL.0001"],
  },
  {
    id: "CUT",
    employees: ["CUT.0001", "CUT.0002", "CUT.0003"],
  },
  {
    id: "EMB",
    employees: ["EMB.0001", "EMB.0002"],
  },
  {
    id: "Ironing",
    employees: [
      "IR.0005",
      "IR.0004",
      "IR.0006",
      "IR.0008",
      "IR.0002",
      "IR.0011",
      "IR.0010",
      "IR.0009",
      "IR.0017",
      "IR.0022",
      "IR.0021",
      "IR.0025",
      "IR.0027",
      "IR.0030",
      "IR.0031",
      "IR.0032",
    ],
  },
  {
    id: "Packing",
    employees: ["Packing.0001", "Packing.0002", "Packing.0003"],
  },
  {
    id: "SR",
    employees: ["SR.0001", "SR.0002"],
  },
];

interface PositionSidebarProps {
  selectedPosition: string | null;
  selectedEmployee: string | null;
  onSelectPosition: (positionId: string) => void;
  onSelectEmployee: (employeeId: string) => void;
}

export default function PositionSidebar({
  selectedPosition,
  selectedEmployee,
  onSelectPosition,
  onSelectEmployee,
}: PositionSidebarProps) {
  const [expandedLocation, setExpandedLocation] = React.useState<string | null>(
    null
  );

  return (
    <div className="w-48 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-3 border-b border-slate-200">
        <h2 className="font-semibold text-sm text-slate-900">Locations</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {LOCATIONS.map((location) => (
            <div key={location.id}>
              <button
                onClick={() => {
                  const newExpanded =
                    expandedLocation === location.id ? null : location.id;
                  setExpandedLocation(newExpanded);
                  if (newExpanded) {
                    onSelectPosition(location.id);
                  }
                }}
                className="w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors text-slate-900 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>{location.id}</span>
                <span className="text-xs">
                  {expandedLocation === location.id ? "−" : "+"}
                </span>
              </button>
              {expandedLocation === location.id && (
                <div className="pl-4 space-y-1">
                  {location.employees.map((empId) => (
                    <button
                      key={empId}
                      onClick={() => onSelectEmployee(empId)}
                      className={`w-full text-left px-3 py-1 rounded text-xs transition-colors ${
                        selectedEmployee === empId
                          ? "bg-blue-100 text-blue-900 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {empId}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}