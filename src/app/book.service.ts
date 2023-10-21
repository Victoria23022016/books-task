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

  constructor() {}

  getBooks(): Book[] {
    return listOfBooks;
  }

  getBookByISBN13(isbn13: string): Book {
    return listOfBooks[listOfBooks.findIndex((book) => book.isbn13 === isbn13)];
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

  addBook(book: Book): void {
    if (this.cartItems.length === 0) {
      this.cartItems.push({ book: book, count: 1 });
    } else {
      const filtratedItems = this.cartItems.filter(
        (item) => item.book === book
      );
      if (filtratedItems.length === 0) {
        this.cartItems.push({ book: book, count: 1 });
      } else {
        const indexOfItem = this.findIndexOfItem(book);
        this.cartItems[indexOfItem].count += 1;
      }
    }
  }

  removeBook(book: Book): void {
    const indexOfItem = this.findIndexOfItem(book);
    this.cartItems[indexOfItem].count -= 1;
    if (this.checkForNullItem(book)) {
      this.deleteBook(book);
    }
  }

  deleteBook(book: Book): void {
    const indexOfItem = this.findIndexOfItem(book);
    this.cartItems.splice(indexOfItem, 1);
  }

  checkForNullItem(book: Book): boolean {
    const indexOfItem = this.findIndexOfItem(book);
    return this.cartItems[indexOfItem].count === 0 ? true : false;
  }

  checkCartForEmpty(): boolean {
    return this.cartItems.length === 0 ? true : false;
  } // для использования в калькуляции

  checkItem(book: Book): boolean {
    return this.cartItems.find((item) => item.book === book) ? true : false;
  }

  checkCount(book: Book): number {
    const indexOfItem = this.findIndexOfItem(book);
    return this.cartItems[indexOfItem].count;
  }

  findIndexOfItem(book: Book): number {
    return this.cartItems.findIndex((item) => item.book === book);
  }

  calcTotalCost(): number {
    let totalCost = this.cartItems
      .map((el) => +el.book.price.slice(1, el.book.price.length) * el.count)
      .reduce((sum, number) => {
        return sum + number;
      }, 0);
    return totalCost;
  }
}
