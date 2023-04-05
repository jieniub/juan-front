<template>
  <div>
    <div id="blank"></div>
    <div id="aCoursesList" class="bg-fa of">
      <!-- /课程详情 开始 -->
      <section class="container">
        <section class="path-wrap txtOf hLh30">
          <a href="/" title class="c-999 fsize14">首页</a>>
          <a title class="c-999 fsize14">课程列表</a>\
          <span class="c-333 fsize14">{{ this.info.course.title }}</span>
        </section>
        <div>
          <article
            class="c-v-pic-wrap"
            style="height: 260px;!importent;width: 480px;!importent"
          >
            <section class="p-h-video-box" id="videoPlay">
              <img
                :src="this.info.course.cover"
                :alt="this.info.course.title"
                style="height: 260px; width: 450px"
                class="dis c-v-pic"
              />
            </section>
          </article>
          <aside class="c-attr">
            <section style="background-color: aliceblue; padding: 20px 0">
              <h2>
                <span class="fsize25">{{ this.info.course.title }}</span>
              </h2>
              <div class="test">
                <div>
                  <sectionc style="margin-top: 10px"
                    ><span
                      >开课时间: {{ this.info.course.gmtCreate }}</span
                    ></sectionc
                  >
                  <section>
                    <span>课时: {{ this.info.course.lessonNum }}节</span>
                  </section>
                  <section>
                    <span>课时安排：一周{{ len }}次,一次2~3小时</span>
                  </section>
                  <section>
                    <span
                      >已有{{ this.info.course.startNum }}人参与到学习中！</span
                    >
                  </section>
                  <section>
                    <span class="fsize14"
                      >主讲： {{ this.info.course.teacher }}</span
                    >
                  </section>
                </div>

                <section style="margin-bottom: 15px">
                  <el-button
                    :disabled="!addable"
                    @click="addCourse"
                    class="join"
                  >
                    加入课程
                  </el-button>
                </section>
              </div>
            </section>
          </aside>

          <div class="clear"></div>
        </div>
        <!-- /课程封面介绍 -->
        <div class="mt20 c-infor-box">
          <article class="fl col-7">
            <section class="mr30">
              <div class="i-box">
                <div>
                  <section
                    id="c-i-tabTitle"
                    class="c-infor-tabTitle c-tabtitle"
                  >
                    <!-- <h2 name="c-i" class="current" title="课程详情">课程详情</h2> -->
                    <el-button
                      type="text"
                      class="buttonSwitch"
                      @click="showCommment = true"
                      :class="{ active: showCommment, native: !showCommment }"
                      >课程详情</el-button
                    >
                    <el-button
                      type="text"
                      class="buttonSwitch"
                      @click="showCommment = false"
                      :class="{ active: !showCommment, native: showCommment }"
                      >课程评价</el-button
                    >
                  </section>
                </div>
                <article class="ml10 mr10 pt20" v-if="showCommment">
                  <div>
                    <h6 class="c-i-content c-infor-title">
                      <span>课程介绍</span>
                    </h6>
                    <div class="course-txt-body-wrap">
                      <section class="course-txt-body">
                        <p>
                          {{ this.info.course.courseDescription }}
                        </p>
                      </section>
                    </div>
                  </div>

                  <div class="mt50">
                    <h6 class="c-g-content c-infor-title">
                      <span>课程大纲</span>
                    </h6>
                    <section class="mt20">
                      <div class="lh-menu-wrap">
                        <menu id="lh-menu" class="lh-menu mt10 mr10">
                          <ul>
                            <!-- 课程章节目录 -->
                            <li
                              v-for="chapter in this.info.chapter"
                              :key="chapter.id"
                              class="lh-menu-stair"
                            >
                              <a
                                :title="chapter.title"
                                href="javascript: void(0)"
                                class="current-1"
                              >
                                <em class="lh-menu-i-1 icon18 mr10" />{{
                                  chapter.title
                                }}
                              </a>
                              <ol class="lh-menu-ol" style="display: block">
                                <li
                                  v-for="video in chapter.children"
                                  :key="video.id"
                                  class="lh-menu-second ml30"
                                >
                                  <a class="course-item" @click="viewVideo(video.videoSourceId)">
                                    <span class="fr">
                                      <i class="free-icon vam mr10">播放</i>
                                    </span>
                                    <em class="lh-menu-i-2 icon16 mr5"
                                      >&nbsp;</em
                                    >{{ video.title }}
                                  </a>
                                </li>
                              </ol>
                            </li>
                          </ul>
                        </menu>
                      </div>
                    </section>
                  </div>
                  <!-- /课程大纲 -->
                </article>
                <div class="comment" v-if="!showCommment">
                  <div>
                    <textarea
                      placeholder="发表你的看法吧！"
                      style="
                        width: 100%;
                        height: 150px;
                        resize: none;
                        padding: 10px;
                        font-size: large;
                        border-width: 1px;
                        box-sizing: border-box;
                        border-color: darkseagreen;
                        border-radius: 10px;
                      "
                      v-model="comment.content"
                    >
                    </textarea>
                    <el-button @click="submitComment" type="success" round
                      >提交</el-button
                    >
                  </div>
                  <div
                    v-for="comment in comments"
                    :key="comment.commentId"
                    style="min-height: 150px; padding-top: 20px"
                    class="ttt"
                  >
                    <el-avatar
                      style="min-width: 40px"
                      :src="comment.avatar"
                    ></el-avatar>
                    <div class="lusheng">
                      <span style="font-size: initial; margin-left: 10px">{{
                        comment.nickname
                      }}</span>
                      <span
                        style="
                          font-size: initial;
                          margin-top: 20px;
                          margin-left: 10px;
                        "
                        >{{ comment.content }}</span
                      >
                      <span style="margin-left: 10px; margin-top: 50px"
                        >发表于{{ comment.gmtCreate }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </article>
          <aside class="fl col-3">
            <div class="i-box">
              <div>
                <section class="c-infor-tabTitle c-tab-title">
                  <a title href="javascript:void(0)">主讲讲师</a>
                </section>
                <section class="stud-act-list">
                  <ul style="height: auto">
                    <li>
                      <div class="u-face">
                        <a href="#">
                          <img
                            :src="this.info.course.avatar"
                            width="50"
                            height="50"
                          />
                        </a>
                      </div>
                      <section class="hLh30 txtOf">
                        <a class="c-333 fsize16 fl" href="#">{{
                          this.info.course.teacher
                        }}</a>
                      </section>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
      <!-- /课程详情 结束 -->
    </div>
  </div>
</template>
<script>
import course from "@/api/course.js";
import cookie from "js-cookie";
const courseInfo = {
  course: {},
  chapter: [],
};
export default {
  data() {
    return {
      info: courseInfo,
      num: 1,
      addable: true,
      showCommment: true,
      comments: [],
      comment: {
        content: "",
        memberId: "",
        courseId: "",
        avatar: "",
        nickname: "",
      },
    };
  },
  created() {},
  mounted() {
    const id = this.$route.params.id;
    this.comment.courseId = id;
    course.getCourseInfo(id).then((response) => {
      if (response.data.code === 20000) {
        this.info = response.data.data;
        console.log(this.info);
      }
    });
    course.getComments(id).then((response) => {
      this.comments = response.data.data.list;
      console.log(this.comments);
    });
    if (!cookie.get("juan_ucenter")) {
      return;
    }

    const { id: mid } = JSON.parse(cookie.get("juan_ucenter"));
    course.checkCourse(mid, id).then((response) => {
      this.addable = response.data;
      console.log(this.addable);
    });
  },
  methods: {
    addCourse() {
      if (!cookie.get("juan_ucenter")) {
        this.$message({
          type: "error",
          message: "请先进行登录",
        });
        this.$router.push({ path: "/login" });
        return;
      }
      console.log("object");
      const { id } = JSON.parse(cookie.get("juan_ucenter"));
      course.addCourse(id, this.info.course.id).then((response) => {
        if (response.data.code === 20000) {
          this.$message({
            type: "success",
            message: "添加成功！",
          });
          this.$router.push(
            `/player/${this.info.chapter[0].children[0].videoSourceId}`
          );
        }
      });
    },
    submitComment() {
      // const { id, avatar, nikename } = cookie.get("juan_ucenter");

      if (cookie.get("juan_ucenter") === "") {
        this.$message({
          type: "error",
          message: "请先进行登录",
        });
        this.$router.push({ path: "/login" });
        return;
      }
      const { id, avatar, nickname } = JSON.parse(cookie.get("juan_ucenter"));

      this.comment.memberId = id;
      this.comment.avatar = avatar;
      this.comment.nickname = nickname;
      if (this.comment.content == "") {
        console.log(JSON.parse(cookie.get("juan_ucenter")));
        this.$message({
          type: "error",
          message: "内容不能为空",
        });
        return;
      }

      course.submitComment(this.comment).then((response) => {
        if (response.data.code === 20000) {
          this.comment.content = "";
          course.getComments(this.comment.courseId).then((response) => {
            console.log(response.data.data);
            this.comments = response.data.data.list;
          });
          this.$message({
            type: "success",
            message: "评论成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "请稍后再试",
          });
        }
      });
    },
    viewVideo(id) {
      if (!cookie.get("juan_ucenter")) {
        this.$message({
          type: "error",
          message: "请先进行登录",
        });
        this.$router.push({ path: "/login" });
        return;
      } else {
        this.$router.push({ path: `/player/${id}`});
      }
    },
  },
  computed: {
    len: function () {
      return this.info.course.lessonNum > 16 ? 2 : 1;
    },
  },
};
</script>
<style scoped>
#blank {
  height: 80px;
  width: 100%;
}
.c-attr {
  /* background-color: darkgray; */
}
.join {
  display: inline-block;
  margin-top: 30px;
  height: 48px !important;
  width: 140px !important;
  line-height: 0px;
  font-size: 18px;
  background-color: #00cc7e;
  border-color: transparent;
  font-weight: 600;
  color: white;
  border-radius: 24px;
  padding: 12px;
}
.test {
  margin-top: 25px;
  margin-left: 350px;
}

.buttonSwitch {
  font-size: x-large;
  color: darkslategray;
}

.active {
  border-bottom: #00cc7e !important;
  color: #00cc7e;
}
.native {
  color: darkslategray;
}
.ttt {
  display: flex;
}

.lusheng {
  display: flex;
  flex-direction: column;
}
.course-item{
  cursor: pointer;
}
</style>