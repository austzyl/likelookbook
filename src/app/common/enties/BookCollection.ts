/**
 * Created by yaleizhu on 2019/11/13.
 */
export class User {
  id?: string;
  bookId?: string;
  userId?: string;
  collectTime: string;
  readPage: number;

  constructor(
    id: string,
    bookId: string,
    userId: string,
    collectTime: string,
    readPage: number,


  ) {
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.collectTime = collectTime;
    this.readPage = readPage;
  }

  static newInstance(): any {
    return new User('', '', '',  '', 0);
  }
}

