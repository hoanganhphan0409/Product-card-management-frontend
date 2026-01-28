<template>
  <div 
    :class="[
      'mb-4 p-3 rounded-lg flex justify-between items-center',
      type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
    ]"
  >
    <span>{{ message }}</span>
    <button 
      @click="$emit('close')" 
      :class="type === 'error' ? 'text-red-700 hover:text-red-900' : 'text-green-700 hover:text-green-900'"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ['error', 'success'].includes(value)
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['close']
}
</script>