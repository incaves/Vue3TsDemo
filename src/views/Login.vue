<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="loginBtn">登陆</el-button>
        <el-button @click="resetForm(ruleFormRef)" class="loginBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
// Vue内置方法
import { defineComponent, reactive, toRefs, ref } from 'vue'
// 接口-ts规范类型
import { LoginData } from '@/type/login'
// 泛性
import type { FormInstance } from 'element-plus'
// 请求登陆
import { login } from '@/request/api'
// 路由
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    // 路由
    const router = useRouter()
    // 表单对象
    const data = reactive(new LoginData())
    // 验证规则
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 11, message: '账号的长度在3-11之间', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 16, message: '密码的长度在3-16之间', trigger: 'blur' },
      ],
    }
    // 重置按钮事件
    const resetForm = () => {
      data.ruleForm.username = ''
      data.ruleForm.password = ''
    }
    // 登陆(泛性)
    const ruleFormRef = ref<FormInstance>()
    // 登陆事件
    const submitForm = (formEl: FormInstance | undefined) => {
      // 没有传递,直接返回
      if (!formEl) return
      // validate 可以对整个表单进行验证 返回布尔值
      formEl.validate(async valid => {
        if (valid) {
          const res = await login(data.ruleForm)
          localStorage.setItem('token', res.data.token) // 本地存储token
          router.push('/') // 路由跳转
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    // 结构出来,直接使用data中的属性
    return { ...toRefs(data), rules, resetForm, ruleFormRef, submitForm }
  },
})
</script>

<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  background: url(~@/assets/bg.jpeg) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  text-align: center;
  color: #fff;
  h2 {
    margin-bottom: 5px;
  }
  .demo-ruleForm {
    width: 500px;
    margin: 300px auto;
    background-color: #322f3b;
    padding: 30px;
    border-radius: 20px;
  }
  .loginBtn {
    width: 48%;
  }
}
</style>
