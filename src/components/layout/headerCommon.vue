<template>
  <div class="header-common">
    <div class="logo" @click="goHome">Airbnb Imitate</div>

    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="orders">{{ t('header.orders') }}</el-menu-item>
      <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>

      <el-sub-menu index="language">
        <template #title>{{ t('header.language') }}</template>
        <el-menu-item index="zh">简体中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="logout" v-if="userState === 1"
        >{{ t('login.logout') }}
      </el-menu-item>

      <el-menu-item index="login"
        >{{ t('login.loginTab') }}/{{ t('login.signTab') }}</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

import en from 'element-plus/lib/locale/lang/en.js'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

import { userLogoutApi } from '@/api/login'

const { t } = useI18n()
const activeIndex = ref('')

const userStore = useUserStore()
const { userState } = storeToRefs(userStore)

const router = useRouter()
const { proxy }: any = getCurrentInstance()

// 切换语言
const handleSelect = async function (e: any) {
  if (e === 'zh') {
    // emit('changeLang', zhCn)
    // // 将语言包写入数据库，刷新网页时语言就不会被重置
    // saveLanguage(zhCn)
    // store.dispatch('setLanguage', zhCn)

    ElMessage({
      message: '切换简体中文成功',
      type: 'success',
    })
  }

  if (e === 'en') {
    // emit('changeLang', en)
    // saveLanguage(en)
    // store.dispatch('setLanguage', en)

    ElMessage({
      message: 'Switch English successfully',
      type: 'success',
    })
  }

  if (e === 'login') {
    router.push('/login')
  }

  if (e === 'logout') {
    userLogout()
  }
}

// 调用Mock接口,获取当前语言包
// function getLanguage() {
//   fetchLanguageApi().then((res) => {
//     const { result } = res
//     if (result.target.result?.name === 'en') {
//       emit('changeLang', en)
//     } else if (result.target.result.name === 'zhCn') {
//       emit('changeLang', zhCn)
//     }
//   })
// }
// getLanguage()

function goHome() {
  router.push('/home')
}

// 登出界面
// const userStatus = localStorage.getItem('userStatus')
function userLogout() {
  userLogoutApi().then((res) => {
    const { success, message } = res
    if (success) {
      proxy.$message.success(message)
      router.push('/login')
      // store.commit('setUserStatus', 0)
    } else {
      proxy.$message.success(message)
    }
  })
}
</script>

<style lang="scss" scoped>
.header-common {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  overflow: hidden;

  .logo {
    width: 200px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    margin-left: 10px;
    font-size: 22px;
    font-family: 'Varela Round', sans-serif;
    color: hsl(38, 8%, 8%);
    user-select: none;
    cursor: pointer;
  }

  .el-menu {
    height: 80px;
    align-items: center;
    margin-right: 10px;

    .el-menu-item {
      height: 80px;
      font-size: 16px;
      &:nth-child(1) {
        margin-right: 18px;
      }
    }

    .el-sub-menu {
      font-size: 16px;
    }

    .el-sub-menu .el-sub-menu__title {
      font-size: 16px;
    }

    // el-sub-menu图标样式
    .el-sub-menu__icon-arrow {
      display: none;
    }

    .el-sub-menu.is-active .el-sub-menu__title {
      border-bottom-color: #fff;
    }
  }
}
</style>
<style lang="scss">
.el-sub-menu .el-sub-menu__title {
  font-size: 16px;
}
</style>
