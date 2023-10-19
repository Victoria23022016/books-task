import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed-book.component.html',
  styleUrls: ['./detailed-book.component.css'],
})
export class DetailedComponent implements OnInit {
  book: Book;
  inCart = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _bookServise: BookService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const isbn13 = params['id'];
      if (isbn13) {
        this.book = this._bookServise.getBookByISBN13(isbn13);
        this.inCart = this._bookServise.checkLocalStorage(isbn13)
          ? true
          : false;
      }
    });
  }

  addToCart(book: Book): void {
    this._bookServise.addToLocalStorage(book);
    this.inCart = true;
  } //добавление inCart = true!!!
}
