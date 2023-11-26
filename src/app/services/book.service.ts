import { Injectable } from '@angular/core';
import { listOfBooks } from '../books-mock';
import { Observable, of } from 'rxjs';
import { Book } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  getBooks(): Observable<Book[]> {
    return of(listOfBooks);
  }

  getBookByISBN13(isbn13: string): Book | undefined {
    return listOfBooks.find((book) => book.isbn13 === isbn13);
  }

  searchBook(value: string, books: Book[]): Observable<Book[]> {
    if (!value.trim()) {
      return of([]);
    } else {
      const searchResult: Book[] = books.filter((book) => {
        return (
          book.title.toLowerCase().includes(value.toLowerCase()) ||
          book.subtitle.toLowerCase().includes(value.toLocaleLowerCase())
        );
      });

      return of(searchResult);
    }
  }
}
export { Book };
