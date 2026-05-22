export type Brand = 'ASUS' | 'MSI' | 'ACER' | 'DELL' | 'LENOVO' | 'HP' | 'APPLE' | 'DIF';

export type Category = 'gaming' | 'student' | 'office' | 'macbook' | 'accessory';

export interface ProductSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  ssd: string;
  screen: string;
  battery?: string;
  weight?: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  bestSeller?: boolean;
  flashSale?: boolean;
  inStock?: boolean;
  specs: ProductSpecs;
  description: string;
  comments: ReviewComment[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
