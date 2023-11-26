import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Book } from '../../services/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent implements DoCheck {
  @Input() book: Book;
  @Output() onAdd: EventEmitter<Book> = new EventEmitter<Book>();

  inCart = false;
  bookCount: number;

  ngDoCheck(): void {
    if (this.book.count && this.book.count !== 0) {
      this.inCart = true;
      this.bookCount = this.book.count;
    }
  }

  addToCart(book: Book): void {
    this.onAdd.emit(book);
  }
}
