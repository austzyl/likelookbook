/**
 * Created by yaleizhu on 2019/11/13.
 */
export class BookItem {
  id?: string;
  bookName?: string;
  bookAuthor?: string;
  bookPublish?: string;
  bookTotalCh?: string;
  bookTotalPage?: string;
  cateId?: string;
  cateName?: string;
  bookDir?: string;
  bookRanking?: string;
  bookReadNum?: string;
  bookStatus?: string;
  bookDesc?: string;
  cateCode?: string;
  bookImageFile?: string;
  bookImageFileString?: string;

  constructor(
    id: string,
    bookName: string,
    bookAuthor: string,
    bookPublish: string,
    bookTotalCh: string,
    bookTotalPage: string,
    cateId: string,
    cateName: string,
    bookDir: string,
    bookRanking: string,
    bookReadNum: string,
    bookStatus: string,
    bookDesc: string,
    cateCode: string,
    bookImageFile: string,
  bookImageFileString: string
  ) {
    this.id = id;
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookPublish = bookPublish;
    this.bookTotalCh = bookTotalCh;
    this.bookTotalPage = bookTotalPage;
    this.cateId = cateId;
    this.cateName = cateName;
    this.bookDir = bookDir;
    this.bookRanking = bookRanking;
    this.bookReadNum = bookReadNum;
    this.bookStatus = bookStatus;
    this.bookDesc = bookDesc;
    this.cateCode = cateCode;
    this.bookImageFile = bookImageFile;
    this.bookImageFileString = bookImageFileString;
  }

  static newInstance(): any {
    return new BookItem('',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '');
  }
}

