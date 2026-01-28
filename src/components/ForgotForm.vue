<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6 text-gray-800">Lấy lại mật khẩu</h2>
    <form @submit.prevent="handleSubmit">
      <div class="space-y-4">
        <input v-model="email" type="email" class="input" placeholder="Email" required />

        <button class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Đang gửi...' : 'Gửi link khôi phục' }}
        </button>

        <button type="button" class="link w-full text-center" @click="$emit('change-view', 'login')">
          Quay lại đăng nhập
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const emit = defineEmits(['success', 'error', 'change-view'])
const email = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    const res = await api.forgotPassword(email.value)
    if (res.success) emit('success', res.message)
    else emit('error', res.message)
  } catch (err) {
    emit('error', err.response?.data?.message || 'Không tìm thấy email')
  } finally {
    loading.value = false
  }
}
</script>
