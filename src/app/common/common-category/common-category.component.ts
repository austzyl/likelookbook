import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-common-category',
  templateUrl: './common-category.component.html',
  styleUrls: ['./common-category.component.css']
})
export class CommonCategoryComponent implements OnInit {

  @Input()
  item;

  constructor() { }

  ngOnInit() {
  }

  more(id) {
    console.log('more book');
  }
}
