import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {BookService} from '../../../common/services/book.service';
import {BookItem} from '../../../common/enties/BookItem';
import {BOOK_COLS} from '../../../common/enties/Const';
import {CategoryService} from '../../../common/services/category.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit, AfterViewInit  {
  cateTree: TreeNode[] = [];
  loading = true;
  cols = BOOK_COLS;
  scrollHeight = '0px';
  books: BookItem[] = [];
  selectedBook: BookItem[] = [];
  selectedTree: TreeNode;
  param = {
    page: 0,
    size: 10,
    bookName: '',
    bookAuthor: '',
    cateCode: ''
  };
  showAddEdit = false;
  editItem: BookItem = null;
  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private el: ElementRef,
              private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.queryBooks();
    this.getTree();
  }

  queryBooks() {
    console.log('querybooks', '查询书籍');
    console.log('selectedBook', this.selectedBook);
    this.bookService.getBookManagerList(this.param).subscribe((data) => {
      console.log('data', data);
      this.books = data['data'];
    });
  }
  getTree() {
    if (sessionStorage.getItem('cateTree')) {
      this.cateTree = JSON.parse(sessionStorage.getItem('cateTree'));
      this.loading = false;
      return;
    }
    this.loading = true;
    this.categoryService.categoryTree('0').subscribe(data => {
      this.loading = false;
      if (data['success'] === 'true') {
        this.cateTree = data['data'];
        sessionStorage.setItem('cateTree', JSON.stringify(this.cateTree));
      }
    });
  }
  nodeSelect(node) {
    console.log('node:', node);
    node.node.expanded = !node.node.expanded;
    this.param.cateCode = node.node.type;
    this.queryBooks();
  }
  doShowAddEdit(item) {
    if (item && this.selectedBook.length !== 1) {
      alert('只能选择一条数据');
      return;
    }
    if (item !== null) {
      this.editItem = item[0];
    } else {
      this.editItem = null;
    }
    this.showAddEdit = true;
  }
  doCloseAddEdit(event) {
    this.selectedBook = [];
    this.showAddEdit = false;
    this.editItem = null;
    if (event.save) {
      this.queryBooks();
    }
  }
  ngAfterViewInit() {
    // 修改表格高度撑开页面
    this.scrollHeight = (document.documentElement.clientHeight - 118) + 'px';
    // this.el.nativeElement.querySelector('.ui-table-scrollable-body').style.height = this.scrollHeight;
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-table-scrollable-body'), 'height', this.scrollHeight);
  }
}
