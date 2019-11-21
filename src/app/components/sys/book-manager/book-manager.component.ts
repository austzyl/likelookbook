import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {BookService} from '../../../common/services/book.service';
import {BookItem} from '../../../common/enties/BookItem';
import {BOOK_COLS} from '../../../common/enties/Const';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.css']
})
export class BookManagerComponent implements OnInit, AfterViewInit  {
  filesTree1: TreeNode[] = [];
  loading = true;
  cols = BOOK_COLS;
  scrollHeight = '0px';
  books: BookItem[] = [];
  selectedBook: BookItem;
  param = {
    page: 0,
    size: 10,
    bookName: '',
    bookAuthor: ''
  };
  constructor(private bookService: BookService,
              private el: ElementRef,
              private renderer2: Renderer2) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.filesTree1 = [
        {
          'label': 'Documents',
          'data': 'Documents Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [{
            'label': 'Work',
            'data': 'Work Folder',
            'expandedIcon': 'fa fa-folder-open',
            'collapsedIcon': 'fa fa-folder',
            'children': [{
              'label': 'Expenses.doc',
              'icon': 'fa fa-file-word-o',
              'data': 'Expenses Document'
            }, {'label': 'Resume.doc', 'icon': 'fa fa-file-word-o', 'data': 'Resume Document'}]
          },
            {
              'label': 'Home',
              'data': 'Home Folder',
              'expandedIcon': 'fa fa-folder-open',
              'collapsedIcon': 'fa fa-folder',
              'children': [{'label': 'Invoices.txt', 'icon': 'fa fa-file-word-o', 'data': 'Invoices for this month'}]
            }]
        },
        {
          'label': 'Pictures',
          'data': 'Pictures Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [
            {'label': 'barcelona.jpg', 'icon': 'fa fa-file-image-o', 'data': 'Barcelona Photo'},
            {'label': 'logo.jpg', 'icon': 'fa fa-file-image-o', 'data': 'PrimeFaces Logo'},
            {'label': 'primeui.png', 'icon': 'fa fa-file-image-o', 'data': 'PrimeUI Logo'}]
        },
        {
          'label': 'Movies',
          'data': 'Movies Folder',
          'expandedIcon': 'fa fa-folder-open',
          'collapsedIcon': 'fa fa-folder',
          'children': [{
            'label': 'Al Pacino',
            'data': 'Pacino Movies',
            'children': [{
              'label': 'Scarface',
              'icon': 'fa fa-file-video-o',
              'data': 'Scarface Movie'
            }, {'label': 'Serpico', 'icon': 'fa fa-file-video-o', 'data': 'Serpico Movie'}]
          },
            {
              'label': 'Robert De Niro',
              'data': 'De Niro Movies',
              'children': [{
                'label': 'Goodfellas',
                'icon': 'fa fa-file-video-o',
                'data': 'Goodfellas Movie'
              }, {'label': 'Untouchables', 'icon': 'fa fa-file-video-o', 'data': 'Untouchables Movie'}]
            }]
        }
      ];
      this.loading = false;
    }, 1000);

    this.queryBooks();
  }

  queryBooks() {
    console.log('querybooks', '查询书籍');
    console.log('selectedBook', this.selectedBook);
    this.bookService.getBookManagerList(this.param).subscribe((data) => {
      console.log('data', data);
      this.books = data['data'];
    });
  }
  ngAfterViewInit() {
    // 修改表格高度撑开页面
    this.scrollHeight = (document.documentElement.clientHeight - 118) + 'px';
    // this.el.nativeElement.querySelector('.ui-table-scrollable-body').style.height = this.scrollHeight;
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-table-scrollable-body'), 'height', this.scrollHeight);
  }
}
