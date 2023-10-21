import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
} from 'rxjs';
import { Book } from '../book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent implements OnInit {
  _searchTerms = new Subject<string>();
  books$: Observable<Book[]>;

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this._searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap((value: string) => this._bookService.searchBook(value))
    );
  }

  search(value: string): void {
    this._searchTerms.next(value);
  }
}
