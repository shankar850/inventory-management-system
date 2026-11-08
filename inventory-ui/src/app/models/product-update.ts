export interface ProductUpdate {
    name: string;
    description: string | null;
    price: number;
    reorderLevel: number;
    categoryId: number;
  }