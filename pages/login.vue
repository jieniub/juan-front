<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>
    <div class="sign-up-container">
      
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="mobile"
          :rules="[
            {
              required: true,
              message: '请输入手机号码或工号',
              trigger: 'blur',
            },
            { validator: checkPhone, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="手机号/工号"
              v-model="user.mobile"
            />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>
        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>
        <el-switch
        style="margin-left: 170px;"
        v-model="user.role"
        active-color="#13ce66"
        active-text="我是老师"
        
      >
      </el-switch>
        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import cookie from "js-cookie";
import loginApi from "@/api/login";
export default {
  layout: "sign",
  data() {
    return {
      user: {
        mobile: "",
        password: "",
        role: false
      },
      loginInfo: {},
    };
  },
  methods: {
    submitLogin() {
      loginApi.submitLogin(this.user).then((response) => {
        if (response.data.success) {
          //把token存在cookie中、也可以放在localStorage中
          cookie.set("juan_token", response.data.data.token, {
            domain: "localhost",
          });
          //登录成功根据token获取用户信息
          loginApi.getLoginInfo().then((response) => {
            this.loginInfo = response.data.data.item;
            //将用户信息记录cookie
            cookie.set("juan_ucenter", JSON.stringify(this.loginInfo), {
              domain: "localhost",
            });
            //跳转页面
            window.location.href = "/";
          });
        }
      });
    },
    checkPhone(rule, value, callback) {
      //debugger
      // if (!/^1[34578]\d{9}$/.test(value)) {
      //   return callback(new Error("手机号码格式不正确"));
      // }
      return callback();
    },
  },
};
</script>
<style>
.el-form-item__error {
  z-index: 9999999;
}
</style>
