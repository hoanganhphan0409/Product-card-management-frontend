<template>
  <div class="form-group">
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :minlength="minlength"
      :class="[
        'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        error ? 'border-red-500' : 'border-gray-300'
      ]"
    />
    <p v-if="hint && !error" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
    <p v-if="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    modelValue: [String, Number],
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
    minlength: [String, Number],
    error: String,
    hint: String
  },
  emits: ['update:modelValue']
}
</script>