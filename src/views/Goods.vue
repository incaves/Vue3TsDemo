<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 展示数据 -->
    <el-table :data="dataList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="selectData.count * 2"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getGoodsList } from '@/request/api'
import { IntData, ListInt } from '@/type/goods'
export default defineComponent({
  setup() {
    const data = reactive(new IntData())
    onMounted(() => {
      getGoods()
    })
    const getGoods = async () => {
      // 请求数据
      const res = await getGoodsList()
      // 把请求回来数据赋值给data,data给到TypeScript进行限制,存到list中
      data.list = res.data // 数据给到list数组
      data.selectData.count = res.data.length // 总数量
    }
    // 对接受的数据进行分页切割
    const dataList = reactive({
      comList: computed(() => {
        // page - 1 让他从 0 开始截取
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        )
      }),
    })
    // 显示第几页
    const currentChange = (page: number) => {
      data.selectData.page = page // 接受最新的值
    }
    // 每页显示多少条
    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize // 接受最新的值
    }
    // 查询事件
    const onSubmit = () => {
      let arr: ListInt[] = [] // 定义数组,用来接受查询过后的要展示的数据
      // 判断是否为空
      if (data.selectData.title || data.selectData.introduce) {
        // 搜索的是标题
        if (data.selectData.title) {
          // 将过滤出来的条件赋值给arr数组
          arr = data.list.filter(value => {
            // 查找输入的关键字 不等于-1表示找到了 返回的是true
            return value.title.indexOf(data.selectData.title) !== -1
          })
        }
        // 搜索的是详情
        if (data.selectData.introduce) {
          // 将过滤出来的条件赋值给arr数组
          arr = data.list.filter(value => {
            // 查找输入的关键字
            return value.introduce.indexOf(data.selectData.introduce) !== -1
          })
        }
      } else {
        arr = data.list // 输入为空,等于原来的数组
      }
      data.selectData.count = arr.length
      data.list = arr // 过滤后的数组,给到list
    }
    // 监听多个值,使用数组形式
    // 监听输入框的值
    watch([() => data.selectData.title, () => data.selectData.introduce], () => {
      // 没有输入时,恢复默认数据
      if (data.selectData.title == '' || data.selectData.introduce == '') {
        // 重新获取数据 还原成最原始的样子
        getGoods()
      }
    })
    // 结构出来
    return {
      ...toRefs(data),
      currentChange,
      sizeChange,
      onSubmit,
      dataList,
    }
  },
})
</script>

<style scoped></style>
