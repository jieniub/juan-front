import request from '@/utils/request'
export default {
    getList() {
        return request({
            url: `/front/list`,
            method: 'get'
        })
    }
}