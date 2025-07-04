export const mn = {
  menu: {
    title: "Цэс удирдах",
    addNew: "Шинэ хоол нэмэх",
    search: "Нэр эсвэл ангилалаар хайх...",
    columns: {
      image: "Зураг",
      name: "Нэр",
      category: "Ангилал",
      price: "Үнэ",
      actions: "Үйлдэл",
    },
    empty: "Хоол олдсонгүй",
    loading: "Ачаалж байна...",
    error: {
      title: "Алдаа гарлаа",
      description: "Дахин оролдоно уу",
    },
    delete: {
      confirm: "Энэ хоолыг устгах уу?",
      success: "Амжилттай устгалаа",
      error: "Устгахад алдаа гарлаа",
    },
  },
  categories: {
    all: "Бүгд",
    main: "Үндсэн хоол",
    side: "Дагалдах хоол",
    dessert: "Амттан",
    drink: "Ундаа",
  },
  sort: {
    price: {
      asc: "Үнэ ⬆️",
      desc: "Үнэ ⬇️",
    },
    name: {
      asc: "Нэр (А-Я)",
      desc: "Нэр (Я-А)",
    },
  },
  actions: {
    edit: "Засах",
    delete: "Устгах",
    save: "Хадгалах",
    cancel: "Болих",
  },
} as const;
