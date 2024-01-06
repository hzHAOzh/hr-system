<template>
  <div>
    <div style="height: 8vh;line-height: 8vh;">

      <el-icon>
        <Menu />
      </el-icon>
      人力资源管理系统
    </div>

    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      @select="handleSelect" unique-opened>
      <el-menu-item index="数据统计">
        <el-icon>
          <Histogram />
        </el-icon>
        <span>数据统计</span>
      </el-menu-item>
      <el-sub-menu index="组织管理" v-if="store.ptRole == '组织管理员' || store.ptRole == '超级管理员'">
        <template #title>
          <el-icon>
            <Document />
          </el-icon>
          <span>组织管理</span>
        </template>
        <el-menu-item index="机构管理">机构管理</el-menu-item>
        <el-menu-item index="职位类别管理">职称管理</el-menu-item>
        <el-menu-item index="职位管理">职位管理</el-menu-item>
        <!-- <el-menu-item index="1-3">item three</el-menu-item> -->
        <!-- <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu> -->
      </el-sub-menu>

      <el-sub-menu index="员工管理" v-if="store.ptRole == '员工管理员' || store.ptRole == '超级管理员'">
        <template #title>
          <el-icon>
            <User />
          </el-icon>
          <span>员工管理</span>
        </template>
        <el-menu-item index="用户管理">用户管理</el-menu-item>
        <el-menu-item index="档案管理">档案管理</el-menu-item>
        <el-menu-item index="档案登记">档案登记</el-menu-item>
        <el-menu-item index="档案复核">档案复核</el-menu-item>
      </el-sub-menu>


      <el-sub-menu index="薪酬管理" v-if="store.ptRole == '薪酬管理员' || store.ptRole == '超级管理员'">
        <template #title>
          <el-icon>
            <Money />
          </el-icon>
          <span>薪酬管理</span>
        </template>
        <el-menu-item index="薪酬标准">薪酬标准</el-menu-item>
        <el-menu-item index="标准复核">标准复核</el-menu-item>
        <el-menu-item index="薪酬发放">薪酬发放</el-menu-item>
        <el-menu-item index="发放复核">发放复核</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, defineEmits } from 'vue'
import { useStore } from "../store/index";
import {
  Document,
  Menu as IconMenu,
  Money,
  User,
  Menu,
  Histogram
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router"
const store = useStore()
const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const emit = defineEmits(['title'])
const handleSelect = (key: string, keyPath: string[]) => {
  emit('title', keyPath)
  // console.log(keyPath);
  if (keyPath[0] == '组织管理') {
    switch (key) {
      case '机构管理':
        router.push('/home/institution')
        break;
      case '职位管理':
        router.push('/home/position')
        break;
      case '职位类别管理':
        router.push('/home/Typeposition')
        break;
    }
  } else if (keyPath[0] == '员工管理') {
    switch (key) {
      case '用户管理':
        router.push('/home/user')
        break;
      case '档案登记':
        router.push('/home/emp_add')
        break;
      case '档案管理':
        router.push('/home/employee')
        break;
      case '档案复核':
        router.push('/home/emp_review')
        break;
    }
  } else if (keyPath[0] == '薪酬管理') {
    switch (key) {
      case '薪酬标准':
        router.push('/home/standard')
        break;

      case '标准复核':
        router.push('/home/sa_review')
        break;
      case '薪酬发放':
        router.push('/home/send')
        break;
      case '发放复核':
        router.push('/home/send_review')
        break;
    }
  } else if (keyPath[0] == "数据统计") {
    router.push('/home/count')

  }
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const state = reactive({
  visible: false,
})

const open = (id: any) => {
  state.visible = true;
}


</script>