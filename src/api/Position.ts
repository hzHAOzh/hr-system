import request from '../util/request'
// 获取机构列表方法
export const Get = (data: any) => {
  return request({
    method: 'post',
    url: '/system/position/get',
    data: data
  })
}

// 获取全部方法
export const GetAll = () => {
  return request({
    method: 'get',
    url: '/system/position/all',
  })
}

// 添加方法
export const Add = (data: any) => {
  return request({
    method: 'post',
    url: '/system/position/add',
    data: data
  })
}

// 修改方法
export const Update = (data: any) => {
  return request({
    method: 'put',
    url: '/system/position/update',
    data: data
  })
}


// 删除方法
export const Delete = (id: any) => {
  return request({
    method: 'delete',
    url: '/system/position/delete/' + id,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
  })
}

// 获取类别
export const GetAllType = () => {
  return request({
    method: 'get',
    url: '/system/positionType/all',
  })
}
