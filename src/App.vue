<template>
  <el-config-provider :locale="locale">
    <div class="app">
      <headerCommon
        @changeLang="changeLang"
        v-show="route.fullPath.indexOf('login') === -1"
      ></headerCommon>
      <Home></Home>
      <router-view></router-view>
      <FooterCommon
        v-show="route.fullPath.indexOf('login') === -1"
      ></FooterCommon>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'

import { useI18n } from 'vue-i18n'
import headerCommon from './components/layout/headerCommon.vue'
import FooterCommon from './components/layout/footerCommon.vue'
// import Home from '@/views/home/index.vue'

const { locale: localeLanguage } = useI18n()
const locale = ref(zhCn)

const changeLang = (language: any) => {
  locale.value = language
  localeLanguage.value = language.name
  console.log('language', language)
}

const route = useRoute()
</script>

<style lang="scss" scoped>
.app {
}
</style>
