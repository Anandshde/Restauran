import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download, Filter, Search } from "lucide-react";
import { Button } from "../button";
import { Input } from "../input";
import { Select } from "../select";
import { Spinner } from "../spinner";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/useTranslations";
import type {
  ColumnDef,
  DataTableProps,
  PaginationState,
  SortConfig,
} from "./types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useHotkeys } from "@/hooks/useHotkeys";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder,
  categoryFilter,
  onSearch,
  onCategoryChange,
  isLoading = false,
  emptyState,
  className,
  pagination,
  sorting,
  enableExport = false,
  exportFileName = "export",
  enableKeyboardShortcuts = false,
  ariaLabel,
  ariaDescription,
}: DataTableProps<T>) {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig[]>(
    sorting?.initialSort || []
  );
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagination?.initialPageSize || 10,
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold: 0.5,
    enabled: pagination?.mode === "infinite",
  });

  // Handle infinite scroll
  useEffect(() => {
    if (isIntersecting && pagination?.mode === "infinite") {
      const nextPage = paginationState.pageIndex + 1;
      if (nextPage < (pagination.pageCount || 0)) {
        setPaginationState((prev) => ({ ...prev, pageIndex: nextPage }));
        pagination.onPageChange?.({ ...paginationState, pageIndex: nextPage });
      }
    }
  }, [isIntersecting, pagination, paginationState]);

  // Handle multi-column sort
  const handleSort = useCallback(
    (columnId: string) => {
      setSortConfig((prevSort) => {
        const column = columns.find((col) => col.id === columnId);
        if (!column?.sortable) return prevSort;

        const maxSort = sorting?.maxSortColumns || 1;
        const columnIndex = prevSort.findIndex((sort) => sort.id === columnId);
        let newSort: SortConfig[] = [];

        if (columnIndex === -1) {
          // Add new sort
          newSort = [...prevSort, { id: columnId, direction: "asc" }];
          if (newSort.length > maxSort) newSort.shift();
        } else {
          // Toggle direction or remove
          const currentDir = prevSort[columnIndex].direction;
          if (currentDir === "asc") {
            newSort = prevSort.map((sort, i) =>
              i === columnIndex ? { ...sort, direction: "desc" } : sort
            );
          } else {
            newSort = prevSort.filter((_, i) => i !== columnIndex);
          }
        }

        sorting?.onSortChange?.(newSort);
        return newSort;
      });
    },
    [columns, sorting]
  );

  // Handle keyboard shortcuts
  useHotkeys(
    {
      "ctrl+f": (event: KeyboardEvent) => {
        event.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          "[data-search-input]"
        );
        searchInput?.focus();
      },
      "ctrl+shift+f": (event: KeyboardEvent) => {
        event.preventDefault();
        const filterSelect = document.querySelector<HTMLSelectElement>(
          "[data-category-select]"
        );
        filterSelect?.click();
      },
      "ctrl+shift+e": (event: KeyboardEvent) => {
        event.preventDefault();
        if (enableExport) handleExport();
      },
    },
    { enabled: enableKeyboardShortcuts }
  );

  // Handle CSV export
  const handleExport = () => {
    if (!data.length) return;

    const headers = columns.map((col) => col.header).join(",");
    const rows = data.map((row) =>
      columns
        .map((col) => {
          const cellContent = col.cell(row);
          return typeof cellContent === "string" ? cellContent : "";
        })
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exportFileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Apply sorting and pagination to data
  const sortedData = [...data].sort((a, b) => {
    for (const sort of sortConfig) {
      const column = columns.find((col) => col.id === sort.id);
      if (!column?.sortingFn) continue;

      const result = column.sortingFn(a, b);
      if (result !== 0) return sort.direction === "asc" ? result : -result;
    }
    return 0;
  });

  const paginatedData = pagination
    ? sortedData.slice(
        0,
        pagination.mode === "infinite"
          ? (paginationState.pageIndex + 1) * paginationState.pageSize
          : (paginationState.pageIndex + 1) * paginationState.pageSize
      )
    : sortedData;

  return (
    <div className="w-full space-y-4" role="region" aria-label={ariaLabel}>
      {ariaDescription && (
        <div className="sr-only" role="note">
          {ariaDescription}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {searchable && (
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              data-search-input
              type="search"
              placeholder={searchPlaceholder || t.search}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {categoryFilter && (
            <Select
              data-category-select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                onCategoryChange?.(value);
              }}
              options={categoryFilter.options}
              placeholder={categoryFilter.placeholder || t.filter}
              icon={<Filter className="h-4 w-4" />}
            />
          )}

          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={!data.length}
              title={t.exportCsv}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg border">
        <table
          ref={tableRef}
          className={cn(
            "w-full divide-y divide-gray-200 whitespace-nowrap",
            className
          )}
        >
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  onClick={() => handleSort(column.id)}
                  className={cn(
                    "px-6 py-3 text-left text-sm font-semibold text-gray-900",
                    column.sortable &&
                      "cursor-pointer select-none hover:bg-gray-100",
                    !column.mobile && "hidden sm:table-cell"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <div className="flex flex-col">
                        {sortConfig.map((sort, i) =>
                          sort.id === column.id ? (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs"
                            >
                              {sort.direction === "asc" ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </motion.div>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    <Spinner className="mx-auto" />
                  </td>
                </tr>
              ) : !paginatedData.length ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {emptyState || t.noData}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          "px-6 py-4 text-sm text-gray-900",
                          !column.mobile && "hidden sm:table-cell"
                        )}
                      >
                        {column.cell(row)}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>

        {pagination && pagination.mode === "pagination" && (
          <div className="flex items-center justify-between border-t bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPaginationState((prev) => ({
                    ...prev,
                    pageIndex: Math.max(0, prev.pageIndex - 1),
                  }))
                }
                disabled={paginationState.pageIndex === 0}
              >
                {t.previous}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPaginationState((prev) => ({
                    ...prev,
                    pageIndex: Math.min(
                      pagination.pageCount - 1,
                      prev.pageIndex + 1
                    ),
                  }))
                }
                disabled={
                  paginationState.pageIndex === pagination.pageCount - 1
                }
              >
                {t.next}
              </Button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  {t.showing}{" "}
                  <span className="font-medium">
                    {paginationState.pageIndex * paginationState.pageSize + 1}
                  </span>{" "}
                  {t.to}{" "}
                  <span className="font-medium">
                    {Math.min(
                      (paginationState.pageIndex + 1) *
                        paginationState.pageSize,
                      data.length
                    )}
                  </span>{" "}
                  {t.of} <span className="font-medium">{data.length}</span>{" "}
                  {t.results}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={String(paginationState.pageSize)}
                  onValueChange={(value) =>
                    setPaginationState((prev) => ({
                      ...prev,
                      pageSize: Number(value),
                    }))
                  }
                  options={
                    pagination.pageSizeOptions?.map((size) => ({
                      label: `${size} ${t.perPage}`,
                      value: String(size),
                    })) || [
                      { label: "10 per page", value: "10" },
                      { label: "20 per page", value: "20" },
                      { label: "50 per page", value: "50" },
                    ]
                  }
                />

                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                  {Array.from({ length: pagination.pageCount }).map((_, i) => (
                    <Button
                      key={i}
                      variant={
                        i === paginationState.pageIndex ? "default" : "ghost"
                      }
                      size="sm"
                      onClick={() =>
                        setPaginationState((prev) => ({
                          ...prev,
                          pageIndex: i,
                        }))
                      }
                    >
                      {i + 1}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {pagination?.mode === "infinite" && (
          <div ref={loadMoreRef} className="p-4 text-center">
            {isLoading ? (
              <Spinner className="mx-auto" />
            ) : paginationState.pageIndex < pagination.pageCount - 1 ? (
              <p className="text-sm text-gray-500">{t.scrollToLoadMore}</p>
            ) : (
              <p className="text-sm text-gray-500">{t.noMoreResults}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
