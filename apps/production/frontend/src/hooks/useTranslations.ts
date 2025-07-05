import { mn } from "@/constants/mn";

export function useTranslations() {
  return {
    // Common translations
    search: mn.common.search,
    filter: mn.common.filter,
    name: mn.common.name,
    category: mn.common.category,
    price: mn.common.price,
    status: mn.common.status,
    active: mn.common.active,
    inactive: mn.common.inactive,
    noData: "Өгөгдөл байхгүй",

    // Menu specific
    menuTable: "Цэсний хүснэгт",
    menuTableDescription: "Ресторанын цэсний жагсаалт",

    // Pagination
    showing: "Харуулж буй",
    to: "-",
    of: "нийт",
    results: "үр дүн",
    previous: mn.common.previous,
    next: mn.common.next,
    perPage: "хуудсанд",

    // Export
    exportCsv: "CSV татах",

    // Loading states
    scrollToLoadMore: "Цааш ачаалахын тулд доош гүйлгэнэ үү",
    noMoreResults: "Өгөгдөл дууслаа",
  };
}
