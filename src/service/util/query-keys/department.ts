export const queryKeys = {
  departments: {
    root: ["departments"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["departments", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["departments", "detail", id] as const,

    dropdown: () => ["departments", "dropdown"] as const,
  },
};
