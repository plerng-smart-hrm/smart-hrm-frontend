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
  holidays: {
    all: (pageIndex?: number, pageLimit?: number) => [
      "holidays",
      pageIndex,
      pageLimit,
    ],
    byId: (id?: number) => ["holidays", "detail", id ?? "new"],
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
};
