import { ref, reactive, Ref } from 'vue'
interface IRuleForm {
  mobile: string
  password: string
}
interface IRuleItem {
  required: boolean
  min?: number
  max?: number
  message: string
  trigger: string
}
interface IRules {
  mobile: IRuleItem[]
  password: IRuleItem[]
}

interface Result {
  ruleFormRef: any
  ruleForm: IRuleForm
  rules: IRules
}

export default function useFormProperties(t: any): Result {
  const ruleFormRef = ref()
  const ruleForm = reactive({
    mobile: '',
    password: '',
  })
  const rules = reactive({
    mobile: [
      {
        required: true,
        min: 11,
        max: 11,
        message: t('login.placeMobile'),
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: t('login.placePass'),
        trigger: 'blur',
      },
    ],
  })

  return {
    ruleFormRef,
    ruleForm,
    rules,
  }
}
