import request from '../util/request'


// 获取全部方法
export const GetAllItAndSa = () => {
  return request({
    method: 'get',
    url: '/system/itandsa/all',
  })
}

// 添加方法
export const AddItAndSa = (data: any) => {
  return request({
    method: 'post',
    url: '/system/itandsa/add',
    data: data
  })
}

// 修改方法
export const UpdateItAndSa = (data: any) => {
  return request({
    method: 'put',
    url: '/system/itandsa/update',
    data: data
  })
}


// 删除方法
export const DeleteItAndSa = (id: any) => {
  return request({
    method: 'delete',
    url: '/system/itandsa/delete/' + id,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
  })
}


