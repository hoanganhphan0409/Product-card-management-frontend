<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-800">{{ product.name }}</h2>
          <button
            @click="$emit('close')"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-64 object-cover rounded-lg mb-4"
        />
        
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Danh mục</p>
            <p class="text-lg font-semibold">{{ product.category }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Giá</p>
            <p class="text-lg font-semibold text-blue-600">${{ product.price }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Số lượng kho</p>
            <p class="text-lg font-semibold">{{ product.stock }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Trạng thái</p>
            <p class="text-lg font-semibold text-green-600">
              {{ product.stock > 0 ? 'Còn hàng' : 'Hết hàng' }}
            </p>
          </div>
        </div>

        <div class="border-t pt-4">
          <h3 class="text-lg font-semibold mb-3">Mô tả chi tiết</h3>
          <div 
            class="text-gray-700 prose max-w-none"
            v-html="decodeHtml(product.description || 'Chưa có mô tả')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    decodeHtml(html) {
      const txt = document.createElement('textarea')
      txt.innerHTML = html
      return txt.value
    }
  }
}
</script>