import request from '../util/request'
// 获取机构列表方法


// 获取全部方法
export const getAllInstitution = () => {
  return request({
    method: 'get',
    url: '/system/institution/all',
  })
}


// 获取全部方法
export const GetAllemployee = () => {
  return request({
    method: 'get',
    url: 'system/employee/all',
  })
}


// 获取全部方法
export const GetAllusers = () => {
  return request({
    method: 'get',
    url: '/users/all',
  })
}



// 获取全部方法
export const GetAllsendsalary = () => {
  return request({
    method: 'get',
    url: 'system/sendsalary/allReview',
  })
}

// 获取全部方法
export const GetAllposition = () => {
  return request({
    method: 'get',
    url: '/system/position/all',
  })
}

// 获取全部方法
export const GetAllsalary = () => {
  return request({
    method: 'get',
    url: 'system/salary/all',
  })
}

// 获取列表方法
export const Get = (data: any) => {
  return request({
    method: 'post',
    url: '/system/position/get',
    data: data
  })
}
// 获取类别
export const GetAllType = () => {
  return request({
    method: 'get',
    url: '/system/positionType/all',
  })
}