import { DataTableSkeleton } from "./DataTableSkeleton";

const TableLoading = () => {
    return (
        <DataTableSkeleton
            columnCount={6}
            searchableColumnCount={1}
            filterableColumnCount={0}
            cellWidths={[
                "10rem",
                "10rem",
                "10rem",
                "10rem",
                "8rem",
                "5rem",
            ]}
            shrinkZero
        />
    )
}

export default TableLoading;