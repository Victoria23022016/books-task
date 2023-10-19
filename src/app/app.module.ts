import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CartComponent } from './cart/cart.component';
import { DetailedComponent } from './detailed-book/detailed-book.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BooksComponent } from './books/books.component';
import { ErrorComponent } from './error/error.component';
import { CartCalculationComponent } from './cart-calculation/cart-calculation.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CartComponent,
    DetailedComponent,
    BookCardComponent,
    BooksComponent,
    ErrorComponent,
    CartCalculationComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
