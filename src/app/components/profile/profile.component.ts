import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BookItem} from '../../common/enties/BookItem';
import {e} from '@angular/core/src/render3';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BookService} from '../../common/services/book.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SafeResourceUrl} from '@angular/platform-browser/src/security/dom_sanitization_service';
import {SessionStorageService} from '../../common/services/session-storage.service';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  item: BookItem = BookItem.newInstance();
  commentsList: any[] = [];
  totalComments = 0;
  message: Message[] = [];
  bookId = '';
  safeUrl: SafeResourceUrl;
  constructor(private routeInfo: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private bookService: BookService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.bookService.getOne(this.bookId).subscribe(item => {
        console.log('item', item);
        this.item = item['data'];
        if (this.item.bookImageFileString) {
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' +  this.item.bookImageFileString);
        }
      });
    });
  }
  /**
   * 点星星
   * @param e 事件对象
   */
  rate(event) {
    console.log('event', event.value);
  }

  /**
   * TODO 提交评论
   */
  commitComment() {
    console.log('提交评论：');
  }

  /**
   * TODO 更多评论
   */
  moreComments() {
  }

  /**
   * 加入书架
   */
  addToShelf(item) {
    // TODO 保存到当前用户书架之中
    const userId = this.sessionStorageService.getAuth('userId');
    if (!userId) {
      this.message = [{severity: 'info', summary: '请先登录！'}];
      return;
    } else {
      this.bookService.saveToShelf(userId, this.bookId, 0).subscribe(res => {
        if (res['success'] === 'true') {
          this.message = [{severity: 'info', summary: '添加成功！'}];
        } else {
          this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
        }
      });
    }
  }
  ngAfterViewInit(): void {
    const goTopBtn = document.getElementById('returnToTop');
    const profile_view = document.getElementById('profile_view');
    // 点击返回顶部
    if (goTopBtn) {
      goTopBtn.onclick = () => {
        profile_view.scrollTop = 0;
      };
    }
    const elementsByTagName = document.getElementsByTagName('body');
  }
  /**
   * 滚动条滚动事件
   *
   */
  scrollDiv(event) {
    console.log('event', event);
    const goTopBtn = document.getElementById('returnToTop');
    if (goTopBtn) {
      // 获取目标滚动条相对顶部位置
      const scrollTop = event.target.scrollTop;
      // 滚动高度大于50显示返回顶部按钮
      scrollTop > 50 ? (goTopBtn.style.display = 'block') : (goTopBtn.style.display = 'none');
    }
  }
  goBack() {
    history.go(-1);
  }
}
