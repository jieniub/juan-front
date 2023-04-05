<template>
  <div>
    <div style="width: 100%; height: 80px"></div>
    <div class="mains">
      <el-button type="text" @click="dialogChapterFormVisible = true"
        >添加章节</el-button
      >

      <!-- 添加和修改章节表单 -->
      <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
          <el-form-item label="章节标题">
            <el-input v-model="chapter.title" />
          </el-form-item>
          <el-form-item label="章节排序">
            <el-input-number
              v-model="chapter.sort"
              :min="0"
              controlsposition="right"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
        <el-form :model="video" label-width="120px">
          <el-form-item label="课时标题">
            <el-input v-model="video.title" />
          </el-form-item>
          <el-form-item label="课时排序">
            <el-input-number
              v-model="video.sort"
              :min="0"
              controls-position="right"
            />
          </el-form-item>

          <el-form-item label="上传视频">
            <el-upload
              :on-success="handleVodUploadSuccess"
              :action="BASE_API + '/vod/video/upload'"
              :on-remove="handleVodRemove"
              :before-remove="beforeVodRemove"
              :on-exceed="handleUploadExceed"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :limit="1"
              class="upload-demo"
            >
              <el-button size="small" type="primary">上传视频</el-button>
              <el-tooltip placement="right-end">
                <div slot="content">
                  最大支持1G，<br />
                  支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                  GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                  MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                  SWF、TS、VOB、WMV、WEBM 等视频格式上传
                </div>
                <i class="el-icon-question" />
              </el-tooltip>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
          <el-button
            :disabled="saveVideoBtnDisabled"
            type="primary"
            @click="saveOrUpdateVideo"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <!-- 章节 -->
      <ul class="chanpterList">
        <li
          style="width: 97%"
          v-for="chapter in chapterNestedList"
          :key="chapter.id"
        >
          <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button
                type="text"
                @click="
                  dialogVideoFormVisible = true;
                  chapterId = chapter.id;
                  video = {};
                  fileList = [];
                "
                >添加课时</el-button
              >
              <el-button style="" type="text" @click="editChapter(chapter.id)"
                >编辑</el-button
              >
              <el-button type="text" @click="removeChapter(chapter.id)"
                >删除</el-button
              >
            </span>
          </p>
          <!-- 视频 -->
          <ul class="chanpterList videoList">
            <li v-for="video in chapter.children" :key="video.id">
              <p>
                {{ video.title }}
                <span class="acts">
                  <el-button type="text" @click="editVideo(video.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="removeVideo(video.id)"
                    >删除</el-button
                  >
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <div style="margin-left: 1000px">
        <!-- <el-button @click="previous">上一步</el-button> -->
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >提交</el-button
        >
      </div>
      <el-dialog width="40%" :visible.sync="publishVisable" title="发布">
        <div style="display: flex; width: 600px" class="ccInfo">
          <img style="width: 300px; height: 195px" :src="coursePublish.cover" />
          <div  style="margin-left: 10px">
            <h2>{{ coursePublish.title }}</h2>
            <p class="gray">
              <span>共{{ coursePublish.lessonNum }}课时</span>
            </p>
            <p>
              <span
                >所属分类：{{ coursePublish.subjectLevelOne }} —
                {{ coursePublish.subjectLevelTwo }}</span
              >
            </p>
            <p>课程讲师：{{ coursePublish.teacherName }}</p>
          </div>
        </div>
        <div style="margin-top: 10px; margin-left: 370px">
          <el-button @click="save">保存</el-button>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="publish"
            >发布课程</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import chapter from "@/api/chapter";
