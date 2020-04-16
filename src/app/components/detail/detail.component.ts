import {Component, ElementRef, OnInit, ViewRef} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {BookService} from '../../common/services/book.service';
import {EventManager} from '@angular/platform-browser';
import {SessionStorageService} from '../../common/services/session-storage.service';
import {Message} from 'primeng/api';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  params = {
    currentPage: 0,
    startLine: -1,
    endLine: 120, // 初始行数
    flag: '1',
    bookDir: '',
    bytesCount: 120, // 每页行数
    bookId: ''

  };
  message: Message[] = [];

  prePageContent = '';
  nextPageContent = '';
  // 分页读取模式
  isPageModel = true;

  isShelf = false;

  backGround = '#dfdfdf';
  selectPageColor = false;
  showOptMenu = true;
  fontFamily = 'serif';
  selectFontFamily = false;
  backGroundImage = false;

  showTip = true;

  constructor(private routeInfo: ActivatedRoute,
              private eventManager: EventManager,
              private sessionStorageService: SessionStorageService,
              private router: Router,
              private bookService: BookService) {
  }

  ngOnInit() {

    this.getParams();
    // console.log('routeInfo', this.routeInfo);
    setTimeout(() => {
      this.showTip = false;
    }, 20000);
    /*const tsthis = this;
    /!** This is high-level function.
     * It must react to delta being more/less than zero.
     *!/
    window['handle'] = function(delta) {
      const random_num = Math.floor((Math.random() * 100) + 50);
      if (delta < 0) {
        // alert("鼠标滑轮向下滚动：" + delta + "次！"); // 1
        tsthis.changePage('0');
        // console.log('aaaaaaaaaaaa', delta);
        return;
      } else {
        // alert("鼠标滑轮向上滚动：" + delta + "次！"); // -1
        // console.log('bbbbbbbbbbbbb', delta);
        tsthis.changePage('1');
        return;
      }
    };
    window['wheel'] = function (event) {
      let delta = 0;
      if (!event) /!* For IE. *!/ {
        event = window.event;
      }
      if (event.wheelDelta) { /!* IE/Opera. *!/
        delta = event.wheelDelta / 120;
      } else if (event.detail) {
        /!** Mozilla case. *!/
        /!** In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3.
         *!/
        delta = -event.detail / 3;
      }
      /!** If delta is nonzero, handle it.
       * Basically, delta is now positive if wheel was scrolled up,
       * and negative, if wheel was scrolled down.
       *!/
      if (delta) {
        window['handle'](delta);
      }

      /!** Prevent default actions caused by mouse wheel.
       * That might be ugly, but we handle scrolls somehow
       * anyway, so don't bother here..
       *!/
      /!*if (event.preventDefault) {
        event.preventDefault();
      }
      event.returnValue = false;*!/
    };

    /!** Initialization code.
     * If you use your own event management code, change it as required.
     *!/

    if (window.addEventListener) {
      /!** DOMMouseScroll is for mozilla. *!/
      window.addEventListener('DOMMouseScroll', window['wheel'], false);
    }
    /!** IE/Opera. *!/
    window.onmousewheel = document.onmousewheel = window['wheel'];*/


  }

  getParams() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.params.bookDir = params['bookDir'];
      this.params.bookId = params['id'];
      // 如果是书架书籍，当前页为书架中保存到页数
      if (this.sessionStorageService.getAuth('userId')) {
        this.bookService.getShelfBook(this.sessionStorageService.getAuth('userId'), this.params.bookId).subscribe(res => {
          if (res['success'] === 'true') {
            if (res['data'] !== null) {
              this.isShelf = true;
              this.params.currentPage = res['data']['readPage'] - 1;
            }
            this.getContent();
          }
        });
      } else {
        this.getContent();
      }
    });
  }

  getContent() {
    this.bookService.getContent(this.params).subscribe(data => {
      // console.log('getContent', data);
      if (data['success'] === 'true') {
        this.leftOrRightListener();
        this.nextPageContent = data['data']['sw1'];
        if (!this.nextPageContent) {
          this.params.currentPage = 0;
        }
        // console.log('this.currentPage:', this.params.currentPage);
        // this.nextPageContent = data['data']['sw2'];
      }
    });
  }

  leftOrRightListener() {
    // 左右键键盘事件
    this.eventManager.addGlobalEventListener('window', 'keydown', (event: any) => {
      if (event.keyCode === 37) {
        // 监听到 上下左右 的键盘按下事件时，调用我自己的rePosition()方法~
        this.changePage('0');
      } else if (event.keyCode === 39) {
        this.changePage('1');
      }
    });
  }

  changePage(flag) {
    if (flag === '0') {
      if (this.params.currentPage > 0) {
        this.params.currentPage--;
      } else {
        return;
      }
    } else {
      this.params.currentPage++;
    }

    this.params.flag = flag;

    this.params.startLine = this.params.currentPage * this.params.bytesCount - 1;
    this.params.endLine = this.params.currentPage * this.params.bytesCount + this.params.bytesCount;
    this.bookService.getContent(this.params).subscribe(data => {
      // console.log('data', data);
      if (data['success'] === 'true') {
        // data.data为null时候，读取到最后一页
        if (data['data'] === null || !data['data']['sw1']) {
          this.params.currentPage--;
          return;
        }
        this.nextPageContent = data['data']['sw1'];
        this.toTop();
        // this.nextPageContent = data['data']['sw2'];

      }
    });
  }

  /**
   * 阅读界面全屏显示
   *
   */
  fullscreen(elem: any = document.getElementsByTagName('html')[0]): void {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docElm = elem;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  changeColor() {
    this.selectPageColor = true;
  }


  goBack() {
    history.go(-1);
  }

  toTop() {
    const elementsByName = document.getElementsByTagName('html')[0];
    elementsByName.scrollTop = 0;
  }

  /**
   * 加入书架
   */
  addToShelf() {
    const userId = this.sessionStorageService.getAuth('userId');
    if (!userId) {
      this.message = [{severity: 'info', summary: '请先登录！'}];
      return;
    } else {
      this.bookService.saveToShelf(userId, this.params.bookId, this.params.currentPage + 1).subscribe(res => {
        if (res['success'] === 'true') {
          this.message = [{severity: 'info', summary: '添加成功！'}];
          this.isShelf = true;
        } else {
          this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
        }
      });
    }
  }

  jump(page) {
    if (page < 1) {
      this.message = [{severity: 'info', summary: '请输入大于0的跳转页数'}];
      return;
    }
    this.params.currentPage = page - 1;
    this.params.startLine = this.params.currentPage * this.params.bytesCount - 1;
    this.params.endLine = this.params.currentPage * this.params.bytesCount + this.params.bytesCount;
    this.getContent();
    this.toTop();
  }

  jumpChange(e) {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
  }

  selectColor(color) {
    if (color) {
      this.backGroundImage = false;
      this.backGround = color;
    } else {
      this.backGroundImage = true;
    }
  }

  changeFontFamily() {
    this.selectFontFamily = true;
  }

  selectFont(s: string) {
    this.fontFamily = s;
  }
}
