import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BookService} from '../../common/services/book.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  params = {
    currentPage: 1,
    flag: '1',
    filePath: ''
  };

  prePageContent = '';
  nextPageContent = '';
  bookid;
  isPageModel = true;

  constructor(private routeInfo: ActivatedRoute, private router: Router, private bookService: BookService) {
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      this.bookid = params['id'];
      this.params.filePath = 'D:\\doc\\book\\04现代当代\\《杜拉拉升职记》作者：李可\\《杜拉拉升职记》作者：李可.txt';
      console.log('bookid', this.bookid);
      this.bookService.getContent(this.params).subscribe(data => {
        console.log('data', data);
        if (data['success'] === 'true') {
          this.prePageContent = data['data']['sw1'];
          this.nextPageContent = data['data']['sw2'];
        }
      });
    });
    /*const tsthis = this;
    /!** This is high-level function.
     * It must react to delta being more/less than zero.
     *!/
    window['handle'] = function(delta) {
      const random_num = Math.floor((Math.random() * 100) + 50);
      if (delta < 0) {
        // alert("鼠标滑轮向下滚动：" + delta + "次！"); // 1
        tsthis.changePage('0');
        console.log('aaaaaaaaaaaa', delta);
        return;
      } else {
        // alert("鼠标滑轮向上滚动：" + delta + "次！"); // -1
        console.log('bbbbbbbbbbbbb', delta);
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

  changePage(flag) {
    if (flag === '0') {
      if (this.params.currentPage > 1) {
        this.params.currentPage--;
      } else {
        return;
      }
    } else {
      this.params.currentPage++;
    }

    this.params.flag = flag;
    this.bookService.getContent(this.params).subscribe(data => {
      console.log('data', data);
      if (data['success'] === 'true') {
        // data.data为null时候，读取到最后一页
        if (data['data'] === null || !data['data']['sw2'] || !data['data']['sw1']) {
          this.params.currentPage --;
          return;
        }
        this.prePageContent = data['data']['sw1'];
        this.nextPageContent = data['data']['sw2'];

      }
    });
  }

  /**
   * 阅读界面全屏显示
   *
   */
  fullscreen(elem: any = document.getElementById('bookcontent')): void {
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

}
