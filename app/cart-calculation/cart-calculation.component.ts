import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-cart-calculation',
  templateUrl: './cart-calculation.component.html',
  styleUrls: ['./cart-calculation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCalculationComponent {
  totalCost: number;

  constructor(
    private readonly _bookService: BookService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngDoCheck(): void {
    this.totalCost = this._bookService.calcTotalCost();
    this._cdr.detectChanges();
  }
}
