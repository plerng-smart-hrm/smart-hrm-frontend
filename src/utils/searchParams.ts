export function getSearchParams({
  pageIndex,
  pageSize,
  search,
  startDateTime,
  endDateTime,
}: {
  pageIndex?: string;
  pageSize?: string;
  search?: string;
  startDateTime?: string;
  endDateTime?: string;
}) {
  const page = parseInt(pageIndex ?? "0", 10); // Default to 0 for DataTable (0-based)
  const limit = parseInt(pageSize ?? "10", 10);
  const s = search ?? "";
  const _startDateTime = startDateTime ?? "";
  const _endDateTime = endDateTime ?? "";

  return {
    pageIndex: Number.isNaN(page) ? 0 : page, // 0-based for DataTable
    pageSize: Number.isNaN(limit) ? 10 : limit,
    search: s,
    startDateTime: _startDateTime,
    endDateTime: _endDateTime,
  };
}
