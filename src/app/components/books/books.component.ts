import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit {
  books: Book[];

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books = this._bookService.getBooks();
  }
}
