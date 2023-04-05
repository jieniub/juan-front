<template>
  <div>
    <div style="width: 100%; height: 80px"></div>
    <div>
      <img
        class="img"
        src="https://edu9605.oss-cn-beijing.aliyuncs.com/banner_a.jpg"
      />
    </div>
    <section class="article-main">
      <div class="mainpage">
        <div style="width: 240px">
          <div class="menu">
            <img src="https://edu9605.oss-cn-beijing.aliyuncs.com/cd.png" />
            <span class="menuText">新闻动态</span>
          </div>
          <el-row class="tac">
            <el-col>
              <el-menu
                active-text-color="#09b168"
                class="el-menu-vertical-demo"
                @select="handle"
              >
                <el-menu-item index="9">
                  <!-- <i class="el-icon-location"></i> -->
                  <span slot="title">全部</span>
                </el-menu-item>
                <el-menu-item index="1">
                  <!-- <i class="el-icon-location"></i> -->
                  <span slot="title">教务科</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <!-- <i class="el-icon-menu"></i> -->
                  <span slot="title">学籍管理科</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <!-- <i class="el-icon-document"></i> -->
                  <span slot="title">教学秩序科</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span slot="title">教材科</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span slot="title">考务科</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span slot="title">信息科</span>
                </el-menu-item>
                <el-menu-item index="7">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span slot="title">教学培养科</span>
                </el-menu-item>
                <el-menu-item index="8">
                  <!-- <i class="el-icon-setting"></i> -->
                  <span slot="title">实践教学管理科</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
        <div v-if="!showNotice" class="infolist">
          <span class="listTitle">新闻动态</span>
          <hr class="title-hr" />
          <ul v-for="item in list" :key="item.id" class="titleInfo">
            <li class="main-part">
              <span @click="showInfo(item.id)">{{ item.title }}</span>
              <span>{{ item.date }}</span>
            </li>
          </ul>
          <el-pagination
            @next-click="cur + 1"
            @prev-click="cur - 1"
            @current-change="getPage(page, index)"
            :current-page.sync="page"
            :page-size="10"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
        <div v-if="showNotice" class="article-main1">
          <span class="info-title">{{ noticeInfo.title }}</span>
          <br />
          <span class="info-contant">{{ noticeInfo.contant }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import notice from "@/api/notice";
export default {
  data() {
    return {
      list: [],
      cur: 1,
      page: 1,
      limit: 8,
      total: 0,
      index: 9,
      showNotice: false,
      noticeInfo: {},
    };
  },
  methods: {
    handle(index, indexPath) {
      this.page = 1;
      this.index = index;
      notice.getPage(this.page, this.limit, index).then((response) => {
        this.showNotice = false;
        this.total = response.data.data.total;
        this.list = response.data.data.items;
      });
    },
    showInfo(id) {
      console.log(id);
      this.showNotice = true;
      notice.getInfo(id).then((response) => {
        this.noticeInfo = response.data.data.info;
        console.log(this.noticeInfo);
      });
    },
    getPage(cur, index) {
      notice.getPage(cur, this.limit, index).then((response) => {
        this.showNotice = false;
        this.total = response.data.data.total;
        this.list = response.data.data.items;
      });
    },
  },

  mounted() {
    notice.getPage(this.page, this.limit, 9).then((response) => {
      this.list = response.data.data.items;
      this.total = response.data.data.total;
      console.log(this.list);
    });
  },
};
</script>
<style>
.img {
  width: 100%;
  height: 380px;
}
.menu {
  width: 240px;
  height: 50px;
  background: #1e8156;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menuText {
  color: aliceblue;
  font-size: 22px;
}
.listTitle {
  font-size: 22px;
}
.article-main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mainpage {
  width: 80%;
  margin-top: 25px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
.infolist {
  flex: 1;
  margin-left: 30px;
}
.title-hr {
  margin: 10px 0 0 0;
  background-color: #ddd;
}
.titleInfo {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #dfdfdf;
}
.main-part {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.main-part span:first-child {
  cursor: pointer;
  white-space: nowrap;
}
.main-part span:first-child:hover {
  color: #1e8156;
  font-weight: 700;
}
.info-title {
  font-size: 26px;
}
.info-contant {
  font-size: 14px;
  padding: 20px;

  box-sizing: border-box;
  width: 100%;
}
.article-main1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>