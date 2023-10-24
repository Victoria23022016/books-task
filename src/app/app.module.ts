import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailedComponent } from './components/detailed-book/detailed-book.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksComponent } from './components/books/books.component';
import { ErrorComponent } from './components/error/error.component';
import { BookSearchComponent } from './components/book-search/book-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CartComponent,
    DetailedComponent,
    BookCardComponent,
    BooksComponent,
    ErrorComponent,
    BookSearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
