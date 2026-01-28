<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex gap-4">
        <button
          @click="$emit('confirm')"
          class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          {{ confirmText }}
        </button>
        <button
          @click="$emit('cancel')"
          class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          {{ cancelText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    title: {
      type: String,
      default: 'Xác nhận'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Xác nhận'
    },
    cancelText: {
      type: String,
      default: 'Hủy'
    }
  },
  emits: ['confirm', 'cancel']
}
</script>
