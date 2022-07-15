// 数组形式
interface RoleInt {
  role: number
  roleName: string
}
// 定义接受的用户列表数据的格式
interface ListInt {
  id: number
  nickName: string
  role: RoleInt[] // 属于数组形式,重新定义接口
  userName: string
}
// 定义接受的角色列表数据的格式
interface RoleInt {
  authority: number
  roleId: number
  roleName: string
}
// 查询 定义查询的条件
interface selectDataInt {
  role: number
  nickName: string
}
export class IntData {
  list: ListInt[] = [] // 接受用户信息的列表
  roleList: RoleInt[] = [] // 接受角色信息的列表
  // 查询
  selectData: selectDataInt = {
    role: 0,
    nickName: '',
  }
}
