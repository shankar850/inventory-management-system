export interface DashboardSummary {
    totalProducts: number;
    totalCategories: number;
    lowStockCount: number;
    outOfStockCount: number;
    stockValue: number;
  }
  
  export interface LowStockItem {
    id: number;
    name: string;
    sku: string;
    categoryName: string;
    quantityInStock: number;
    reorderLevel: number;
  }