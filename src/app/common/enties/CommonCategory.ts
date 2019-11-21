/**
 * Created by yaleizhu on 2019/11/5.
 */
export class CommonCategory {

  categoryTitle?: string;
  categoryId?: string;
  mainBookImg?: string;
  mainBookName?: string;
  otherBooks?: any[];
  ranking?: any[];

  constructor(
    categoryTitle: string,
    categoryId: string,
    mainBookImg: string,
    mainBookName: string,
    otherBooks: any[],
    ranking: any[]
  ) {
    this.categoryTitle = categoryTitle;
    this.categoryId = categoryId;
    this.mainBookName = mainBookName;
    this.mainBookImg = mainBookImg;
    this.otherBooks = otherBooks;
    this.ranking = ranking;
  }

  static instance(): CommonCategory {

    return new CommonCategory(
      '',
      '',
      '',
      '',
      [],
      []
    );
  }
}
