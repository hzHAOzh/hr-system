import request from '../util/request'
// 获取机构列表方法
export const getInstitution = (institution: any) => {
  return request({
    method: 'post',
    url: '/system/institution',
    data: institution
  })
}

// 获取全部方法
export const getAllInstitution = () => {
  return request({
    method: 'get',
    url: '/system/institution/all',
  })
}

// 添加方法
export const Add = (data: any) => {
  return request({
    method: 'post',
    url: '/system/institution/add',
    data: data
  })
}

// 修改方法
export const Update = (data: any) => {
  return request({
    method: 'put',
    url: '/system/institution/update',
    data: data
  })
}


// 删除方法
export const Delete = (id: any) => {
  return request({
    method: 'delete',
    url: '/system/institution/delete/' + id,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
  })
}
