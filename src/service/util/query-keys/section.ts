export const queryKeys = {
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
