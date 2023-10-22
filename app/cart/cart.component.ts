import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book, BookService, CartItem } from '../book.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  isEmpty: boolean;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.cartItems = this._bookService.cartItems;
  }

  ngDoCheck() {
    this.isEmpty = this._bookService.checkCartForEmpty() ? true : false;
  }

  plusBook(book: Book): void {
    this._bookService.addBook(book);
  }

  minusBook(book: Book): void {
    if (!(this.isEmpty = this._bookService.checkForNullItem(book))) {
      this._bookService.removeBook(book);
    }
  }

  deleteBook(book: Book) {
    this._bookService.deleteBook(book);
  }
}
