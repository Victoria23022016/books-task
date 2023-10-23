import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed-book.component.html',
  styleUrls: ['./detailed-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedComponent implements OnInit {
  book: Book;
  bookCount: number;
  inCart = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _bookServise: BookService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const isbn13 = params['id'];
      if (isbn13) {
        const checkBook = this._bookServise.getBookByISBN13(isbn13);
        if (checkBook != undefined) {
          this.book = checkBook;
        }

        if (this._bookServise.checkItem(this.book)) {
          this.inCart = true;
          this.updateBookCount();
        }
      }
    });
  }

  addToCart(book: Book): void {
    this._bookServise.addToCart(book);
    this.inCart = true;
    this.updateBookCount();
  }

  updateBookCount(): void {
    this.bookCount = this._bookServise.getCount(this.book);
  }
}
