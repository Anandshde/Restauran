export const mn = {
  // Common
  common: {
    welcome: "Тавтай морилно уу",
    loading: "Ачаалж байна...",
    error: "Алдаа гарлаа",
    success: "Амжилттай",
    save: "Хадгалах",
    cancel: "Цуцлах",
    delete: "Устгах",
    edit: "Засах",
    add: "Нэмэх",
    search: "Хайх",
    filter: "Шүүлтүүр",
    reset: "Шинэчлэх",
    close: "Хаах",
    confirm: "Баталгаажуулах",
    yes: "Тийм",
    no: "Үгүй",
    back: "Буцах",
    next: "Дараах",
    previous: "Өмнөх",
    total: "Нийт",
    price: "Үнэ",
    quantity: "Тоо хэмжээ",
    status: "Төлөв",
    date: "Огноо",
    time: "Цаг",
    name: "Нэр",
    description: "Тайлбар",
    category: "Ангилал",
    image: "Зураг",
    active: "Идэвхтэй",
    inactive: "Идэвхгүй",
    available: "Боломжтой",
    occupied: "Эзэлсэн",
    pending: "Хүлээгдэж буй",
    preparing: "Бэлтгэж буй",
    completed: "Дууссан",
    cancelled: "Цуцлагдсан",
  },

  // Navigation
  nav: {
    home: "Нүүр",
    menu: "Цэс",
    orders: "Захиалга",
    kitchen: "Гал тогоо",
    dashboard: "Удирдлага",
    settings: "Тохиргоо",
    logout: "Гарах",
    login: "Нэвтрэх",
  },

  // Landing Page
  landing: {
    title: "Ресторанаа ухаалаг болго",
    subtitle: "QR код захиалга, автомат төлбөр, бодит цагийн мэдээлэл",
    demoButton: "Демо үзэх",
    dashboardButton: "Удирдлагын самбар",
    features: {
      title: "Яагаад манай системийг сонгох ёстой вэ?",
      subtitle:
        "Дэлхийн стандартад нийцсэн, Монголын зах зээлд тохирсон технологи",
      qrOrdering: {
        title: "QR код захиалга",
        description: "Үйлчлүүлэгч QR код уншуулж шууд захиалга өгнө",
      },
      kitchenDisplay: {
        title: "Гал тогооны дэлгэц",
        description: "Шинэ захиалга шууд гал тогоонд харагдана",
      },
      adminDashboard: {
        title: "Удирдлагын самбар",
        description: "Захиалга, орлого, цэсийг нэг газраас удирдах",
      },
      qpayIntegration: {
        title: "QPay төлбөр",
        description: "Монголын хамгийн том төлбөрийн системтэй холбогдсон",
      },
    },
    demo: {
      title: "3 минутын демо",
      subtitle: "Системийн боломжуудыг шууд үзээрэй",
      customerView: {
        title: "Үйлчлүүлэгчийн харц",
        description: "QR код уншуулж цэс үзэх, захиалга өгөх",
        action: "Демо захиалга өгөх",
      },
      kitchenView: {
        title: "Гал тогооны дэлгэц",
        description: "Шинэ захиалга хүлээн авах, бэлтгэх",
        action: "Гал тогоо үзэх",
      },
      adminView: {
        title: "Удирдлагын самбар",
        description: "Захиалга удирдах, тайлан үзэх",
        action: "Удирдлага үзэх",
      },
    },
    cta: {
      title: "Таны ресторанд энэ системийг суулгахад бэлэн үү?",
      pricing: "Суулгах: ₮1,999,000 • Сарын төлбөр: ₮199,000",
      installButton: "Суулгах хүсэлт илгээх",
      infoButton: "Дэлгэрэнгүй мэдээлэл",
    },
  },

  // Menu
  menu: {
    title: "Цэсний удирдлага",
    addNew: "Шинэ хоол нэмэх",
    searchPlaceholder: "Хоол хайх...",
    categories: {
      all: "Бүгд",
      main: "Үндсэн хоол",
      side: "Хавсралт",
      dessert: "Амттан",
      drink: "Ундаа",
    },
    form: {
      title: "Хоолны мэдээлэл",
      name: "Хоолны нэр",
      namePlaceholder: "Хоолны нэрийг оруулна уу",
      description: "Тайлбар",
      descriptionPlaceholder: "Хоолны тайлбарыг оруулна уу",
      price: "Үнэ (₮)",
      pricePlaceholder: "Үнийг оруулна уу",
      category: "Ангилал",
      categoryPlaceholder: "Ангилал сонгоно уу",
      image: "Зураг",
      imagePlaceholder: "Зургийн холбоосыг оруулна уу",
      status: "Төлөв",
    },
    actions: {
      edit: "Засах",
      delete: "Устгах",
      activate: "Идэвхжүүлэх",
      deactivate: "Идэвхгүй болгох",
    },
    delete: {
      title: "Хоол устгах",
      message: "Энэ хоолыг устгахдаа итгэлтэй байна уу?",
      confirm: "Устгах",
    },
    errors: {
      nameRequired: "Хоолны нэр заавал оруулна уу",
      priceRequired: "Үнэ заавал оруулна уу",
      categoryRequired: "Ангилал заавал сонгоно уу",
      priceInvalid: "Үнэ 0-ээс их байх ёстой",
    },
  },

  // Orders
  orders: {
    title: "Захиалгын удирдлага",
    newOrder: "Шинэ захиалга",
    orderNumber: "Захиалгын дугаар",
    table: "Ширээ",
    items: "Захиалсан хоол",
    total: "Нийт дүн",
    orderTime: "Захиалгын цаг",
    status: {
      pending: "Хүлээгдэж буй",
      preparing: "Бэлтгэж буй",
      completed: "Дууссан",
      cancelled: "Цуцлагдсан",
    },
    actions: {
      accept: "Хүлээн авах",
      prepare: "Бэлтгэх",
      complete: "Дуусгах",
      cancel: "Цуцлах",
    },
    empty: "Захиалга байхгүй байна",
    filter: {
      all: "Бүгд",
      pending: "Хүлээгдэж буй",
      preparing: "Бэлтгэж буй",
      completed: "Дууссан",
    },
  },

  // Kitchen
  kitchen: {
    title: "Гал тогооны дэлгэц",
    newOrders: "Шинэ захиалга",
    preparing: "Бэлтгэж буй",
    ready: "Бэлэн",
    orderReceived: "Шинэ захиалга ирлээ!",
    prepareTime: "Бэлтгэх хугацаа",
    minutes: "минут",
    startPreparing: "Бэлтгэж эхлэх",
    markReady: "Бэлэн гэж тэмдэглэх",
    viewDetails: "Дэлгэрэнгүй",
  },

  // Customer Order
  customerOrder: {
    welcome: "Тавтай морилно уу!",
    tableNumber: "Ширээний дугаар",
    menu: "Цэс",
    cart: "Сагс",
    addToCart: "Сагсанд нэмэх",
    removeFromCart: "Сагснаас хасах",
    emptyCart: "Таны сагс хоосон байна",
    placeOrder: "Захиалга өгөх",
    orderPlaced: "Захиалга амжилттай өгөгдлөө!",
    orderNumber: "Захиалгын дугаар",
    estimatedTime: "Хүлээх хугацаа",
    paymentMethod: "Төлбөрийн арга",
    payWithQPay: "QPay-ээр төлөх",
    payWithCash: "Бэлэн мөнгөөр төлөх",
    categories: {
      all: "Бүгд",
      main: "Үндсэн хоол",
      side: "Хавсралт",
      dessert: "Амттан",
      drink: "Ундаа",
    },
    instructions: {
      scanQr: "QR код уншуулж цэс үзээрэй",
      selectItems: "Хүссэн хоолоо сонгоно уу",
      placeOrder: "Захиалга өгөөд төлбөр төлнө үү",
      waitForFood: "Хоол бэлэн болтол хүлээнэ үү",
    },
  },

  // Dashboard
  dashboard: {
    title: "Удирдлагын самбар",
    todayStats: "Өнөөдрийн тоо баримт",
    orders: "Захиалга",
    revenue: "Орлого",
    customers: "Үйлчлүүлэгч",
    avgOrder: "Дундаж захиалга",
    quickActions: "Шуурхай үйлдэл",
    newOrder: "Шинэ захиалга",
    manageMenu: "Цэс удирдах",
    viewReports: "Тайлан үзэх",
    busyHours: "Завсарлагын цаг",
    topItems: "Хамгийн их захиалагдсан",
    recentOrders: "Сүүлийн захиалга",
    tableStatus: "Ширээний байдал",
    resetDemo: "Демо шинэчлэх",
    demoMode: "Демо горим",
    stats: {
      todayOrders: "Өнөөдрийн захиалга",
      todayRevenue: "Өнөөдрийн орлого",
      pendingOrders: "Хүлээж буй захиалга",
      completedOrders: "Дууссан захиалга",
      averageOrderValue: "Дундаж захиалгын дүн",
    },
  },

  // Tables
  tables: {
    title: "Ширээний удирдлага",
    tableNumber: "Ширээний дугаар",
    seats: "Суудлын тоо",
    status: "Төлөв",
    qrCode: "QR код",
    generateQr: "QR код үүсгэх",
    printQr: "QR код хэвлэх",
    available: "Боломжтой",
    occupied: "Эзэлсэн",
    reserved: "Захиалагдсан",
    cleaning: "Цэвэрлэж буй",
  },

  // Settings
  settings: {
    title: "Тохиргоо",
    restaurant: "Ресторан",
    system: "Систем",
    payment: "Төлбөр",
    notifications: "Мэдэгдэл",
    restaurantName: "Ресторанын нэр",
    address: "Хаяг",
    phone: "Утас",
    email: "И-мэйл",
    logo: "Лого",
    timezone: "Цагийн бүс",
    currency: "Валют",
    language: "Хэл",
    qpaySettings: "QPay тохиргоо",
    ebarimtSettings: "Е-Баримт тохиргоо",
    soundNotifications: "Дууны мэдэгдэл",
    emailNotifications: "И-мэйл мэдэгдэл",
  },

  // Errors
  errors: {
    general: "Алдаа гарлаа. Дахин оролдоно уу.",
    network: "Сүлжээний алдаа. Интернет холболтоо шалгана уу.",
    notFound: "Хуудас олдсонгүй",
    unauthorized: "Нэвтрэх эрх хэрэгтэй",
    forbidden: "Хандах эрх хүрэлцэхгүй",
    validation: "Оруулсан мэдээлэл буруу байна",
    server: "Серверийн алдаа гарлаа",
  },

  // Success Messages
  success: {
    saved: "Амжилттай хадгалагдлаа",
    deleted: "Амжилттай устгагдлаа",
    updated: "Амжилттай шинэчлэгдлээ",
    created: "Амжилттай үүсгэгдлээ",
    orderPlaced: "Захиалга амжилттай өгөгдлөө",
    paymentCompleted: "Төлбөр амжилттай төлөгдлөө",
  },

  // Time
  time: {
    now: "Одоо",
    today: "Өнөөдөр",
    yesterday: "Өчигдөр",
    thisWeek: "Энэ долоо хоног",
    thisMonth: "Энэ сар",
    minutes: "минут",
    hours: "цаг",
    days: "өдөр",
    ago: "өмнө",
  },

  // Formats
  formats: {
    currency: "₮{amount}",
    date: "YYYY/MM/DD",
    time: "HH:mm",
    datetime: "YYYY/MM/DD HH:mm",
  },

  // Demo specific
  demo: {
    restaurantName: "Монгол Ресторан",
    tableDemo: "Демо ширээ",
    resetConfirm: "Демо өгөгдлийг шинэчлэх үү?",
    resetSuccess: "Демо өгөгдөл шинэчлэгдлээ",
    demoNotice: "Энэ бол демо горим. Бодит төлбөр, баримт үүсэхгүй.",
    mockPayment: "Демо төлбөр (бодит биш)",
    mockQr: "Демо QR код",
  },
} as const;
