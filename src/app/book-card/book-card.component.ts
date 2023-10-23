import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  inCart = false;
  bookCount: number;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    if (this._bookService.checkItem(this.book)) {
      this.inCart = true;
      this.updateBookCount();
    }
  }

  addToCart(book: Book): void {
    this._bookService.addToCart(book);
    this.inCart = true;
    this.updateBookCount();
  }

  updateBookCount() {
    this.bookCount = this._bookService.getCount(this.book);
  }
}
