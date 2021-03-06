import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5';
import {User} from '../../../common/enties/User';
import {UserService} from '../../../common/services/user.service';
import {SessionStorageService} from '../../../common/services/session-storage.service';
import {Router} from '@angular/router';
import {Message} from 'primeng/api';
import {DropdownLabelValue} from '../../../common/enties/DropdownLabelValue';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  message: Message[] = [];
  showRegister = false;
  showForgotPassword = false;
  // 登录用户名密码
  userName = '';
  pwd = '';
  // 注册密码和确认密码
  registerPassword = '';
  confirmPassword = '';
  // 重置密码和确认密码
  forgotRegisterPassword = '';
  forgotConfirmPassword = '';
  user: User = User.newInstance();
  forgotUser: User = User.newInstance();

  questionsOne: DropdownLabelValue[] = [
    new DropdownLabelValue('你的小学名字叫什么？', '你的小学名字叫什么？'),
    new DropdownLabelValue('你的出生地在哪里？', '你的出生地在哪里？')
  ];
  questionsTwo: DropdownLabelValue[] = [
    new DropdownLabelValue('你最爱看的书是哪种类型？', '你最爱看的书是哪种类型？'),
    new DropdownLabelValue('你最喜欢吃的食物是什么？', '你最喜欢吃的食物是什么？')
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit() {
    // console.log('questionO', this.questionsOne);
    if (this.sessionStorageService.getAuth('isa')) {
      this.router.navigate(['/']);
    }
  }

  /**
   * 登录
   */
  login() {
    this.userService.login({userName: this.userName, pwd: Md5.hashStr(this.pwd)}).subscribe(res => {
      // console.log('login-result:', res);
      if (res['success'] === 'true') {
        const auth = {
          isa: true,
          userId: res['data'].split(',')[0],
          ism: false
        };
        if (res['data'].split(',')[2] === 'manager') {
          auth.ism = true;
        }
        this.sessionStorageService.setAuth(auth);
        history.go(-1);
        // this.router.navigate(['/']);
      } else {
        this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
      }
    });
  }

  /**
   * 回车键快速登录
   * @param e 键盘事件
   */
  enterAction(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  /**
   * 注册
   */
  register() {
    if (this.registerPassword !== this.confirmPassword) {
      this.message = [{severity: 'error', summary: '两次输入的密码不一致！'}];
      return;
    }

    this.user.password = Md5.hashStr(this.registerPassword);
    this.userService.register(this.user).subscribe(res => {
      // console.log('register result：', res);
      if (res['success'] === 'true') {
        this.message = [{severity: 'info', summary: '注册成功！'}];
        this.showRegister = false;
        this.registerPassword = '';
        this.confirmPassword = '';
        this.user = User.newInstance();
      } else {
        this.message = [{severity: 'error', summary: res['message'] ? res['message'] : '请求失败！'}];
      }
    });
  }

  /**
   * 忘记密码
   */
  forgotPassword() {
    if (this.forgotRegisterPassword !== this.forgotConfirmPassword) {
      this.message = [{severity: 'error', summary: '两次输入的密码不一致！'}];
      return;
    }
    this.forgotUser.password = Md5.hashStr(this.forgotRegisterPassword);
    this.userService.forgotPassword(this.forgotUser).subscribe(res => {
      // console.log('忘记密码', res);
      if (res['success'] === 'true') {
        this.showForgotPassword = false;
        this.forgotRegisterPassword = '';
        this.forgotConfirmPassword = '';
        this.userName = '';
        this.pwd = '';
        this.forgotUser = User.newInstance();
        this.message = [{severity: 'info', summary: '密码找回成功！'}];
      } else {
        this.message = [{severity: 'error', summary: res['data']}];
      }
      this.sessionStorageService.clearAuth();
    });
  }
  toHome() {
    this.router.navigate(['/']);
  }
  ngAfterViewInit() {
  }
}
