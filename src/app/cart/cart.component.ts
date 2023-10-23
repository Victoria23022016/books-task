import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { Book, BookService, CartItem } from '../book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit, DoCheck {
  cartItems: CartItem[];
  isEmpty: boolean;
  totalCost: number;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.cartItems = this._bookService.cartItems;
  }

  ngDoCheck() {
    this.isEmpty = this._bookService.checkCartForEmpty() ? true : false;
    this.totalCost = this._bookService.calcTotalCost();
  }

  plusBook(book: Book): void {
    this._bookService.addToCart(book);
  }

  minusBook(isbn13: string): void {
    if (!(this.isEmpty = this._bookService.checkForNullItem(isbn13))) {
      this._bookService.decreaseBook(isbn13);
    }
  }

  deleteBook(isbn13: string): void {
    this._bookService.deleteBook(isbn13);
  }
}
