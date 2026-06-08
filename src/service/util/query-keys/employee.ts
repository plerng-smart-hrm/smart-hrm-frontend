export const employeeKeys = {
  list_employee: "list_employee",
};

export const employeeDetailKey = (id?: number) => ["employee", "detail", id ?? "new"];
