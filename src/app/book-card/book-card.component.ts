import { Component, Input, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  inCart = false;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.book = this._bookService.getBookByISBN13(this.book.isbn13);
    this.inCart = this._bookService.checkLocalStorage(this.book.isbn13)
      ? true
      : false;
  }

  addToCart(book: Book): void {
    this._bookService.addToLocalStorage(book);
    this.inCart = true;
  }
}
