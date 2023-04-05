import request from '@/utils/request'
export default {
    getPage(page,limit,type){
        return request({
            url: `/admin/notice/${page}/${limit}/${type}`,
            method: 'get'
        })
    },
    getInfo(id){
        return request({
            url: `/admin/notice/info/${id}`,
            method: 'get'
        })
    },
    addNotice(info){
        return request({
            url: `/admin/notice/add`,
            method: 'post',
            data: info
        })
    },
    updateNotice(info){
        return request({
            url: `/admin/notice/update`,
            method: 'put'
        })
    }
}
