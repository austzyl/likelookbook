import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var Books: any;
@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('$', $);
    Books.init();
  }

  clickBook(book) {
    console.log('clickBook:', book);
  }
}
