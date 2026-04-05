import type { ColumnSort, Row } from "@tanstack/react-table";

import type { z } from "zod";

import type { DataTableConfig } from "@/config/data-table";
import type { filterSchema } from "@/lib/parsers";

export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type StringKeyOf<TData> = Extract<keyof TData, string>;

export interface SearchParams {
    [key: string]: string | string[] | undefined;
}

export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    count?: number;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
    id: StringKeyOf<TData>;
}

export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[];

export type ColumnType = DataTableConfig["columnTypes"][number];

export type FilterOperator = DataTableConfig["globalOperators"][number];

export type JoinOperator = DataTableConfig["joinOperators"][number]["value"];

export interface DataTableFilterField<TData> {
    value: any;
    id: StringKeyOf<TData>;
    label: string;
    placeholder?: string;
    options?: Option[];
}

export interface DataTableAdvancedFilterField<TData>
    extends DataTableFilterField<TData> {
    type: ColumnType;
}

export type Filter<TData> = Prettify<
    Omit<z.infer<typeof filterSchema>, "id"> & {
        id: StringKeyOf<TData>;
    }
>;

export interface DataTableRowAction<TData> {
    row: Row<TData>;
    type: "update" | "delete";
}

export interface Trainee {
    id: number;
    id_card: string;
    trainee_name: string;
    phone: string;
    gender: string;
    profile_url: string;
    position: string;
    employer_name: string;
    remarks: string;
}

export interface Course {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}
