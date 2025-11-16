/**
 * Noir Admin Dashboard - Content Configuration
 *
 * Single source of truth for all content in the admin dashboard.
 * Edit this file to change content across the entire application.
 */

export const content = {
  // Site metadata
  site: {
    name: "Noir Admin",
    tagline: "Luxury Jewellery Store Management System",
  },

  // Navigation
  nav: {
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    finance: "Finance",
    customers: "Customers",
    settings: "Settings",
  },

  // Dashboard
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of your business performance",
    kpi: {
      totalSales: "Total Sales",
      totalOrders: "Total Orders",
      activeProducts: "Active Products",
      monthlyRevenueGrowth: "Monthly Revenue Growth",
    },
    salesOverview: "Sales Overview",
    topSellingProducts: "Top Selling Products",
    recentOrders: "Recent Orders",
    table: {
      product: "Product",
      category: "Category",
      sales: "Sales",
      revenue: "Revenue",
      orderId: "Order ID",
      customer: "Customer",
      total: "Total",
      date: "Date",
      status: "Status",
    },
  },

  // Products
  products: {
    title: "Products",
    subtitle: "Manage your jewellery pieces",
    addNew: "Yeni Ürün Ekle",
    editProduct: "Edit Product",
    table: {
      image: "Image",
      productName: "Product Name",
      category: "Category",
      metalType: "Metal Type",
      price: "Price",
      stock: "Stock",
      status: "Status",
      actions: "Actions",
    },
    form: {
      name: "Product Name",
      category: "Category",
      metalType: "Metal Type",
      price: "Price (₺)",
      stock: "Stock",
      status: "Status",
      description: "Description",
      uploadImage: "Upload Image (Mock)",
      uploadPlaceholder: "Image upload functionality would be implemented here",
      cancel: "Cancel",
      save: "Kaydet",
    },
    status: {
      active: "Active",
      hidden: "Hidden",
    },
  },

  // Orders
  orders: {
    title: "Orders",
    subtitle: "Manage customer orders",
    viewDetails: "Detay Gör",
    table: {
      orderId: "Order ID",
      customerName: "Customer Name",
      productCount: "Product Count",
      total: "Total",
      paymentStatus: "Payment Status",
      date: "Date",
      action: "Action",
    },
    detail: {
      title: "Order Details",
      customerInfo: "Customer Information",
      products: "Products",
      orderSummary: "Order Summary",
      name: "Name",
      email: "Email",
      date: "Date",
      quantity: "Quantity",
      subtotal: "Subtotal",
      total: "Total",
      markAsDelivered: "Teslim Edildi",
    },
    status: {
      paid: "Paid",
      pending: "Pending",
      delivered: "Delivered",
    },
  },

  // Finance
  finance: {
    title: "Finance",
    subtitle: "Financial overview and analytics",
    monthly: "Monthly",
    yearly: "Yearly",
    revenue: {
      totalRevenue: "Total Revenue",
      monthlyAverage: "Monthly Average",
      growth: "Growth",
      returnsRate: "Returns Rate",
    },
    charts: {
      monthlyIncome: "Monthly Income",
      expenseBreakdown: "Expense Breakdown",
    },
    profitOverview: "Profit Overview",
    table: {
      month: "Month",
      revenue: "Revenue",
      expense: "Expense",
      profit: "Profit",
      margin: "Margin %",
    },
  },

  // Customers
  customers: {
    title: "Customers",
    subtitle: "Manage customer relationships",
    table: {
      name: "Name",
      email: "Email",
      totalOrders: "Total Orders",
      lifetimeValue: "Lifetime Value",
      memberSince: "Member Since",
      action: "Action",
    },
    detail: {
      title: "Customer Details",
      customerInfo: "Customer Information",
      recentOrders: "Recent Orders",
      name: "Name",
      email: "Email",
      memberSince: "Member Since",
      totalOrders: "Total Orders",
      lifetimeValue: "Lifetime Value",
    },
  },

  // Settings
  settings: {
    title: "Settings",
    subtitle: "Configure your admin dashboard",
    brand: {
      title: "Brand Settings",
      brandName: "Brand Name",
      currency: "Currency",
    },
    contact: {
      title: "Contact & Support",
      developer: "Developer",
      contactDeveloper: "Contact Developer",
      whatsapp: "WhatsApp",
      email: "Email",
      support: "Support",
      documentation: "Documentation",
      version: "Version",
    },
    system: {
      title: "System Information",
      version: "Version",
      lastUpdated: "Last Updated",
      environment: "Environment",
    },
    danger: {
      title: "Danger Zone",
      resetData: "Reset All Data",
      resetDescription: "This will reset all mock data to its initial state. This action cannot be undone.",
      resetButton: "Reset Data",
    },
    save: "Save Changes",
  },

  // Common UI
  ui: {
    logout: "Çıkış Yap",
    logoutConfirm: "Çıkış yapmak istediğinize emin misiniz?",
    logoutSuccess: "Çıkış yapıldı",
    admin: "Admin",
    cancel: "Cancel",
    save: "Save",
    close: "Close",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    loading: "Loading...",
    noData: "No data available",
  },
};

// Type for content
export type Content = typeof content;

