import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonCategory} from '../../common/enties/CommonCategory';
import {BookService} from '../../common/services/book.service';
import {BookItem} from '../../common/enties/BookItem';
import {CategoryService} from '../../common/services/category.service';
import {Category} from '../../common/enties/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  oTitle = '1';
  images: any[];

  items: BookItem[] = [];
  cateNames: any[] = [];
  cateCodes: any[] = [];
  categories: Category[] = [];

  constructor(private router: Router,
              private bookService: BookService,
              private cateService: CategoryService) {

  }

  ngOnInit() {
    this.getCategories();
    this.getCateBooks();

    this.images = [];
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria1.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria2.jpg',
      alt: 'Description for Image 2',
      title: 'Title 2'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria3.jpg',
      alt: 'Description for Image 3',
      title: 'Title 3'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria4.jpg',
      alt: 'Description for Image 4',
      title: 'Title 4'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria5.jpg',
      alt: 'Description for Image 5',
      title: 'Title 5'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria6.jpg',
      alt: 'Description for Image 6',
      title: 'Title 6'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria7.jpg',
      alt: 'Description for Image 7',
      title: 'Title 7'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria8.jpg',
      alt: 'Description for Image 8',
      title: 'Title 8'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria9.jpg',
      alt: 'Description for Image 9',
      title: 'Title 9'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria10.jpg',
      alt: 'Description for Image 10',
      title: 'Title 10'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria11.jpg',
      alt: 'Description for Image 11',
      title: 'Title 11'
    });
    this.images.push({
      source: 'assets/showcase/images/demo/galleria/galleria12.jpg',
      alt: 'Description for Image 12',
      title: 'Title 12'
    });
  }

  clickImage(event) {
    console.log('event:', event);
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

}
