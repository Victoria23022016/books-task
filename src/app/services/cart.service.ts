import { Injectable } from '@angular/core';
import { Book, CartItemCounted } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = new Map<string, CartItemCounted>();

  addToCart(book: Book): void {
    const cartItem = this.cartItems.get(book.isbn13);

    if (!cartItem?.count) {
      this.cartItems.set(book.isbn13, { ...book, count: 1 });
    } else {
      this.cartItems.set(book.isbn13, {
        ...book,
        count: cartItem.count + 1,
      });
    }
  }

  decreaseBook(isbn13: string): void {
    const cartItem = this.cartItems.get(isbn13);
    if (cartItem && cartItem?.count !== 1) {
      this.cartItems.set(isbn13, {
        ...cartItem,
        count: cartItem.count - 1,
      });
    } else {
      this.deleteBook(isbn13);
    }
  }

  checkForNullItem(isbn13: string) {}

  deleteBook(isbn13: string): void {
    this.cartItems.delete(isbn13);
  }

  checkCartForEmpty(): boolean {
    return !!this.cartItems.size;
  }

  checkItem(isbn13: string): boolean {
    return this.cartItems.has(isbn13);
  }

  getCount(isbn13: string): number {
    return this.cartItems.get(isbn13)?.count || 0;
  }

  calcTotalCost(): number {
    let totalCost: number = 0;
    this.cartItems.forEach(({ count, price }) => {
      let cartSum = count * +price.slice(1);
      totalCost += cartSum;
    });

    return totalCost;
  }
}
