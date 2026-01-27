<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Product Card System</h1>
        <p class="text-gray-600">Đăng nhập vào hệ thống</p>
      </div>
      
      <!-- Login Form -->
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
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>
            <div class="flex justify-between text-sm">
              <button
                type="button"
                @click="currentView = 'forgot'"
                class="text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </button>
              <button
                type="button"
                @click="currentView = 'register'"
                class="text-blue-600 hover:underline"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Register Form -->
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
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Đăng ký
            </button>
            <button
              type="button"
              @click="currentView = 'login'"
              class="w-full text-blue-600 hover:underline text-sm"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>
        </form>
      </div>

      <!-- Forgot Password -->
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
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Gửi link khôi phục
            </button>
            <button
              type="button"
              @click="currentView = 'login'"
              class="w-full text-blue-600 hover:underline text-sm"
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
import { ref, reactive } from 'vue'

export default {
  name: 'LoginPage',
  emits: ['login'],
  setup(props, { emit }) {
    const currentView = ref('login')
    const loginForm = reactive({ email: '', password: '' })
    const registerForm = reactive({ fullName: '', email: '', password: '' })
    const forgotForm = reactive({ email: '' })

    const login = () => {
      emit('login')
    }

    const register = () => {
      emit('login')
    }

    const forgotPassword = () => {
      alert('Link khôi phục đã được gửi!')
      currentView.value = 'login'
    }

    return {
      currentView,
      loginForm,
      registerForm,
      forgotForm,
      login,
      register,
      forgotPassword
    }
  }
}
</script>