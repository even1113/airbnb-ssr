<template>
  <!-- 切换语言 -->
  <el-config-provider>
    <div class="login-change"></div>

    <div class="login-container">
      <div class="login-box">
        <h2>{{ t('login.title') }}</h2>
        <p>{{ t('login.msg') }}</p>

        <el-form
          status-icon
          ref="formRef"
          :rules="rules"
          :model="ruleForm"
          label-position="top"
        >
          <!-- 手机号 -->
          <el-form-item :label="t('login.mobile')" prop="mobile">
            <el-input
              :placeholder="t('login.placeMobile')"
              v-model="ruleForm.mobile"
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item :label="t('login.password')" prop="password">
            <el-input
              :placeholder="t('login.placePass')"
              v-model="ruleForm.password"
              autocomplete="off"
              type="password"
              show-password
            />
          </el-form-item>

          <!-- 登录注册切换 -->
          <a class="question" @click="questionLogin" v-if="!isSign">{{
            t('login.question_login')
          }}</a>
          <a class="question" @click="questionSign" v-if="isSign">{{
            t('login.question_sign')
          }}</a>

          <!-- 按钮 -->
          <el-form-item>
            <el-button
              class="submit"
              type="primary"
              v-if="!isSign"
              @click="loginBtn"
            >
              {{ t('login.loginBtn') }}
            </el-button>
            <el-button
              class="submit"
              type="primary"
              v-if="isSign"
              @click="singBtn"
            >
              {{ t('login.signBtn') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import useFormProperties from '@/composables/login/useFormProperties'
import useFormOperates from '@/composables/login/useFormOperates'

const router = useRouter()
const { t, locale: localeLanguage } = useI18n()

const { ruleForm, ruleFormRef, rules } = useFormProperties(t)
const { userSign, userLogin } = useFormOperates(router, ruleForm)

// question点击切换
const isSign = ref(false)
const questionLogin = () => {
  isSign.value = true
}
const questionSign = () => {
  isSign.value = false
}

// 点击按钮
const loginBtn = () => {
  userLogin(ruleForm)
}
const singBtn = () => {
  userSign(ruleForm)
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  /* 所有边框为0 */
  border: 0;
  outline: none;
  user-select: none;
  text-decoration: none;
  font-family: 'Varela Round', sans-serif;
}

html {
  font-size: 16px;
}

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/images/login/wave.png');
  background-size: cover;
  animation: move 10s linear alternate infinite;
}

@keyframes move {
  50% {
    background-position: 50%;
  }
}

.login-box {
  /* 所有子类盒子宽度继承：400-40-40=320 */
  /* 高度为内容大小 */
  width: 400px;
  height: min-content;
  padding: 40px;
  background-color: #fff;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-box h2 {
  color: #000;
  font-size: 2.2rem;
}

.login-box p {
  font-size: 1.2rem;
  color: #404040;
  margin-top: 4px;
}

.el-form {
  /* 宽度继承父类 320px */
  text-align: left;
  margin-top: 30px;
}

.el-form-item {
  margin: 18px 0;
}

.el-form-item .el-form-item__label {
  font-size: 16px;
  color: #101010;
}

.el-form-item .el-input {
  height: 35px;
}

.question {
  color: #3784ff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.question:hover {
  color: #124ce7;
}

.submit {
  width: 100%;
  height: 46px;
  font-size: 18px;
  color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  background: linear-gradient(45deg, #124ce7, #3784ff);
  cursor: pointer;
}

.login-change {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 5px;
  right: 5px;
  background: url('@/assets/images/login/changeLang.png') no-repeat;
  background-size: cover;
  cursor: pointer;
}
</style>
