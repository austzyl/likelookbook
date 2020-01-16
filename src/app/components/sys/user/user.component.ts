import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5';
import {UserService} from '../../../common/services/user.service';
import {User} from '../../../common/enties/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  userList(params) {
    this.userService.queryUsers(params).subscribe(res => {
      console.log('用户列表', res);
    });
  }


}
