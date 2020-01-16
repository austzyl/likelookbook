/**
 * Created by yaleizhu on 2019/11/13.
 */
export class User {
  id?: string;
  userName?: string;
  password?: string | Int32Array;
  userMobile: string;
  userGender: number;
  userEmail: string;
  pwdQuestionOne: string;
  pwdQuestionTwo: string;
  pwdQuestionOneAnswer: string;
  pwdQuestionTwoAnswer: string;

  constructor(
    id: string,
    userName: string,
    password: string,
    userMobile: string,
    userGender: number,
    userEmail: string,
    pwdQuestionOne: string,
    pwdQuestionTwo: string,
    pwdQuestionOneAnswer: string,
    pwdQuestionTwoAnswer: string

  ) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.userMobile = userMobile;
    this.userGender = userGender;
    this.userEmail = userEmail;
    this.pwdQuestionOne = pwdQuestionOne;
    this.pwdQuestionTwo = pwdQuestionTwo;
    this.pwdQuestionOneAnswer = pwdQuestionOneAnswer;
    this.pwdQuestionTwoAnswer = pwdQuestionTwoAnswer;
  }

  static newInstance(): any {
    return new User('', '', '',  '', 0, '', '你的小学名字叫什么？', '你最爱看的书是哪种类型？', '', '');
  }
}

