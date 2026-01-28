<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Product Card System</h1>
        <p class="text-gray-600">Đăng nhập vào hệ thống</p>
      </div>
      
      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex justify-between items-center">
        <span>{{ errorMessage }}</span>
        <button @click="errorMessage = ''" class="text-red-700 hover:text-red-900">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg flex justify-between items-center">
        <span>{{ successMessage }}</span>
        <button @click="successMessage = ''" class="text-green-700 hover:text-green-900">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div v-if="currentView === 'login'">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Đăng nhập</h2>
        <form @submit.prevent="login">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="loginForm.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
                required
                :disabled="loading"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                v-model="loginForm.password"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
                :disabled="loading"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
            </button>
            <div class="flex justify-between text-sm">
              <button
                type="button"
                @click="switchView('forgot')"
                class="text-blue-600 hover:underline"
                :disabled="loading"
              >
                Quên mật khẩu?
              </button>
              <button
                type="button"
                @click="switchView('register')"
                class="text-blue-600 hover:underline"
                :disabled="loading"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </div>

      <div v-if="currentView === 'register'">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Đăng ký</h2>
        <form @submit.prevent="register">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
              <input
                v-model="registerForm.fullName"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nguyễn Văn A"
                required
                :disabled="loading"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="registerForm.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
                required
                :disabled="loading"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                v-model="registerForm.password"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
                minlength="6"
                :disabled="loading"
              />
              <p class="text-xs text-gray-500 mt-1">Ít nhất 6 ký tự, có chữ hoa, chữ thường và số</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': passwordMismatch }"
                placeholder="••••••••"
                required
                :disabled="loading"
              />
              <p v-if="passwordMismatch" class="text-xs text-red-500 mt-1">Mật khẩu không khớp</p>
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="loading || passwordMismatch"
            >
              {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
            </button>
            <button
              type="button"
              @click="switchView('login')"
              class="w-full text-blue-600 hover:underline text-sm"
              :disabled="loading"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        </form>
      </div>

      <div v-if="currentView === 'forgot'">
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">Lấy lại mật khẩu</h2>
        <form @submit.prevent="forgotPassword">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="forgotForm.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
                required
                :disabled="loading"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="loading"
            >
              {{ loading ? 'Đang gửi...' : 'Gửi link khôi phục' }}
            </button>
            <button
              type="button"
              @click="switchView('login')"
              class="w-full text-blue-600 hover:underline text-sm"
              :disabled="loading"
            >
              Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import api from '../services/api'

export default {
  name: 'LoginPage',
  emits: ['login'],
  setup(props, { emit }) {
    const currentView = ref('login')
    const loading = ref(false)
    const errorMessage = ref('')
    const successMessage = ref('')
    
    const loginForm = reactive({ email: '', password: '' })
    const registerForm = reactive({ 
      fullName: '', 
      email: '', 
      password: '',
      confirmPassword: ''
    })
    const forgotForm = reactive({ email: '' })

    const passwordMismatch = computed(() => {
      return registerForm.password && 
             registerForm.confirmPassword && 
             registerForm.password !== registerForm.confirmPassword
    })

    const switchView = (view) => {
      currentView.value = view
      errorMessage.value = ''
      successMessage.value = ''
    }

    const login = async () => {
      loading.value = true
      errorMessage.value = ''
      
      try {
        const response = await api.login(loginForm.email, loginForm.password)
        
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

    const register = async () => {
      if (registerForm.password !== registerForm.confirmPassword) {
        errorMessage.value = 'Mật khẩu xác nhận không khớp'
        return
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
      if (!passwordRegex.test(registerForm.password)) {
        errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường và số'
        return
      }

      loading.value = true
      errorMessage.value = ''
      
      try {
        const response = await api.register(
          registerForm.fullName,
          registerForm.email,
          registerForm.password
        )
        
        if (response.success && response.data) {
          successMessage.value = 'Đăng ký thành công! Vui lòng đăng nhập.'

          registerForm.fullName = ''
          registerForm.email = ''
          registerForm.password = ''
          registerForm.confirmPassword = ''
   
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

    const forgotPassword = async () => {
      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''
      
      try {
        const response = await api.forgotPassword(forgotForm.email)
        
        if (response.success) {
          successMessage.value = response.message || 'Link khôi phục đã được gửi đến email của bạn'

          setTimeout(() => {
            switchView('login')
            forgotForm.email = ''
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
      loginForm,
      registerForm,
      forgotForm,
      passwordMismatch,
      switchView,
      login,
      register,
      forgotPassword
    }
  }
}
</script>