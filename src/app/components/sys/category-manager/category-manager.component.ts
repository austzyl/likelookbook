import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CATEGORY_COLS} from '../../../common/enties/Const';
import {CategoryService} from '../../../common/services/category.service';
import {Category} from '../../../common/enties/Category';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit, AfterViewInit  {
  cols = CATEGORY_COLS;
  scrollHeight = '0px';
  categories: Category[] = [];
  selectedCategories: Category[] = [];
  showAddOrEditDialog = false;
  param = {
    page: 0,
    size: 10,
    cateName: '',
    cateCode: ''
  };
  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.queryCategories();
  }


  addOrEditCategory(selected) {
    console.log('this.selected', this.selectedCategories);
    if (selected && (this.selectedCategories.length > 1 || this.selectedCategories.length === 0)) {
        alert('请选中一个分类进行编辑！');
        return;
    }
    this.showAddOrEditDialog = true;
  }
  queryCategories() {
    this.selectedCategories = [];
    this.categoryService.queryCategories(this.param).subscribe((data) => {
      console.log('date', data);
      this.categories = data['data'];
    });
  }
  closeListener(event) {
    console.log('e', event);
    this.selectedCategories = [];
    this.showAddOrEditDialog = false;
    if (event.save) {
        this.queryCategories();
    }
  }
  deleteCategories() {
    const params = this.selectedCategories.map((item) => {
      return item.id;
    });
    console.log('deleteparams:', params);
    this.categoryService.delete(params).subscribe((data) => {
      console.log('data', data);
    });
  }
  ngAfterViewInit() {
    // 修改表格高度撑开页面
    this.scrollHeight = (document.documentElement.clientHeight - 118) + 'px';
    // this.el.nativeElement.querySelector('.ui-table-scrollable-body').style.height = this.scrollHeight;
    // this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-table-scrollable-body'), 'height', this.scrollHeight);
  }
}
