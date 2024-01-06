import request from '../util/request'
// 查询机构
export const Get = (data: any) => {
  return request({
    method: 'post',
    url: 'system/employee/get',
    data: data
  })
}

// 获取全部方法
export const GetAll = () => {
  return request({
    method: 'get',
    url: 'system/employee/all',
  })
}

// 添加方法
export const Add = (data: any) => {
  return request({
    method: 'post',
    url: 'system/employee/add',
    data: data
  })
}

// 修改方法
export const Update = (data: any) => {
  return request({
    method: 'put',
    url: 'system/employee/update',
    data: data
  })
}


// 审核方法
export const UpdateState = (data: any) => {
  return request({
    method: 'put',
    url: '/system/employee/updateeState',
    data: data
  })
}


// 删除方法
export const Delete = (id: any) => {
  return request({
    method: 'delete',
    url: '/system/employee/delete/' + id,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
  })
}



// 获取类别
export const GetAllPosition = () => {
  return request({
    method: 'get',
    url: '/system/position/all',
  })
}

export const GetAllType = () => {
  return request({
    method: 'get',
    url: '/system/positionType/all',
  })
}


// 获取机构
export const getAllInstitution = () => {
  return request({
    method: 'get',
    url: '/system/institution/all',
  })
}

export const getL1L2L3 = () => {
  return request({
    method: 'get',
    url: '/system/institution/l1l2l3',
  })
}

// 获取全部方法
export const GetAllUser = () => {
  return request({
    method: 'get',
    url: '/users/all',
  })
}

