<template>
  <div>
    <div style="width: 100%; height: 80px"></div>
    <div class="backgroud">
      <div class="card">
        <img
          style="width: 100px; height: 100px; border-radius: 50px"
          :src="memberInfo.avatar"
        />
        <div class="info">
          <span style="font-size: x-large; color: azure">{{
            memberInfo.nickname
          }}</span>
          <span style="font-size: large; color: azure; margin-top: 5px">{{
            memberInfo.className
          }}</span>
          <span style="color: azure"
            >{{ memberInfo.role == 0 ? "学生" : "老师" }} {{ memberInfo.sex }}
            {{ memberInfo.age }}</span
          >
        </div>
      </div>
    </div>
    <div v-if="memberInfo.role == 0" class="main">
      <div class="switch" style="width: 100%">
        <el-button
          type="text"
          class="btn"
          @click="getAll"
          :class="{ active: active == 1, native: !active == 1 }"
          >全部</el-button
        >
        <el-button
          type="text"
          class="btn"
          @click="getself"
          :class="{ active: active == 2, native: !active == 2 }"
          >自选</el-button
        >
        <el-button
          type="text"
          class="btn"
          @click="getClass"
          :class="{ active: active == 3, native: !active != 3 }"
          >班级课程</el-button
        >
        <div style="display: flex; margin-bottom: 10px" class="courses">
          <!-- 课程列表 -->
          <li v-for="item in courses" :key="item.id" class="items">
            <div class="cc-l-wrap" style="margin-left: 20px">
              <section class="course-img">
                <a :href="'/course/' + item.id">
                  <img
                    :src="item.cover"
                    style="height: 140px; width: 250px"
                    class="img-responsive"
                  />
                </a>
                <!-- <div class="cc-mask">
                  <a
                    :href="'/course/' + item.id"
                    title="开始学习"
                    class="comm-btn c-btn-1"
                    >开始学习</a
                  >
                </div> -->
              </section>
              <span
                style="font-size: small; text-align: center; display: block"
              >
                <a
                  style="font-size: larger"
                  :href="'/course/' + item.id"
                  :title="item.title"
                  class="course-title fsize18 c-333"
                  >{{ item.title }}</a
                >
              </span>
            </div>
          </li>
          <!-- 结束 -->
        </div>
        <div class="footer-area">
          <el-pagination
            class="pagination"
            small
            layout="prev, pager, next"
            :total="total"
            :page-size="limit"
            @next-click="nextpage()"
            @prev-click="prevpage()"
            @current-change="curPage()"
            :current-page.sync="cur"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <div v-if="memberInfo.role == 1" class="teacher">
      <el-dialog :visible.sync="updateVisible" title="修改课程">
        <span style="font-size: large">标题</span
        ><el-input v-model="this.updateInfo.title"></el-input>
        <span style="font-size: large">描述</span
        ><el-input
          type="textarea"
          autosize
          v-model="this.updateInfo.courseDescription"
        ></el-input>

        <div slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateCourse">确 定</el-button>
        </div>
      </el-dialog>

      <div v-if="!addVisible" class="courses-title">
        <span style="font-size: large">我的课程</span>
        <el-button @click="showAdd" size="small" type="success" plain
          >新开课程</el-button
        >
      </div>
      <div v-if="!addVisible" style="width: 100%">
        <!-- 表格开始 -->
        <el-table :data="courses" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="课程id" class="el-item">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="课程名称" class="el-item">
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item label="课程封面" class="el-item">
                  <template slot-scope="scope">
                    <img
                      slot="reference"
                      :src="props.row.cover"
                      style="width: 233px; height: 150px"
                    />
                  </template>
                </el-form-item>
                <el-form-item label="课程简介" class="el-item">
                  <span>{{ props.row.courseDescription }}</span>
                </el-form-item>
                <el-form-item label="课程状态" class="el-item">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
                <el-form-item label="上次更新时间" class="el-item">
                  <span>{{ props.row.gmtModified }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="课程封面" prop="cover">
            <template slot-scope="scope">
              <img
                slot="reference"
                :src="scope.row.cover"
                style="width: 143px; height: 90px"
              />
            </template>
          </el-table-column>
          <el-table-column label="课程名称" prop="title"> </el-table-column>
          <el-table-column label="课程状态" prop="status"></el-table-column>
          <el-table-column label="在学人数" prop="startNum"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="showUpdate(scope.row)" type="text" size="small"
                >更新</el-button
              >
              <el-button
                @click="offCourse(scope.row.id)"
                type="text"
                size="small"
                >下架</el-button
              >
              <el-button
                @click="deleteCourse(scope.row.id)"
                type="text"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 表格结束 -->
        <div v-if="this.applyCourses != null">
          <!-- <div> -->
          <span style="font-size: large">申请中</span>
          <el-table :data="applyCourses" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-steps
                  style="margin-left: 323px"
                  :space="200"
                  :active="1"
                  finish-status="success"
                >
                  <el-step title="申请"></el-step>
                  <el-step
                    :status="scope.row.courseStatus"
                    :title="scope.row.status"
                  ></el-step>
                  <el-step title="发布"></el-step>
                </el-steps>
              </template>
            </el-table-column>
            <el-table-column label="课程id" prop="id"></el-table-column>
            <el-table-column label="课程名称" prop="title"> </el-table-column>
            <el-table-column label="课程状态" prop="status">
              <template slot-scope="scope">
                <span
                  :class="{
                    item: scope.row.status == '审核中',
                    nitem: scope.row.status == '已驳回',
                  }"
                >
                  {{ scope.row.status }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="deleteCourse(scope.row.id)"
                  type="text"
                  size="small"
                  >撤销</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <AddCourse v-if="addVisible"></AddCourse>
    </div>
  </div>
</template>

<script>
import cookie from "js-cookie";

import course from "@/api/course";
import AddCourse from "../components/addCourse.vue";
export default {
  created() {},
  components: {
    AddCourse,
  },
  data() {
    AddCourse;
    return {
      active: 1,
      memberInfo: {
        id: "",
        mobile: "",
        nickname: "",
        sex: "",
        age: 0,
        avatar: "",
        className: "",
        role: 0,
      },
      // checkStatus: 1,
      applyCourses: null,
      courses: [],
      page: 1,
      limit: 8,
      total: 5,
      cur: 0,
      updateVisible: false,
      addVisible: false,
      updateInfo: {
        //   cover: 'https://edu9605.oss-cn-beijing.aliyuncs.com/default.png',
        //   courseDescription: ''
      },
    };
  },
  methods: {
    // save(){
    //   this.addVisible = false;
    // },
    showAdd() {
      this.addVisible = true;
    },
    getStudent() {
      if (this.active === 1) {
        this.getAll();
      } else if (this.active === 3) {
        this.getClass();
      } else if (this.active === 2) {
        this.getself();
      }
    },
    getAll() {
      this.active = 1;
      course
        .getCourseByStudent(this.page, this.limit, this.memberInfo.id, 1)
        .then((response) => {
          this.courses = response.data.data.items;

          this.total = response.data.data.total;
        });
    },
    getClass() {
      this.active = 3;
      course
        .getCourseByStudent(this.page, this.limit, this.memberInfo.id, 3)
        .then((response) => {
          this.courses = response.data.data.items;
          this.total = response.data.data.total;
        });
    },
    getself() {
      this.active = 2;
      course
        .getCourseByStudent(this.page, this.limit, this.memberInfo.id, 2)
        .then((response) => {
          this.courses = response.data.data.items;
          this.total = response.data.data.total;
        });
    },

    prevpage() {
      this.page = this.page - 1;
      this.getStudent();
    },
    nextpage() {
      this.page = this.page + 1;
      this.getStudent();
    },
    curPage() {
      this.page = this.cur;
      this.getStudent();
    },
    showUpdate(info) {
      this.updateInfo = info;
      this.updateVisible = true;
      console.log(info);
    },

    updateCourse() {
      updateVisible = false;
      course.updateCourse(info);
    },
    offCourse(id) {
      course.offCourse(id).then((response) => {
        if (response.data.code === 20000) {
          this.$message({
            type: "success",
            message: "下架成功",
          });
          course.getTeacherCourse(this.memberInfo.id).then((response) => {
            this.courses = response.data.data.items;
            this.applyCourses = response.data.data.apply;
          });
        }
      });
    },
    deleteCourse(id) {
      console.log(id);
      course.delCourse(id).then((response) => {
        if (response.data.code === 20000) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          course.getTeacherCourse(this.memberInfo.id).then((response) => {
            this.courses = response.data.data.items;
            this.applyCourses = response.data.data.apply;
            
          });
        }
      });
    },
  },

  mounted() {
    this.memberInfo = cookie.get("juan_ucenter");
    console.log(cookie.get("juan_ucenter"));
    this.memberInfo = JSON.parse(cookie.get("juan_ucenter"));
    console.log(this.memberInfo);
    if (this.memberInfo.sex == 1) {
      this.memberInfo.sex = "女";
    } else {
      this.memberInfo.sex = "男";
    }
    // 取出课程
    if (this.memberInfo.role === 0) {
      course
        .getCourseByStudent(this.page, this.limit, this.memberInfo.id, 1)
        .then((result) => {
          this.courses = result.data.data.items;
          // console.log(this.courses);
          this.total = result.data.data.total;
        });
    } else {
      course.getTeacherCourse(this.memberInfo.id).then((response) => {
        this.courses = response.data.data.items;
        this.applyCourses = response.data.data.apply;
        for (var applyCourse of this.applyCourses) {
              if (applyCourse.status === "已驳回") {
                applyCourse.courseStatus = 'error';
              } else {
                applyCourse.courseStatus = 'process';
              }
            }
            console.log(this.applyCourses);
      });
    }
  },
};
</script>

