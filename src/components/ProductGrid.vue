<template>
  <div>
    <div v-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @view="$emit('view-product', product)"
        @edit="$emit('edit-product', product)"
        @delete="$emit('delete-product', product.id)"
      />
    </div>
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="mt-4 text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['view-product', 'edit-product', 'delete-product']
}
</script>