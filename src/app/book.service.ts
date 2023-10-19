import { Injectable } from '@angular/core';
import { listOfBooks } from '../app/books-mock';

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  getBooks(): Book[] {
    return listOfBooks;
  }

  getBookByISBN13(isbn13: string): Book {
    return listOfBooks[listOfBooks.findIndex((book) => book.isbn13 === isbn13)];
  }

  parseLocalStorage(books: Book[]): Book[] {
    let localKeys = Object.values(window.localStorage).map((key) =>
      JSON.parse(key)
    );
    books.splice(0, books.length, ...localKeys);
    return books;
  }

  addToLocalStorage(book: Book): void {
    if (!window.localStorage.getItem(`${book.isbn13}`)) {
      window.localStorage[book.isbn13] = JSON.stringify(book);
    }
  }

  checkLocalStorage(isbn13: string): boolean {
    return window.localStorage.getItem(isbn13) ? true : false;
  }

  removeFromLocalStorage(isbn13: string): void {
    window.localStorage.removeItem(isbn13);
  }
}
