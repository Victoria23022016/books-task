import { Injectable } from '@angular/core';
import { listOfBooks } from '../books-mock';
import { Observable, of } from 'rxjs';

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
}
