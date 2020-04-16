import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CATEGORY_COLS} from '../../../common/enties/Const';
import {CategoryService} from '../../../common/services/category.service';
import {Category} from '../../../common/enties/Category';
import {a} from '@angular/core/src/render3';
import {MenuItem, TreeNode} from 'primeng/api';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit, AfterViewInit  {
  cols = CATEGORY_COLS;
  scrollHeight = '0px';
  categories: TreeNode[] = [];
  selectedCategoryNode: TreeNode;
  showAddOrEditDialog = false;
  contentItems: MenuItem[];
  isAdd = true;
  constructor(private el: ElementRef,
              private renderer2: Renderer2,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.queryCategories();
    this.contentItems = [
      { label: '新增',  command: (event) => this.addOrEditCategory(this.selectedCategoryNode, true) },
      { label: '编辑',  command: (event) => this.addOrEditCategory(this.selectedCategoryNode, false) },
      { label: '删除',  command: (event) => this.deleteCategories(this.selectedCategoryNode) }
    ];
  }

  addOrEditCategory(selectedCategoryNode, isAdd) {
    // console.log('selectedCategoryNode:', selectedCategoryNode);
    const type = selectedCategoryNode.type;
    // 到三级分类后不可新增子分类
    if (isAdd && type.substring(type.indexOf('_'), type.length).length === 5) {
      return;
    }
    this.isAdd = isAdd;
    this.showAddOrEditDialog = true;
  }

  /**
   * 优先从缓存中获取
   */
  queryCategories() {
    if (sessionStorage.getItem('cateTree')) {
      this.categories = JSON.parse(sessionStorage.getItem('cateTree'));
      return;
    }
    this.getCategories();
  }

  /**
   * 向服务端发送请求，并设置到缓存中
   */
  getCategories() {
    this.categoryService.categoryTree('0').subscribe((data) => {
      // console.log('date', data);
      this.categories = data['data'];
      sessionStorage.setItem('cateTree', JSON.stringify(this.categories));
    });
  }
  closeListener(event) {
    // console.log('e', event);
    this.showAddOrEditDialog = false;
    if (event.save) {
      this.getCategories();
    }
  }
  deleteCategories(selectedCategoryNode) {
    this.categoryService.delete([selectedCategoryNode.data['id']]).subscribe((data) => {
      // console.log('data', data);
      if (data['success'] === 'true') {
        this.getCategories();
      }
    });
  }
  ngAfterViewInit() {
    // 修改表格高度撑开页面
    this.scrollHeight = (document.documentElement.clientHeight - 239) + 'px';
    // this.el.nativeElement.querySelector('.ui-table-scrollable-body').style.height = this.scrollHeight;
    // this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-table-scrollable-body'), 'height', this.scrollHeight);
  }
}
