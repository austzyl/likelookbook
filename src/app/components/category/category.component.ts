import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {BookItem} from '../../common/enties/BookItem';
import {BookService} from '../../common/services/book.service';
import {CategoryService} from '../../common/services/category.service';
import {ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit  {
  cateTree: TreeNode[] = [];
  loading = true;
  books: BookItem[] = [];
  selectedTree: TreeNode;
  param = {
    page: 0,
    size: 12,
    bookName: '',
    bookAuthor: '',
    cateCode: ''
  };
  total = 0;
  constructor(private bookService: BookService,
              private routeInfo: ActivatedRoute,
              private categoryService: CategoryService,
              private el: ElementRef,
              private renderer2: Renderer2) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.param.cateCode = params['cateCode'];
      if (this.param.cateCode === '0') {
        this.param.cateCode = '';
      }
      this.getTree();
      this.queryBooks();
    });

  }

  /**
   * 获取书籍分类，默认在sessionStorage中查询
   */
  getTree() {
    if (sessionStorage.getItem('cateTree')) {
      this.cateTree = JSON.parse(sessionStorage.getItem('cateTree'));
      console.log('this.cateTree1', this.cateTree);
      this.handleSelectTree();
      this.loading = false;
      return;
    }
    this.loading = true;
    this.categoryService.categoryTree('0').subscribe(data => {
      this.loading = false;
      if (data['success'] === 'true') {
        this.cateTree = data['data'];
        console.log('this.cateTree2', this.cateTree);
        this.handleSelectTree();
        sessionStorage.setItem('cateTree', JSON.stringify(this.cateTree));
      }
    });
  }

  /**
   * 获取当前分类树种分类并展开，用于首页分类链接跳转
   */
  handleSelectTree () {
    this.cateTree.filter(item => {
      if (item.type === this.param.cateCode) {
          this.selectedTree = item;
          this.selectedTree.expanded = true;
      }
    });
  }

  /**
   * 选中当前树节点
   * @param node 当前节点
   */
  nodeSelect(node) {
    console.log('node:', node);
    node.node.expanded = !node.node.expanded;
    this.param.cateCode = node.node.type;
    this.param.page = 0;
    this.queryBooks();
  }

  /**
   * 根据条件查询书籍
   */
  queryBooks() {
    console.log('querybooks', '查询书籍');
    this.bookService.getBookManagerList(this.param).subscribe((data) => {
      console.log('data', data);
      this.books = data['data'];
      this.total = data['total'];
    });
  }
  queryBooksBySearch() {
    this.param.page = 0;
    this.queryBooks();
  }
  /**
   * 分页事件
   * @param e 事件对象
   */
  paginate(e) {
    console.log('e', e);
    this.param.page = e.page;
    this.queryBooks();
  }

  /**
   * 回车键查询
   * @param e 键盘事件
   */
  onEnterPress(e) {
    if (e.keyCode === 13) {
      this.queryBooksBySearch();
    }
  }
  ngAfterViewInit() {
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-tree'),
      'height', (document.documentElement.clientHeight - 121) + 'px');
  }
}
