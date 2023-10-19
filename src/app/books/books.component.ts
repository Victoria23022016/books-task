import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books = this._bookService.getBooks();
  }
}
