export const queryKeys = {
  workingShifts: {
    root: ["workingShifts"] as const,

    list: (pageIndex?: number, pageSize?: number) =>
      ["workingShifts", "list", { pageIndex, pageSize }] as const,

    detail: (id?: number) => ["workingShifts", "detail", id] as const,

    dropdown: () => ["workingShifts", "detail"] as const,
  },
};
