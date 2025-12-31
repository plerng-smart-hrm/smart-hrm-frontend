export const queryKeys = {
  devices: {
    root: ["devices"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["devices", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["devices", "detail", id] as const,
  },
};
