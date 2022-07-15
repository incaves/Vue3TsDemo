// 接口
export interface LoginFormInt {
  username: string
  password: string
}
// 类(因为releForm是定义在data对象中,没有办法直接使用接口)
export class LoginData {
  // 规定
  ruleForm: LoginFormInt = {
    username: '',
    password: '',
  }
}