import video from "@/api/video";
import vod from "@/api/vod";
import course from "@/api/course";
export default {
  data() {
    return {
      fileList: [],
      BASE_API: process.env.VUE_APP_BASE_API,
      courseId: "",
      chapterNestedList: [],
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogChapterFormVisible: false, //是否显示章节表单
      chapter: {
        title: "",
        sort: 0,
      },
      coursePublish: {},
      aveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      publishVisable: false,
      saveVideoBtnDisabled: false,
      chapterId: "", // 课时所在的章节id
      video: {
        // 课时对象
        title: "",
        sort: 0,
        isFree: 0,
        videoSourceId: "",
        videoOriginalName: "",
      },
    };
  },
  created() {
    // console.log("chapter created");
    this.init();
  },
  methods: {
    save() {
        this.$router.push("/myCourse");
    },
    publish() {
      course.publishCourse(this.courseId).then((response) => {
          console.log(response);
        if (response.data.code === 20000) {
          this.$message({
            type: "success",
            message: "发布成功!",
          });
          this.$router.push("/myCourse");
        } else {
          this.$message({
            type: "error",
            message: "发布失败!",
          });
        }
      });
    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleVodRemove(file, fileList) {
      console.log(file);
      vod.removeById(this.video.videoSourceId).then((response) => {
        this.$message({
          type: "success",
          message: response.message,
        });
      });
    },

    removeVideo(videoId) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return video.removeById(videoId);
        })
        .then(() => {
          this.fetchChapterNestedListByCourseId(); // 刷新列表
          this.fileList = [];
          this.video.videoSourceId = "";
          this.video.videoOriginalName = "";
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          }
        });
    },
    //成功回调
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId;
      this.video.videoOriginalName = file.name;
      this.saveVideoBtnDisabled = false;
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },

    editVideo(videoId) {
      this.dialogVideoFormVisible = true;
      video.getVideoInfoById(videoId).then((response) => {
        this.video = response.data.item;
        if (this.video.videoOriginalName != null) {
          this.fileList = [{ name: this.video.videoOriginalName }];
        }
      });
    },
    updateDataVideo() {
      video.updateVideoInfoById(this.video).then((response) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.helpSaveVideo();
      });
    },
    beforeUpload() {
      this.saveVideoBtnDisabled = true;
    },

    saveOrUpdateVideo() {
      this.saveVideoBtnDisabled = true;
      if (!this.video.id) {
        console.log(this.video);
        this.saveDataVideo();
      } else {
        this.updateDataVideo();
      }
      this.video = {};
    },
    saveDataVideo() {
      this.video.courseId = this.courseId;
      this.video.chapterId = this.chapterId;
      video.saveVideoInfo(this.video).then((response) => {
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        this.helpSaveVideo();
      });
    },
    helpSaveVideo() {
      this.dialogVideoFormVisible = false; // 如果保存成功则关闭对话框
      this.fetchChapterNestedListByCourseId(); // 刷新列表
      this.video.title = ""; // 重置章节标题
      this.video.sort = 0; // 重置章节标题
      this.video.videoSourceId = ""; // 重置视频资源id
      this.saveVideoBtnDisabled = false;
    },

    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        // 根据id获取课程基本信息
        this.fetchChapterNestedListByCourseId();
      }
    },
    removeChapter(chapterId) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return chapter.removeById(chapterId);
        })
        .then(() => {
          this.fetchChapterNestedListByCourseId(); // 刷新列表
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: response.message,
            });
          }
        });
    },

    fetchChapterNestedListByCourseId() {
      chapter.getNestedTreeList(this.courseId).then((response) => {
        this.chapterNestedList = response.data.data.items;
      });
    },
    // previous() {
    //   console.log("previous");
    //   this.$router.push({ path: "/edu/course/info/" + this.courseId });
    // },
    next() {
      console.log("next");
      const courseId = this.$route.params.id;
      course.getCoursePublishInfoById(courseId).then((response) => {
        console.log(response);
        this.coursePublish = response.data.data.item;
        console.log(this.coursePublish);
      });
      this.coursePublish;
      this.publishVisable = true;
    },

    saveOrUpdate() {
      this.saveBtnDisabled = true;
      if (!this.chapter.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    saveData() {
      this.chapter.courseId = this.courseId;
      chapter
        .save(this.chapter)
        .then((response) => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          this.helpSave();
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },
    updateData() {
      chapter
        .updateById(this.chapter)
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.helpSave();
        })
        .catch((response) => {
          // console.log(response)
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },
    helpSave() {
      this.dialogChapterFormVisible = false; // 如果保存成功则关闭对话框
      this.fetchChapterNestedListByCourseId(); // 刷新列表
      this.chapter.title = ""; // 重置章节标题
      this.chapter.sort = 0; // 重置章节标题
      this.saveBtnDisabled = false;
    },

    editChapter(chapterId) {
      this.dialogChapterFormVisible = true;
      chapter.getById(chapterId).then((response) => {
        this.chapter = response.data.item;
      });
    },
  },
};
</script>
<style scoped>
.mains {
  width: 1120px;
  margin-left: 180px;
  margin-top: 20px;
  margin-bottom: 30px;
  background: rgb(248, 248, 248);
}
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>
