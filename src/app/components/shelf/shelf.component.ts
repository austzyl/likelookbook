import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../common/services/user.service';
import {SessionStorageService} from '../../common/services/session-storage.service';
import {BookService} from '../../common/services/book.service';
import {Message} from 'primeng/api';

declare var $: any;
declare var Books: any;

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  books: any[] = [];
  message: Message[] = [];
  params = {
    userId: '',
    bookName: '',
    page: 0,
    size: 10
  };
  pages = 0;

  constructor(private userService: UserService,
              private sessionStorageService: SessionStorageService,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit() {
    console.log('$', $);
    this.params.userId = this.sessionStorageService.getAuth('userId');
    if (!this.params.userId) {
      this.router.navigate(['/user/login']);
    }
    this.getShelfBooks();
    Books.init();
  }

  clickBook(book) {
    this.router.navigate(['/detail/' + book.bookDir]);
  }

  /**
   * 获取当前用户书架书籍
   * @param userId 用户ID
   */
  getShelfBooks() {
    this.bookService.getShelfBooks(this.params).subscribe(res => {
      console.log('获取用户书架', res);
      if (res['success'] === 'true') {
        this.books = res['data'];
        this.pages = Math.ceil(res['total'] / 10);
        console.log('aaaa', this.pages);
      } else {
        this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
      }
    });
  }

  remove(userId, bookId) {
    console.log('userID', userId);
    console.log('bookId', bookId);
    this.bookService.removeFromShelf(userId, bookId).subscribe(res => {
      console.log('移除书架返回', res);
      if (res['success'] === 'true') {
        this.params.page = 0;
        this.getShelfBooks();
        this.message = [{severity: 'info', summary: '移除成功！'}];
      } else {
        this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
      }

    });
  }
  previousPage() {
    if (this.params.page === 0 || this.pages === 0) {
      return;
    }
    this.params.page -= 1;
    console.log('this.params:', this.params);
    this.getShelfBooks();
  }

  nextPage() {
    if (this.params.page === this.pages - 1 || this.pages === 0) {
      return;
    }
    this.params.page += 1;
    console.log('this.params:', this.params);
    this.getShelfBooks();
  }
}
