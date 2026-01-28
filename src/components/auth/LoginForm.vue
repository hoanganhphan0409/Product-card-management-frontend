<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Đăng nhập</h2>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
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
          required
        />
        
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
            @click="$emit('switch-to-forgot')"
            class="text-blue-600 hover:underline"
            :disabled="loading"
          >
            Quên mật khẩu?
          </button>
          <button
            type="button"
            @click="$emit('switch-to-register')"
            class="text-blue-600 hover:underline"
            :disabled="loading"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import FormInput from '../common/FormInput.vue'

export default {
  name: 'LoginForm',
  components: { FormInput },
  props: {
    loading: Boolean
  },
  emits: ['submit', 'switch-to-register', 'switch-to-forgot'],
  setup(props, { emit }) {
    const formData = reactive({
      email: '',
      password: ''
    })

    const handleSubmit = () => {
      emit('submit', { ...formData })
    }

    return {
      formData,
      handleSubmit
    }
  }
}
</script>
