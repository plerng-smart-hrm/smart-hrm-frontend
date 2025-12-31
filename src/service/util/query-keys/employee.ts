export const queryKeys = {
  employees: {
    root: ["employees"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["employees", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["employees", "detail", id] as const,
  },
};
