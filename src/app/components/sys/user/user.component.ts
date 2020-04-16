import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../../common/services/user.service';
import {USER_COLS} from '../../../common/enties/Const';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  users: any[] = [];
  cols: any[] = USER_COLS;
  selectedUser;
  totalRecords = 0;
  scrollHeight = '';
  first = 0;

  params = {
    page: 0,
    size: 10,
    userName: ''
  };

  constructor(
    private userService: UserService,
    private el: ElementRef,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit() {
    this.userList();
  }

  userList() {
    this.userService.queryUsers(this.params).subscribe(res => {
      // console.log('用户列表', res);
      if (res['success'] === 'true') {
        this.users = res['data'];
        this.totalRecords = res['total'];
      }
    });
  }

  pageChange(e) {
    this.params.page = e.first / this.params.size;
    this.first = e.first;
    this.userList();
  }

  enterQuery(e) {
    if (e.keyCode === 13) {
      this.params.userName = e.target.value;
      this.params.page = 0;
      this.first = 0;
      this.userList();
    }
  }

  reset() {
    this.params.page = 0;
    this.params.userName = '';
    this.userList();
  }

  ngAfterViewInit() {
    // 修改表格高度撑开页面
    this.scrollHeight = (document.documentElement.clientHeight - 240) + 'px';
    // this.el.nativeElement.querySelector('.ui-table-scrollable-body').style.height = this.scrollHeight;
    this.renderer2.setStyle(this.el.nativeElement.querySelector('.ui-table-scrollable-body'), 'height', this.scrollHeight);
  }
}
