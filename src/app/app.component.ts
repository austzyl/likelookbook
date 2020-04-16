import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'likelookbook';
  isHomePage = false;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd ) {
          // console.log('e', e);
          if (e.urlAfterRedirects === '/home') {
            this.isHomePage = true;
          } else {
            this.isHomePage = false;
          }
        }
      });
  }

}
