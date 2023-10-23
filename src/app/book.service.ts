import { Injectable } from '@angular/core';
import { listOfBooks } from '../app/books-mock';
import { Observable, of } from 'rxjs';

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface CartItem {
  book: Book;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  cartItems: CartItem[] = [];
  isAuth: boolean = false;

  getBooks(): Book[] {
    return listOfBooks;
  }

  getBookByISBN13(isbn13: string): Book | undefined {
    return listOfBooks.find((book) => book.isbn13 === isbn13);
  }

  searchBook(value: string): Observable<Book[]> {
    if (!value.trim()) {
      return of([]);
    } else {
      const books = this.getBooks();
      let searchResult: Book[] = [];
      books.forEach((book) => {
        if (
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.subtitle.toLowerCase().includes(value.toLocaleLowerCase())
        ) {
          searchResult.push(book);
        }
      });
      return of(searchResult);
    }
  }

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
      //
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

  private findIndexOfItem(isbn13: string): number {
    return this.cartItems.findIndex((item) => item.book.isbn13 === isbn13);
  }

  calcTotalCost(): number {
    let totalCost = this.cartItems
      .map((el) => +el.book.price.slice(1, el.book.price.length) * el.count)
      .reduce((sum, number) => {
        return sum + number;
      }, 0);
    return totalCost;
  }

  login() {
    this.isAuth = true;
  }

  logout() {
    this.isAuth = false;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }
}
