export const queryKeys = {
  categories: {
    list: () => ["categories", "list"],
    byId: (id?: number) => ["categories", "detail", id ?? "new"],
  },

  customers: {
    all: () => ["customer", "list"],
  },

  products: {
    all: () => ["products", "list"],
    byId: (id?: number) => ["products", "detail", id ?? "new"],
  },
  contractTypes: {
    root: ["contractTypes"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["contractTypes", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["contractTypes", "detail", id] as const,
  },
  contracts: {
    root: ["contracts"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["contracts", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["contracts", "detail", id] as const,
  },
  leaveTypes: {
    root: ["leaveTypes"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["leaveTypes", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["leaveTypes", "detail", id] as const,
  },
  leaveRequests: {
    root: ["leaveRequests"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["leaveRequests", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["leaveRequests", "detail", id] as const,
  },
  companies: {
    root: ["companies"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["companies", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["companies", "detail", id] as const,
  },
  employees: {
    root: ["employees"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["employees", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["employees", "detail", id] as const,
  },
  departments: {
    root: ["departments"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["departments", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["departments", "detail", id] as const,
  },
  sections: {
    root: ["sections"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["sections", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["sections", "detail", id] as const,
  },
  devices: {
    root: ["devices"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["devices", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["devices", "detail", id] as const,
  },
  holidays: {
    root: ["holidays"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["holidays", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["holidays", "detail", id] as const,
  },
  workingShifts: {
    root: ["workingShifts"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["workingShifts", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["workingShifts", "detail", id] as const,
  },
  healthChecks: {
    root: ["healthChecks"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["healthChecks", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["healthChecks", "detail", id] as const,
  },
  maternities: {
    root: ["maternities"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["maternities", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["maternities", "detail", id] as const,
  },
  vaccines: {
    root: ["vaccines"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["vaccines", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["vaccines", "detail", id] as const,
  },
  warnings: {
    root: ["warnings"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["warnings", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["warnings", "detail", id] as const,
  },
  attendanceLogs: {
    root: ["attendanceLogs"] as const,

    list: (
      pageIndex?: number,
      pageSize?: number,
      startDateTime?: string,
      endDateTime?: string
    ) =>
      [
        "attendanceLogs",
        "list",
        { pageIndex, pageSize, startDateTime, endDateTime },
      ] as const,

    detail: (id?: number) => ["attendanceLogs", "detail", id] as const,
  },

  attendanceSummaries: {
    root: ["attendanceSummaries"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["attendanceSummaries", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["attendanceSummaries", "detail", id] as const,
  },
};
