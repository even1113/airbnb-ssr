import { IResult } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'
import { getCurrentInstance } from 'vue'
import { Router, useRoute } from 'vue-router'
import { useUserStore } from '@/store/user'

interface IRuleForm {
  mobile: string
  password: string
}
interface Result {
  userSign: (params: IRuleForm) => void
  userLogin: (params: IRuleForm) => void
}

export default function useFormOperates(
  router: Router,
  params: IRuleForm
): Result {
  const { proxy }: any = getCurrentInstance()

  const route = useRoute()
  const userStore = useUserStore()

  // 注册接口
  function userSign(params: IRuleForm) {
    userSignApi(params).then((res: IResult) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录接口
  function userLogin(params: IRuleForm) {
    userLoginApi(params).then((res) => {
      const { success, message, result } = res
      const { status } = result
      if (success) {
        proxy.$message.success(message)
        // store.commit('setUserStatus', status)
        // userStore.setLoggedIn(status)
        router.push('/home')
      } else {
        proxy.$message.error(message)
      }
    })
  }
  return {
    userSign,
    userLogin,
  }
}
