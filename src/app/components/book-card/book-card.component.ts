import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Book } from '../../services/book.service';
import { CartService } from 'src/app/services/cart.service';

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

  constructor(private readonly _cartService: CartService) {}

  ngOnInit(): void {
    if (this._cartService.checkItem(this.book)) {
      this.inCart = true;
      this.updateBookCount();
    }
  }

  addToCart(book: Book): void {
    this._cartService.addToCart(book);
    this.inCart = true;
    this.updateBookCount();
  }

  updateBookCount() {
    this.bookCount = this._cartService.getCount(this.book);
  }
}
