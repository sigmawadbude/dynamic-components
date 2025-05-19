export interface IProduct {
  productId: number | null;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface InputObject {
  [key: string]: IProduct; // This allows for dynamic keys
}