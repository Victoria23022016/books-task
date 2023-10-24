import { Injectable } from '@angular/core';
import { Book } from './book.service';

export interface CartItem {
  book: Book;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  addToCart(book: Book): void {
    if (this.cartItems.length === 0) {
      this.cartItems.push({ book: book, count: 1 });
    } else {
      const filtratedItems = this.cartItems.filter(
        (item) => item.book === book
      );
      if (filtratedItems.length === 0) {
        this.cartItems.push({ book: book, count: 1 });
      } else {
        const indexOfItem = this.findIndexOfItem(book.isbn13);
        this.cartItems[indexOfItem].count += 1;
      }
    }
  }

  decreaseBook(isbn13: string): void {
    const indexOfItem = this.findIndexOfItem(isbn13);
    this.cartItems[indexOfItem].count -= 1;
    if (this.checkForNullItem(isbn13)) {
      this.deleteBook(isbn13);
    }
  }

  deleteBook(isbn13: string): void {
    const indexOfItem = this.findIndexOfItem(isbn13);
    this.cartItems.splice(indexOfItem, 1);
  }

  checkForNullItem(isbn13: string): boolean {
    const indexOfItem = this.findIndexOfItem(isbn13);
    return this.cartItems[indexOfItem].count === 0 ? true : false;
  }

  checkCartForEmpty(): boolean {
    return this.cartItems.length === 0 ? true : false;
  }

  checkItem(book: Book): boolean {
    return this.cartItems.find((item) => item.book === book) ? true : false;
  }

  getCount(book: Book): number {
    const indexOfItem = this.findIndexOfItem(book.isbn13);
    return this.cartItems[indexOfItem].count;
  }

  calcTotalCost(): number {
    let totalCost = this.cartItems
      .map((el) => +el.book.price.slice(1, el.book.price.length) * el.count)
      .reduce((sum, number) => {
        return sum + number;
      }, 0);
    return totalCost;
  }

  private findIndexOfItem(isbn13: string): number {
    return this.cartItems.findIndex((item) => item.book.isbn13 === isbn13);
  }
}
