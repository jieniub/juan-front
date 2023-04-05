<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="卷心菜">
            <img src="~/assets/img/logo.png" width="100%" alt="卷心菜" />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/notice" tag="li" active-class="current">
              <a>通知</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <!-- / nav -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li v-if="loginInfo.id" id="is-login-one" class="mr10">
              <!-- <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a> -->
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
              <el-dropdown>
              <a href="#" title>
                <img
                  :src="loginInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                /><i class="el-icon-arrow-down el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                    <i class="el-icon-reading"></i><a @click="myCourse()">我的课程</a>
                  </el-dropdown-item>
                  <el-dropdown-item @click="logout()">
                    <i class="el-icon-switch-button"></i><a @click="logout()">退出</a>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="el-icon-setting"></i><a>设置</a>
                  </el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
                
              <!-- <a
                href="javascript:void(0);"
                title="退出"
                @click="logout()"
                class="ml5"
                >退 出</a
              > -->
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>

          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  name="queryCourse.courseName"
                  value
                />
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
    <nuxt />
    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class="fl col-6">
          <div class>
            <h4 class="hLh30">
              <span class="fsize18 f-fM c-999">友情链接</span>
            </h4>
            <ul class="of flink-list">
              <li>
                <a
                  href="http://www.hrbnu.edu.cn/"
                  title="哈尔滨师范大学"
                  target="_blank"
                  >哈尔滨师范大学</a
                >
              </li>
              <li>
                <a
                  href="http://jwc.hrbnu.edu.cn/"
                  title="哈尔滨师范大学教务处"
                  target="_blank"
                  >哈尔滨师范大学教务处</a
                >
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="b-foot">
            <section class="fl col-7">
              <section class="mr20">
                <section class="b-f-link">
                  <a href="#" title="关于我们" target="_blank">关于我们</a>|
                  <a href="#" title="联系我们" target="_blank">联系我们</a>|
                  <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                  <a href="#" title="资源下载" target="_blank">资源下载</a>|
                  <span
                    >服务热线：8888-88888888(哈尔滨) 137-7551-9605(福州)</span
                  >
                  <span>Email：jiejun9605@163.com</span>
                </section>
                <section class="b-f-link mt10">
                  <span>©备案号</span>
                </section>
              </section>
            </section>
          </div>
        </div>
        <div class="fl col-4">
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img
                  height="200px"
                  width="250"
                  src="~/assets/img/kingteam.png"
                  alt
                />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>

<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import cookie from "js-cookie";
import userApi from "@/api/login";
export default {
  data() {
    return {
      token: "",
      loginInfo: {
        id: "",
        age: "",
        avatar: "",
        mobile: "",
        nickname: "",
        sex: "",
      },
    };
  },
  created() {
    this.showInfo();
  },
  methods: {
    showInfo() {
      //debugger
      var jsonStr = cookie.get("juan_ucenter");
      //alert(jsonStr)
      if (jsonStr) {
        this.loginInfo = JSON.parse(jsonStr);
      }
    },
    myCourse(){
      //todo
      console.log("object");
      this.$router.push("/myCourse");
    },
    logout() {
      console.log(cookie.get("juan_ucenter"));
      //debugger
      cookie.set("juan_ucenter", "", { domain: "localhost" });
      cookie.set("juan_token", "", { domain: "localhost" });
      //跳转页面
      window.location.href = "/";
    },
  },
};
</script>


<style scoped>
#header {
  position: fixed !important;
  z-index: 100;
  width: 100%;
  height: 78px;
  margin-top: 0px;
  padding: 1px;
}
</style>