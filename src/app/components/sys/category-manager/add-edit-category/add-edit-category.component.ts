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

  @Input()
  isAdd;

  editCategory: Category;
  cateCodes = [
    {
      label: 'Level One',
      value: 1
    },
    {
      label: 'Level Two',
      value: 2
    },
    {
      label: 'Level Three',
      value: 3
    }
  ];
  eventData = {
    save: false,
    close: true
  };
  constructor(private categoryService: CategoryService) { }


  ngOnInit() {
    if (this.isAdd) {
        this.editCategory = {
          id: '',
          cateName: '',
          cateCode: '',
          cateDir: ''
        };
    } else {
      this.addOrEditTitle = '编辑';
      this.editCategory = this.category;
    }
    console.log('category:', this.category);
  }

  closeAddOrEditDialog() {
    this.closeEmitter.emit(this.eventData);
  }

  save() {
    this.categoryService.save(this.editCategory, this.category.id).subscribe((data) => {
      console.log('data', data);
      if (data['success'] === 'true') {
        this.eventData.save = true;
        this.closeAddOrEditDialog();
      }
    });
  }
}
