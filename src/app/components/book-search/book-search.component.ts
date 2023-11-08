import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { BookService } from '../../services/book.service';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { Book } from '../../services/book.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent implements OnInit {
  @Input() books: Book[];
  books$: Observable<Book[]>;
  private _searchTerms = new Subject<string>();

  constructor(private readonly _bookService: BookService) {}

  ngOnInit(): void {
    this.books$ = this._searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value: string) =>
        this._bookService.searchBook(value, this.books)
      )
    );
  }

  search(value: string): void {
    this._searchTerms.next(value);
  }
}
