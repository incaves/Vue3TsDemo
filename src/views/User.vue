<template>
  <div>用户列表</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getUserList, getRoleList } from '@/request/api'
export default defineComponent({
  setup() {
    onMounted(() => {
      getUser()
      getRole()
    })
    // 获取用户列表
    const getUser = async () => {
      const res = await getUserList()
      console.log(res)
    }
    // 获取角色列表
    const getRole = async () => {
      const res = await getRoleList()
      console.log(res)
    }
    return {}
  },
})
</script>

<style scoped></style>
