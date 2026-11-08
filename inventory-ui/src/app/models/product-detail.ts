export interface ProductDetail {
    id: number;
    name: string;
    sku: string;
    description: string | null;
    price: number;
    quantityInStock: number;
    reorderLevel: number;
    categoryId: number;
    categoryName: string;
  }