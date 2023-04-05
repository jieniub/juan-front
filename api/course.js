import request from '@/utils/request'
export default {
    getCourseInfo(id) {
        return request({
            url: `/front/admin/course/info/${id}`,
            method: 'get'
        })
    },

    getPageList(page, limit, searchObj) {
        console.log(searchObj);
        return request({
            url: `admin/course/index/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },
    // 获取课程二级分类
    getNestedTreeList2() {
        return request({
            url: `/admin/course/list2`,
            method: 'get'
        })
    },
    getComments(id){
        return request({
            url: `/front/comment/${id}`,
            method: 'get'
        })
    },
    submitComment(data){
        return request({
            url: `/front/comment/save`,
            method: 'post',
            data: data
        })
    },
    getCourseByStudent(page, limit,id,type){
        return request({
            url: `/admin/course/${page}/${limit}/${id}/${type}`
        })
    },
    addCourse(id,courseId){
        return request({
            url: `/admin/course/${id}/${courseId}`,
            method: 'get'
        });
    },
    checkCourse(id,courseId){
        return request({
            url: `/admin/course/check/${id}/${courseId}`,
            method: 'get'
        });
    },
    getTeacherCourse(id){
        return request({
            url: `/admin/course/teacher/${id}`,
            method: 'get'
        })
    },
    updateCourse(info){
        return  request({
            url: `/admin/course/update`,
            method: 'put',
            data: info
        })
    },
    offCourse(id){
        return  request({
            url: `/admin/course/off/${id}`,
            method: 'put',
        })
    },
    delCourse(id){
        return request({
            url: `/admin/course/${id}`,
            method: 'delete'
        })
    },
    saveCourse(courseInfo){
        return request({
            url: `/admin/course/saveCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getCoursePublishInfoById(id) {
        return request({
            url: `/admin/course/publishinfo/${id}`,
            method: 'get'
        })
    },
    publishCourse(id) {
        return request({
            url: `/admin/publish/${id}`,
            method: 'put'
        })
    },

}