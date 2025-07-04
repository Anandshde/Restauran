export type SortDirection = "asc" | "desc";

export interface SortConfig {
  id: string;
  direction: SortDirection;
}

export interface ColumnDef<T> {
  id: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  mobile?: boolean;
  sortingFn?: (a: T, b: T) => number;
}

export interface PaginationState {
  pageSize: number;
  pageIndex: number;
}

export interface DataTableProps<T> {
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
  // Pagination props
  pagination?: {
    pageCount: number;
    initialPageSize?: number;
    pageSizeOptions?: number[];
    onPageChange?: (state: PaginationState) => void;
    mode?: "pagination" | "infinite";
  };
  // Multi-sort props
  sorting?: {
    maxSortColumns?: number;
    initialSort?: SortConfig[];
    onSortChange?: (sortConfig: SortConfig[]) => void;
  };
  // Export options
  enableExport?: boolean;
  exportFileName?: string;
  // Keyboard shortcuts
  enableKeyboardShortcuts?: boolean;
  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
}
