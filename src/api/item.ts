import request from '../util/request'


// 获取全部方法
export const GetAllItem = () => {
  return request({
    method: 'get',
    url: '/system/item/all',
  })
}

// 添加方法
export const AddItem = (data: any) => {
  return request({
    method: 'post',
    url: '/system/item/add',
    data: data
  })
}

// 修改方法
export const UpdateItem = (data: any) => {
  return request({
    method: 'put',
    url: '/system/item/update',
    data: data
  })
}


// 删除方法
export const DeleteItem = (id: any) => {
  return request({
    method: 'delete',
    url: '/system/item/delete/' + id,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
  })
}


