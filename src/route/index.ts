import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useStore } from "../store/index";
import { ElMessage, ElNotification } from 'element-plus'

// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
import Login from '../view/User/login.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes: RouteRecordRaw[] = [
  {
    path: '/', redirect: "/login"
  },
  { path: '/login', name: 'login', component: () => import("../view/User/login.vue") },

  { path: '/register', name: 'register', component: () => import("../view/User/register.vue") },

  {
    path: '/home', name: '系统', meta: {
      isAuthRequired: true
    }, component: () => import("../view/Main/Home.vue"), redirect: to => {
      return '/home/count'
    },
    children: [
      {
        path: 'count', name: '数据统计',

        component: () => import("../view/Main/count.vue")
      },

      {
        path: 'position', name: '职位管理',
        meta: {
          isInstitution: true
        },
        component: () => import("../view/Main/position/index.vue")
      },

      {
        path: 'Typeposition', name: '职位类别管理',
        meta: {
          isInstitution: true
        },
        component: () => import("../view/Main/position/Type.vue")
      },

      {
        path: 'institution', name: '机构管理',
        meta: {
          isInstitution: true
        }, component: () => import("../view/Main/insititution/select.vue")
      },

      {
        path: 'employee', name: '档案管理', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/employee.vue")
      },

      {
        path: 'emp_add', name: '登记档案', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/addEmployee.vue")
      },

      {
        path: 'emp_update', name: '修改档案', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/updateEmployee.vue")
      },

      {
        path: 'user', name: '用户管理', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/user.vue")
      },

      {
        path: 'emp_review', name: '档案复核', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/review.vue")
      },

      {
        path: 'Empreview_check', name: '档案复核详情', meta: {
          isEmployee: true
        }, component: () => import("../view/Main/employee/review_check.vue")
      },

      {
        path: 'standard', name: '薪酬标准', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/standard.vue")
      },

      {
        path: 'sa_review', name: '标准复核', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/sa_review.vue")
      },

      {
        path: 'salary_check', name: '发放详情', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/salary_check.vue")
      },

      {
        path: 'send', name: '薪酬发放', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/send.vue")
      },

      {
        path: 'send_review', name: '发放复核', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/send_review.vue")
      },

      {
        path: 'Sareview_check', name: '复核详情', meta: {
          isSalary: true
        }, component: () => import("../view/Main/salary/review_check.vue")
      },

    ]
  },


  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  // {
  //   path: '/:pathMatch(.*)*', name: 'NotFound', component: null
  // },
]


// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
router.beforeEach((to, from, next) => {
  //判断是否登录
  window.localStorage.getItem('isLogin') ? useStore().isLogin = "true" : useStore().isLogin = "false";
  useStore().ptRole = window.localStorage.getItem('ptRole')
  // 如果没有登录， 在这里到login

  if (to.meta.isAuthRequired && useStore().isLogin === "false") {
    console.log("还未登录");
    ElMessage({
      showClose: true,
      message: '未登录，请先登录！',
      type: 'warning',
    })
    return next('/login');
  } else if (to.meta.isInstitution && (useStore().ptRole != "组织管理员" && useStore().ptRole != "超级管理员")) {
    ElNotification({
      title: '权限不足',
      message: '您的权限不足以访问该页面',
      type: 'warning',
    })
    return next('/home/count');
  }
  else if (to.meta.isSalary && (useStore().ptRole != "薪酬管理员" && useStore().ptRole != "超级管理员")) {
    ElNotification({
      title: '权限不足',
      message: '您的权限不足以访问该页面',
      type: 'warning',
    })
    return next('/home/count');
  }
  else if (to.meta.isEmployee && (useStore().ptRole != "员工管理员" && useStore().ptRole != "超级管理员")) {
    ElNotification({
      title: '权限不足',
      message: '您的权限不足以访问该页面',
      type: 'warning',
    })
    return next('/home/count');
  }
  else {
    next();
  }
})
export default router

