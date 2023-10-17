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

  getBookByISBN13(isbn13: number): Book {
    return listOfBooks[
      listOfBooks.findIndex((book) => book.isbn13 === `${isbn13}`)
    ];
  }
}
