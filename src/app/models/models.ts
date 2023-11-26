export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  count?: number;
}

export interface CartItem {
  book: Book;
  count: number;
}

export interface CartItemCounted extends Book {
  count: number;
}
