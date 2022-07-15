// 展示的数据(请求)
export interface ListInt {
  userId: number
  id: number
  title: string // 标题
  introduce: string // 详情
}
// 展示的数据
export interface selectDataInt {
  title: string // 标题
  introduce: string // 详情
  // 分页
  page: number // 页码
  count: number // 总条数
  pagesize: number // 每页显示多少条
}
export class IntData {
  // 请求回来的数据
  list: ListInt[] = []
  // 展示的数据
  selectData: selectDataInt = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pagesize: 5,
  }
}
