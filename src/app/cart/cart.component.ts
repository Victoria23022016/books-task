import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  books: Book[] = [];

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books = this._bookService.parseLocalStorage(this.books);
  }

  plusOne(book: Book) {}

  minusOne(book: Book): void {
    this._bookService.removeFromLocalStorage(book.isbn13);
    this.books = this._bookService.parseLocalStorage(this.books);
  }
}
