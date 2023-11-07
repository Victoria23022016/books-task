import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
} from '@angular/core';
import { Book } from '../../services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements DoCheck {
  @Input() books: Book[];

  constructor(private readonly _cartService: CartService) {}

  ngDoCheck(): void {
    this.books = this.books.map(
      (book) => (book = { ...book, count: this.updateCount(book) })
    );
  }

  changeCount(book: Book): void {
    this._cartService.addToCart(book);
  }

  updateCount(book: Book): number {
    return this._cartService.getCount(book.isbn13);
  }
}
