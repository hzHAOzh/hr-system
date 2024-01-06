<template>
  <div class="bg">
    <div class="box">
      <Particles id="tsparticles" class="login-particles" :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded" :options="options" />
    </div>
    <div class="main">
      <div class="login">
        <h1 class="">管理员注册</h1>

        <div class="wrapper">
          <form action="" :rules="RegisterRules">
            <div class="input-data">
              <input type="text" v-model="re_account.uName" required />
              <div class="underline"></div>
              <label>Name</label>
            </div>
            <div class="input-data">
              <input type="password" v-model="re_account.uPassword" required />
              <div class="underline Password"></div>
              <label>Password</label>
            </div>
            <div class="input-data">
              <input type="password" v-model="re_account.again" required />
              <div class="underline Password"></div>
              <label>again Password</label>
            </div>
          </form>
        </div>
        <div class="foot">
          已有账号？
          <div class="red" @click="toLogin">直接登录</div>
        </div>
         <button class="learn-more" @click="handleRegister(re_account)">注册</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { doRegister } from '../../api/Login'
import { options } from "./options";
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

const imageUrl = ref('')
const router = useRouter()
// window.localStorage.removeItem('token')

const handleAvatarSuccess = (
  response: any,
  uploadFile: any
) => {
  imageUrl.value = response.data.url
  console.log(imageUrl.value);
}

const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

let re_account = reactive({
  uName: '',
  uPassword: '',
  again: '',
  uPosition: 14,
  uState: 'allow',
})

const RegisterRules = {
  uName: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  uPassword: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
};

const handleRegister = async (re_account: any) => {
  if (re_account.uName == '' || re_account.uPassword == '') {
    ElMessage({
      showClose: true,
      message: '账号或密码为空，请重新输入',
      type: 'warning',
    })
  } else if (re_account.uPassword != re_account.again) {
    ElMessage({
      showClose: true,
      message: '二次密码不一致，请重新输入',
      type: 'warning',
    })
  }
  else {
    await doRegister(re_account).then((res: any) => {
      console.log(re_account);
      console.log(res);
      if (res.msg === "注册成功") {
        ElMessage({
          showClose: true,
          message: '注册成功，正在跳转页面！',
          type: 'success',
        })
        router.push({ name: 'login' })
      } else {
        ElMessage({
          showClose: true,
          message: '注册失败',
          type: 'warning',
        })
      }
    })
  }

}
const toLogin = () => {
  router.push({ name: 'login' })
}

const particlesInit = async (engine: Engine) => {
  await loadFull(engine)
}

const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container)
}
</script>

<style scoped>
* {

  outline: none;

}

h1 {
  font-size: 30px;
  line-height: 48px;
  margin-bottom: 32px;
  font-weight: 600;
  margin-top: 0;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.foot {
  color: #8C8889;
  font-size: 14px;
  line-height: 22px;
  margin: -16px 0 -16px;
  user-select: none;
  text-align: left;
  padding-left: 30px;
}

.red {
  cursor: pointer;
  color: #FE4066;
  display: inline-block;
  position: relative;
}

.red::before {
  width: 0;
  height: 1px;
  content: '';
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background: #FE4066;
}

.red:hover::before {
  width: 100%;
}

/* .bgimg {
  background-image: url("../../assets/images/news1.png");
  width: 60%;
  height: 100%;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
} */
</style>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}

.userImg {
  width: 100px;
  height: 100px;
}

.avatar-uploader-icon {
  margin: 0 auto !important;
  ;
}


body {
  background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);
  // background-color: #fff;
}

.login {
  width: 375px;
  border-radius: 32px;
}

.bg {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);

  .main {
    margin: 0 auto;
    background-color: #fff;
    // background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);
    box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.1);
    padding: 50px;
    border-radius: 32px;
    transform: translateY(-50%);
    right: 35%;
    position: absolute;
    top: 50%;

    .userImg {
      margin: 0 auto;

    }
  }
}

//按钮特效
button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
}

button.learn-more {
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 0.5em 1em;
  background: #fff0f0;
  border: 2px solid #b18597;
  width: 35%;
  font-size: 20px;
  border-radius: 0.75em;
  transform-style: preserve-3d;
  margin-top: 40px;
  margin-bottom: 20px;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.learn-more::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 87%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f9c4d2;
  border-radius: inherit;
  box-shadow: 0 0 0 2px #b18597, 0 0 0 0 #ffe3e2;
  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}

button.learn-more:hover {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}

button.learn-more:hover::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}

button.learn-more:active {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}

button.learn-more:active::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}

//input输入框特效
.wrapper {
  background-color: #fff;
  // background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);
  padding: 30px;
  padding-bottom: 0;
}

.wrapper .input-data {
  width: 100%;
  height: 30px;
  position: relative;
  margin-bottom: 40px;
}

.wrapper .input-data input {
  width: 100%;
  height: 100%;
  border: none;
  // background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);

  border-bottom: 2px solid silver;
  font-size: 20px;
}

.input-data input:focus~label,
.input-data input:valid~label {
  transform: translateY(-20px);
  font-size: 15px;
  color: #4158D0;
}

.wrapper .input-data label {
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  font-size: 15px;
  transition: all 0.3s ease;
}

.wrapper .input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  right: 50%;
  width: 100%;
}

.input-data .underline:before {
  position: absolute;
  content: "";
  height: 118%;
  width: 100%;
  background: #4158D0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.input-data input:focus~.underline:before,
.input-data input:valid~.underline:before {
  transform: scaleX(1);
}

.toLogin {
  position: relative;
  right: -150px;
}

.Password {
  margin-bottom: 0px;
}

.login-particles {
  background-image: linear-gradient(300deg, #E4F6FF, #F9FEFF);

}
</style>
