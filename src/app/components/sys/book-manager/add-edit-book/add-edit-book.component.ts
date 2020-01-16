import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookItem} from '../../../../common/enties/BookItem';
import {BookService} from '../../../../common/services/book.service';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {

  @Input()
  bookItem: BookItem;
  cateTree: TreeNode[] = [];
  @Output()
  closeEmitter: EventEmitter<any> = new EventEmitter();

  selectedTreeNode: TreeNode;
  loading = false;
  eventData = {
    save: false,
    close: true
  };
  addOrEditTitle = '新增';
  formData = new FormData();
  isSaved = false;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.cateTree = JSON.parse(sessionStorage.getItem('cateTree'));
    if (this.bookItem) {
      this.addOrEditTitle = '编辑';
      console.log('this.bookItem:', this.bookItem);
    } else {
      this.bookItem = BookItem.newInstance();
      console.log('this.bookItem:', this.bookItem);
    }
  }

  closeAddOrEditDialog() {
    this.closeEmitter.emit(this.eventData);
  }

  nodeSelect(e) {

  }

  save() {
   /* this.bookService.save(this.bookItem).subscribe(data => {
      console.log('save response:', data);
      this.eventData.save = true;
      this.closeAddOrEditDialog();
    });*/
    const xhr = new XMLHttpRequest();
    if (!this.isSaved) {
      // 拷贝页面数据传到后台
      Object.keys(this.bookItem).forEach((key) => {
        if (this.bookItem[key] && key !== 'png') {
          this.formData.set(key, this.bookItem[key]);
        }
      });
    }
    // 保存时候显示上传进度条
  /*  xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
      if (event.lengthComputable) {
        this.progress = Math.round((event.loaded * 100) / event.total);
      }
    }, false);*/
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          if (response.success === 'true') {
            this.closeAddOrEditDialog();
            this.isSaved = true;
          } else {
          }
          // this.showProgress = false;
        } else {
          if (xhr.response) {
            const response = JSON.parse(xhr.responseText);
            // this.toolListComponent.msgs = [{severity: 'error', summary: '提示', detail: response['message']}];
          }
        }
        // this.progress = 0;
      }
    };

    // this.showProgress = true;

    const url = '/yunqi/book';
    xhr.open('POST', url, true);
    xhr.send(this.formData);

  }

  uploadImage(e) {
    console.log('uploadEvent:', e);
  }

  myUploader(e) {
    console.log('自定义上传', e);
    const file = e.files[0];
    this.bookItem['bookImageFileName'] = file.name;

    if (this.formData.has('bookImageFile')) {
      this.formData.delete('bookImageFile');
    }
    this.formData.append('bookImageFile', file, file.name);
    // console.log("this.formData", this.formData.get('manifestFile'));
  }


}
