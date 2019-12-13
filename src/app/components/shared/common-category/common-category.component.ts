import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-common-category',
  templateUrl: './common-category.component.html',
  styleUrls: ['./common-category.component.css']
})
export class CommonCategoryComponent implements OnInit {

  @Input()
  items: any[];
  @Input()
  cateName;
  @Input()
  cateCode;

  item_0;
  otherItems: any[];

  constructor() { }

  ngOnInit() {
    if (this.items.length > 0) {
        this.item_0 = this.items[0];

      this.otherItems = this.items.filter((v, i) => {
        return i !== 0;
      });



    }
  }

  more(id) {
    console.log('more book');
  }
}
