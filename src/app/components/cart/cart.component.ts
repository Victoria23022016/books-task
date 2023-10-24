import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { Book } from '../../services/book.service';
import { CartItem, CartService } from 'src/app/services/cart.service';

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

  constructor(private readonly _cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this._cartService.cartItems;
  }

  ngDoCheck() {
    this.isEmpty = this._cartService.checkCartForEmpty() ? true : false;
    this.totalCost = this._cartService.calcTotalCost();
  }

  plusBook(book: Book): void {
    this._cartService.addToCart(book);
  }

  minusBook(isbn13: string): void {
    if (!(this.isEmpty = this._cartService.checkForNullItem(isbn13))) {
      this._cartService.decreaseBook(isbn13);
    }
  }

  deleteBook(isbn13: string): void {
    this._cartService.deleteBook(isbn13);
  }
}
