import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, BookService } from '../book.service';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.css'],
})
export class DetailedComponent implements OnInit {
  book: Book;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly bookServise: BookService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      const isbn13 = params['id'];
      if (isbn13) {
        this.book = this.bookServise.getBookByISBN13(+isbn13);
      }
    });
  }
}
