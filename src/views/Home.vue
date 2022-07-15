<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="~@/assets/logo.png" alt="" class="logo" />
          </el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span class="logut" @click="logot">退出登陆</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            router
          >
            <!-- 动态渲染侧边栏 -->
            <!-- router -  启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
            <!-- 开启路由模式 通过el-menu-item index进行路由跳转 -->
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    // console.log(router.getRoutes()) 可以拿到所有的路由
    // 筛选出来侧边栏需要展示的路由 通过meta - isShow为true的
    const list = router.getRoutes().filter(i => i.meta.isShow)
    const logot = () => {
      router.push('/login')
      localStorage.removeItem('token')
    }
    return {
      list,
      logot,
    }
  },
})
</script>

<style scoped lang="scss">
.el-header {
  height: 80px;
  background-color: #545c64;
  .logo {
    height: 80px;
  }
  h2,
  .logut {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
  }
}
.el-aside {
  .el-menu {
    //计算
    height: calc(100vh - 80px);
  }
}
</style>
