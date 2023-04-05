<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="updateInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视"
        ></el-input>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/oss/file/upload'"
          class="avatar-uploader"
        >
          <img style="width: 400px; height: 260px" :src="updateInfo.cover" />
        </el-upload>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="updateInfo.lessonNum"
          controls-position="right"
          placeholder="123"
        />
      </el-form-item>
      <el-form-item label="课程类别">
        <el-select
          v-model="updateInfo.subjectParentId"
          @change="subjectLevelOneChanged"
          placeholder="请选择"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="updateInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <el-input
          v-model="updateInfo.courseDescription"
          placeholder="description"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import subject from "@/api/subject";
import cookie from "js-cookie";
import course from "@/api/course";
const defaultForm = {
  title: "",
  subjectId: "",
  subjectParentId: "",
  teacherId: "",
  lessonNum: 0,
  courseDescription: "",
  cover: "https://edu9605.oss-cn-beijing.aliyuncs.com/default.png",
};
export default {
  name: "addCourse",

  data() {
    return {
      subjectNestedList: [],
      subSubjectList: [],
      BASE_API: "http://localhost:8222",
      updateInfo: defaultForm,
    };
  },
  methods: {
    subjectLevelOneChanged(value) {
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.updateInfo.subjectId = "";
        }
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.updateInfo.cover = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    save() {
      course.saveCourse(this.updateInfo).then((response) => {
        console.log("测试老师");
        if (response.data.code === 20000) {
          console.log(response);
          this.updateInfo = {...defaultForm};
          console.log(this.updateInfo);
          this.$router.push("/chapter/" + response.data.data.id);
        }
      });
    },

    init() {
      this.initSubjectList();
      const { id: tid } = JSON.parse(cookie.get("juan_ucenter"));
      console.log(tid);
      defaultForm.teacherId = tid;
      this.updateInfo = { ...defaultForm };
      console.log(defaultForm);
      // if (this.$route.params && this.$route.params.id) {
      //   // console.log("test:" + this.$route.params.id);
      //   // const id = this.$route.params.id;
      //   //子目录回显TODO
      //   this.fetchCourseInfoById(id);
      //   this.subjectLevelOneChanged(this.courseInfo.subjectId);
      // } else {
      //   this.courseInfo = { ...defaultForm };
      //   console.log(defaultForm);
      // }
    },
    initSubjectList() {
      subject.getNestedTreeList().then((response) => {
        this.subjectNestedList = response.data.data.items;
        console.log(this.subjectNestedList);
      });
    },
  },
  created() {
    this.init();
  },
};
</script>
