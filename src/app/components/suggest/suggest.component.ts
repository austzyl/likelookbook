import { Component, OnInit } from '@angular/core';
import {SessionStorageService} from '../../common/services/session-storage.service';
import {Router} from '@angular/router';
import {SuggestService} from '../../common/services/suggest.service';
import {SUGGEST_COLS} from '../../common/enties/Const';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
  message;
  content = '';
  userId;
  count = 0;
  showViewSuggest = false;
  cols = SUGGEST_COLS;
  userSuggests: any[] = [];
  constructor(private sessionStorageService: SessionStorageService,
              private suggestService: SuggestService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.sessionStorageService.getAuth('userId');
    if (!this.userId) {
      this.router.navigate(['/user/login']);
    } else {
      this.getUserSuggestCount();
    }
  }
  save() {
    if (this.content.length < 10 || this.content.length > 500) {
      this.message = [{severity: 'warn', summary: '建议长度在10-500个字符！'}];
      return;
    }
    this.suggestService.getUserSuggestCount(this.userId).subscribe(res => {
      if (res['success'] === 'true') {
        if (res['data'] > 2) {
          this.message = [{severity: 'warn', summary: '每个用户最多提交3次建议！'}];
          return;
        } else {
          this.suggestService.save({userId: this.userId, userSuggest: this.content}).subscribe(data => {
            this.message = [{severity: 'info', summary: '提交成功，我们会通过邮箱回复你的反馈，感谢您的支持！'}];
            this.content = '';
            this.getUserSuggestCount();
          });
        }

      }
    });

  }

  getUserSuggestCount() {
    this.suggestService.getUserSuggestCount(this.userId).subscribe(res => {
      if (res['success'] === 'true') {
        this.count = res['data'];
        if (this.count > 2) {
          this.message = [{severity: 'warn', summary: '每个用户最多提交3次建议！'}];
        }
      }
    });
  }

  viewSuggest() {
    this.showViewSuggest = true;
    this.suggestService.getUserSuggests(this.userId).subscribe(res => {
      if (res['success'] === 'true') {
        this.userSuggests = res['data'];
      }
    });
  }

  closeViewSuggest(e) {
    this.showViewSuggest = false;
  }


}
