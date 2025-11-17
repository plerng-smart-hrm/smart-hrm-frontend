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
  devices: {
    all: () => ["devices", "list"],
    byId: (id?: number) => ["devices", "detail", id ?? "new"],
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
};
