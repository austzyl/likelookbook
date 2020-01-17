import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonCategory} from '../../common/enties/CommonCategory';
import {BookService} from '../../common/services/book.service';
import {BookItem} from '../../common/enties/BookItem';
import {CategoryService} from '../../common/services/category.service';
import {Category} from '../../common/enties/Category';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  oTitle = '1';
  images: any[];
  showAdvise = false;
  items: BookItem[] = [];
  cateNames: any[] = [];
  cateCodes: any[] = [];
  categories: Category[] = [];

  recommends: BookItem[] = [];
  scrollBooks: BookItem[] = [];

  constructor(private router: Router,
              private bookService: BookService,
              private cateService: CategoryService) {

  }

  ngOnInit() {
    this.getCategories();
    this.getCateBooks();
    this.getRecommends();
    this.getScrollBooks();
    this.images = [];
    for (let i = 0; i < 12; i++) {
      this.images.push({
        source: 'assets/showcase/images/demo/galleria/galleria' + i + '.jpg',
        title: '',
        width: '300'
      });
    }
  }

  clickImage(event) {
    console.log('event:', event);
    this.router.navigate(['/profile', this.scrollBooks[event.index].id]);
  }

  imageChanged(e) {
    this.oTitle = e.index + 1;
  }

  getCateBooks() {
    this.bookService.books().subscribe(data => {
      console.log('d', data);
      this.items = data['data'];
      this.cateNames = data['message'].split(',');
      this.cateCodes = data['extend'].split(',');
    });
  }

  getCategories() {
    this.cateService.categories('0', 0, 9).subscribe(data => {
      console.log('data', data);
      if (data['success'] === 'true') {
        this.categories = data['data'];
      }
    });
  }

  getRecommends() {
    this.bookService.getBooksRankings().subscribe(data => {

      console.log('recommends datas:', data);
      if (data['success'] === 'true') {
        this.recommends = data['data'];
      }
    });
  }

  getScrollBooks() {
    this.bookService.getScrollBooks().subscribe(data => {
      if (data['success'] === 'true') {
        this.scrollBooks = data['data'];
      }
    });
  }
}
