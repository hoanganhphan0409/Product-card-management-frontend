<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Lấy lại mật khẩu</h2>
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
        
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          {{ loading ? 'Đang gửi...' : 'Gửi link khôi phục' }}
        </button>
        
        <button
          type="button"
          @click="$emit('switch-to-login')"
          class="w-full text-blue-600 hover:underline text-sm"
          :disabled="loading"
        >
          Quay lại đăng nhập
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import FormInput from '../common/FormInput.vue'

export default {
  name: 'ForgotPasswordForm',
  components: { FormInput },
  props: {
    loading: Boolean
  },
  emits: ['submit', 'switch-to-login'],
  setup(props, { emit }) {
    const formData = reactive({
      email: ''
    })

    const handleSubmit = () => {
      emit('submit', { ...formData })
      formData.email = ''
    }

    return {
      formData,
      handleSubmit
    }
  }
}
</script>