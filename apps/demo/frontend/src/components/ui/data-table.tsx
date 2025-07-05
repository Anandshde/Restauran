import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Button } from "./button";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortDirection = "asc" | "desc";
export type ColumnDef<T> = {
  id: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  mobile?: boolean; // Whether to show on mobile
};

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  categoryFilter?: {
    options: { label: string; value: string }[];
    placeholder?: string;
  };
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
};

export function DataTable<T>({
  data,
  columns,
  searchable,
  searchPlaceholder = "Search...",
  categoryFilter,
  onSearch,
  onCategoryChange,
  isLoading,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  } | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((col) => col.id))
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (columnId: string) => {
    setSortConfig((current) => ({
      key: columnId,
      direction:
        current?.key === columnId && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns((current) => {
      const next = new Set(current);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      return next;
    });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const visibleColumnsArray = columns.filter((col) =>
    visibleColumns.has(col.id)
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {searchable && (
          <div className="flex-1 flex gap-4">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-xs"
            />
            {categoryFilter && (
              <Select
                options={categoryFilter.options}
                onValueChange={onCategoryChange}
                placeholder={categoryFilter.placeholder}
              />
            )}
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuItem
                key={column.id}
                onClick={() => handleColumnToggle(column.id)}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={visibleColumns.has(column.id)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {column.header}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumnsArray.map((column) => (
                <TableHead
                  key={column.id}
                  onClick={() => column.sortable && handleSort(column.id)}
                  className={cn(
                    column.sortable && "cursor-pointer select-none",
                    !column.mobile && "hidden sm:table-cell"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {sortConfig?.key === column.id && (
                      <span className="text-xs">
                        {sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {data.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="group hover:bg-gray-50"
                >
                  {visibleColumnsArray.map((column) => (
                    <TableCell
                      key={column.id}
                      className={cn(!column.mobile && "hidden sm:table-cell")}
                    >
                      {column.cell(item)}
                    </TableCell>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
            {data.length === 0 && !isLoading && (
              <TableRow>
                <TableCell
                  colSpan={visibleColumnsArray.length}
                  className="h-24 text-center"
                >
                  {emptyState || (
                    <div className="text-muted-foreground">No results</div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