<style>
.backgroud {
  background-image: url("../assets/img/myCourseBackGround.png");
  padding-top: 40px;
  display: flex;
  flex-direction: column;
}
.card {
  margin-left: 200px;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}
.info {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 10px;
}
.teacher {
  /* height: 600px; */
  width: 1150px;
  /* background: rgb(248, 248, 248); */
  margin-left: 200px;
  margin-top: 30px;
  padding-top: 5px;
  /* display: flex;
  flex-direction: row;
  position: relative; */
}
.main {
  /* height: 600px; */
  width: 1150px;
  background: rgb(248, 248, 248);
  margin-left: 200px;
  margin-top: 30px;
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  position: relative;
}

.switch {
  /* margin-top: 10px; */
  margin-left: 15px;
  font-size: large !important;
  color: slategrey !important;
}
.active {
  border-bottom: #00cc7e !important;
  color: #00cc7e !important;
  font-size: x-large !important;
}
.btn {
  font-size: large;
}
.footer-area {
  display: flex;
  justify-content: center;
}
.pagination {
  margin-bottom: 20px;
}
.courses {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.items {
  width: 25%;
  margin-bottom: 20px;
}

.el-item {
  display: inline !important;
}

.courses-title {
  display: flex;
  justify-content: space-between;
}
.item {
  color: sandybrown !important;
  margin-left: 10px;
}
.nitem {
  color: red !important;
  margin-left: 10px;
}
</style>