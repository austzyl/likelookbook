import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookItem} from '../../../../common/enties/BookItem';
import {BookService} from '../../../../common/services/book.service';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  @Input()
  bookItem: BookItem;
  @Output()
  closeEmitter: EventEmitter<any> = new EventEmitter();

  eventData = {
    save: false,
    close: true
  };
  addOrEditTitle = '新增';
  constructor(private bookService: BookService) { }

  ngOnInit() {

    if (this.bookItem) {
      this.addOrEditTitle = '编辑';
      console.log('this.bookItem:', this.bookItem);
    } else {
      this.bookItem = BookItem.newInstance();
      console.log('this.bookItem:', this.bookItem);
    }
  }

  closeAddOrEditDialog() {
    this.closeEmitter.emit(this.eventData);
  }

  save() {
    this.bookService.save(this.bookItem).subscribe(data => {
      console.log('save response:', data);
      this.eventData.save = true;
      this.closeAddOrEditDialog();
    });
  }

}
