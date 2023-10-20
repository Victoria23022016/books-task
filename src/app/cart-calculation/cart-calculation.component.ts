import { Component, Input } from '@angular/core';
import { Book } from '../book.service';

@Component({
  selector: 'app-cart-calculation',
  templateUrl: './cart-calculation.component.html',
  styleUrls: ['./cart-calculation.component.css'],
})
export class CartCalculationComponent {
  @Input() books: Book[];

  totalCost: number;

  ngDoCheck(): void {
    this.totalCost = this.calcTotalCost();
  }

  calcTotalCost(): number {
    //подумать, может вынести в сервис этот метод?
    return this.books
      .map((el) => el.price)
      .map((el) => +el.slice(1, el.length))
      .reduce((sum, number) => {
        return sum + number;
      }, 0);
  }
}
