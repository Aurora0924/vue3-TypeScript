<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>

          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button :loading="loading" type="primary" size="default" class="login_btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { getCurrentTime } from '@/utils/time'
// 使用仓库
let useStore = useUserStore()
// 使用路由
let router = useRouter()
let route = useRoute()
// 实现加载效果
let loading = ref(false)
// 获取表单数据进行校验
let loginForms = ref()
// 收集表单数据
const rules = reactive({
  username: [
    {
      required: true,
      message: '账号名称长度至少5位',
      min: '5',
      max: '10',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '账户密码长度至少6位',
      min: '6',
      max: '15',
      trigger: 'change'
    }
  ]
})
// 表单实例
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
// 登录方法
const login = async () => {
  // 进行表单校验
  await loginForms.value.validate()
  loading.value = true
  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    router.push({ path: route.query.redirect || '/' })
    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getCurrentTime()}好`
    })
    //登录成功加载效果也消失
    loading.value = false
  } catch (error) {
    //登录失败加载效果消息
    loading.value = false
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg');
  background-size: cover;

  .login_form {
    width: 80%;
    top: 30vh;
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
