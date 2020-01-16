import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../common/services/user.service';

declare var $: any;
declare var Books: any;
@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    console.log('$', $);
    Books.init();
  }

  clickBook(book) {
    console.log('clickBook:', book);
  }
}
