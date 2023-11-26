import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  books$: Observable<Book[]>;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this._bookService.getBooks();
  }
}
