<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <p v-if="message" class="mt-4 text-gray-600">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Đang tải dữ liệu...'
    }
  }
}
</script>