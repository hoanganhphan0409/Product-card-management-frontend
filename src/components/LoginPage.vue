<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Product Card System</h1>
        <p class="text-gray-600">Đăng nhập vào hệ thống</p>
      </div>
      
      <AlertMessage 
        v-if="errorMessage" 
        type="error" 
        :message="errorMessage" 
        @close="errorMessage = ''" 
      />
      
      <AlertMessage 
        v-if="successMessage" 
        type="success" 
        :message="successMessage" 
        @close="successMessage = ''" 
      />
      
      <LoginForm 
        v-if="currentView === 'login'"
        :loading="loading"
        @submit="login"
        @switch-to-register="switchView('register')"
        @switch-to-forgot="switchView('forgot')"
      />

      <RegisterForm
        v-if="currentView === 'register'"
        :loading="loading"
        @submit="register"
        @switch-to-login="switchView('login')"
      />

      <ForgotPasswordForm
        v-if="currentView === 'forgot'"
        :loading="loading"
        @submit="forgotPassword"
        @switch-to-login="switchView('login')"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import api from '../services/api'
import AlertMessage from './common/AlertMessage.vue'
import LoginForm from './auth/LoginForm.vue'
import RegisterForm from './auth/RegisterForm.vue'
import ForgotPasswordForm from './auth/ForgotPasswordForm.vue'

export default {
  name: 'LoginPage',
  components: {
    AlertMessage,
    LoginForm,
    RegisterForm,
    ForgotPasswordForm
  },
  emits: ['login'],
  setup(props, { emit }) {
    const currentView = ref('login')
    const loading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')

    const switchView = (view) => {
      currentView.value = view
      errorMessage.value = ''
      successMessage.value = ''
    }

    const login = async (formData) => {
      loading.value = true
      errorMessage.value = ''
      
      try {
        const response = await api.login(formData.email, formData.password)
        
        if (response.success && response.data) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data))
          successMessage.value = 'Đăng nhập thành công!'
          
          setTimeout(() => {
            emit('login', response.data)
          }, 500)
        } else {
          errorMessage.value = response.message || 'Đăng nhập thất bại'
        }
      } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = error.response?.data?.message || 'Email hoặc mật khẩu không chính xác'
      } finally {
        loading.value = false
      }
    }

    const register = async (formData) => {
      loading.value = true
      errorMessage.value = ''
      
      try {
        const response = await api.register(
          formData.fullName,
          formData.email,
          formData.password
        )
        
        if (response.success && response.data) {
          successMessage.value = 'Đăng ký thành công! Vui lòng đăng nhập.'
          
          setTimeout(() => {
            switchView('login')
          }, 2000)
        } else {
          errorMessage.value = response.message || 'Đăng ký thất bại'
        }
      } catch (error) {
        console.error('Register error:', error)
        
        if (error.response?.data?.validationErrors) {
          const errors = error.response.data.validationErrors
          const firstError = Object.values(errors)[0]
          errorMessage.value = firstError
        } else {
          errorMessage.value = error.response?.data?.message || 'Đăng ký thất bại. Email có thể đã được sử dụng'
        }
      } finally {
        loading.value = false
      }
    }

    const forgotPassword = async (formData) => {
      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''
      
      try {
        const response = await api.forgotPassword(formData.email)
        
        if (response.success) {
          successMessage.value = response.message || 'Link khôi phục đã được gửi đến email của bạn'
          
          setTimeout(() => {
            switchView('login')
          }, 3000)
        } else {
          errorMessage.value = response.message || 'Gửi link thất bại'
        }
      } catch (error) {
        console.error('Forgot password error:', error)
        errorMessage.value = error.response?.data?.message || 'Không tìm thấy email này trong hệ thống'
      } finally {
        loading.value = false
      }
    }

    return {
      currentView,
      loading,
      errorMessage,
      successMessage,
      switchView,
      login,
      register,
      forgotPassword
    }
  }
}
</script>