<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Đăng ký</h2>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <FormInput
          v-model="formData.fullName"
          label="Họ và tên"
          type="text"
          placeholder="Nguyễn Văn A"
          :disabled="loading"
          required
        />
        
        <FormInput
          v-model="formData.email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          :disabled="loading"
          required
        />
        
        <FormInput
          v-model="formData.password"
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          :disabled="loading"
          minlength="6"
          hint="Ít nhất 6 ký tự, có chữ hoa, chữ thường và số"
          required
        />
        
        <FormInput
          v-model="formData.confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
          :disabled="loading"
          :error="passwordMismatch ? 'Mật khẩu không khớp' : ''"
          required
        />
        
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="loading || passwordMismatch"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>
        
        <button
          type="button"
          @click="$emit('switch-to-login')"
          class="w-full text-blue-600 hover:underline text-sm"
          :disabled="loading"
        >
          Đã có tài khoản? Đăng nhập
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import FormInput from '../common/FormInput.vue'

export default {
  name: 'RegisterForm',
  components: { FormInput },
  props: {
    loading: Boolean
  },
  emits: ['submit', 'switch-to-login'],
  setup(props, { emit }) {
    const formData = reactive({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    const passwordMismatch = computed(() => {
      return formData.password && 
             formData.confirmPassword && 
             formData.password !== formData.confirmPassword
    })

    const handleSubmit = () => {
      if (passwordMismatch.value) return
      
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
      if (!passwordRegex.test(formData.password)) {
        alert('Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số')
        return
      }

      emit('submit', { 
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      })
      
      formData.fullName = ''
      formData.email = ''
      formData.password = ''
      formData.confirmPassword = ''
    }

    return {
      formData,
      passwordMismatch,
      handleSubmit
    }
  }
}
</script>