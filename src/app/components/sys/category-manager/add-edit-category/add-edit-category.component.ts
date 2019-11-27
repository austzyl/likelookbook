import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../common/enties/Category';
import {CategoryService} from '../../../../common/services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  addOrEditTitle = '新增';

  @Output()
  closeEmitter: EventEmitter<any> = new EventEmitter();

  @Input()
  category: Category;
  eventData = {
    save: false,
    colse: true
  };
  constructor(private categoryService: CategoryService) { }


  ngOnInit() {
    if (!this.category) {
        this.category = {
          id: '',
          cateName: '',
          cateCode: '',
          cateDir: ''
        };
    }
    console.log('category:', this.category);
  }

  closeAddOrEditDialog() {
    this.closeEmitter.emit(this.eventData);
  }

  save() {
    this.categoryService.save(this.category).subscribe((data) => {
      console.log('data', data);
      if (data['success'] === 'true') {
        this.eventData.save = true;
        this.closeAddOrEditDialog();
      }
    });
  }
}
