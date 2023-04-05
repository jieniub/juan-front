<template>
  <div>
    <div id="blank"></div>
    <div id="main-part">
      <!-- 幻灯片 开始 -->
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div
            v-for="banner in bannerList"
            :key="banner.id"
            class="swiper-slide"
            style="background: #040b1b"
          >
            <a target="_blank" :href="banner.linkUrl">
              <img width="100%" :src="banner.imageUrl" :alt="banner.title" />
            </a>
          </div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
        <div
          class="swiper-button-prev swiper-button-white"
          slot="button-prev"
        ></div>
        <div
          class="swiper-button-next swiper-button-white"
          slot="button-next"
        ></div>
      </div>


      <div id="aCoursesList">
        <div>
          <section class="container">
            <header class="comm-title">
              <h2 class="tac">
                <span class="c-333">推荐课程</span>
              </h2>
            </header>
            <div>
              <article class="comm-course-list">
                <ul class="of" id="bna">
                  <li
                    v-for="course in courseList"
                    v-bind:key="course.id"
                    class="items">
                    <div class="cc-l-wrap">
                      <section class="course-img">
                        <a :href="'/course/' + course.id">
                          <img
                            :src="course.cover"
                            class="img-responsive"
                            :alt="course.title"
                          />
                        </a>
                        <div class="cc-mask">
                          <a
                            :href="'/course/' + course.id"
                            title="开始学习"
                            class="comm-btn c-btn-1"
                            >开始学习</a
                          >
                        </div>
                      </section>
                      <section class="function-part">
                        <h3 class="">
                          <a
                            :href="'/course/' + course.id"
                            :title="course.title"
                            class="course-title fsize18 c333"
                            >{{ course.title }}</a
                          >
                        </h3>
                        <section class="of">
                          <span class="fl jgAttr c-ccc f-fA">
                            <i class="c-999 f-fA"
                              >{{ course.startNum }}人学习</i
                            >
                            |
                            <i class="c-999 f-fA"
                              >{{ course.viewCount }}人浏览</i
                            >
                          </span>
                        </section>
                      </section>
                    </div>
                  </li>
                </ul>
                <div class="clear"></div>
              </article>
              <section class="tac pt20">
                <a href="/course" title="全部课程" class="comm-btn c-btn-2"
                  >全部课程</a
                >
              </section>
            </div>
          </section>
        </div>
        <!-- /网校课程 结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import index from "@/api/index";
import banner from "@/api/banner";
export default {
  data() {
    return {
      swiperOption: {
        //配置分页
        pagination: {
          el: ".swiper-pagination", //分页的dom节点
        },
        //配置导航
        navigation: {
          nextEl: ".swiper-button-next", //下一页dom节点
          prevEl: ".swiper-button-prev", //前一页dom节点
        },
      },
      teacherList: {},
      courseList: {},
      bannerList: {},
    };
  },
  created() {
    this.initDataBanner();
    this.initDataObj();
  },
  methods: {
    initDataBanner() {
      banner.getList().then((response) => {
        this.bannerList = response.data.data.items;
      });
    },
    initDataObj() {
      index.getList().then((response) => {
        this.teacherList = response.data.data.teachers;
        console.log(this.teacherList);
        this.courseList = response.data.data.courses;
        console.log(this.courseList);
      });
    },
  },
};
</script>
<style>
#blank {
  height: 80px;
  width: 100%;
}

#bna {
  display: flex !important;
  flex-wrap: wrap;
}

#bna .items {
  width: 25%;
  min-width: 25%;
  box-sizing: border-box;
  padding: 20px;
}

.cc-l-wrap {
  display: flex !important;
  width: 100%;
  height: 100%;
  margin: 0 !important;
  align-self: center !important;
  justify-content: center !important;
  flex-direction: column !important;
}

.course-img {
  display: flex;
  width: 100%;
  height: 100%;
  align-self: center;
  justify-content: center;
}

.cc-l-wrap img {
  min-width: 80%;
  min-height: 80%;
}

.function-part {
  margin-top: 20px;
}

.function-part h3 {
  margin-bottom: 10px;
}
</style>