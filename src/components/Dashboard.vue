<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">Quản lý Product Card</h1>
        <div class="flex items-center gap-4">
          <span class="text-gray-600">Xây dựng với: Spring Boot / Vue.js 3 / MS SQL</span>
          <button
            @click="$emit('logout')"
            class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="flex gap-4 flex-wrap">
          <div class="flex-1 min-w-[300px]">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div class="flex gap-2">
            <select
              v-model="filterCategory"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <button
              @click="openEditor()"
              class="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Thêm mới
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">Danh mục: {{ product.category }}</p>
            <div class="flex justify-between items-center mb-4">
              <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
              <span class="text-sm text-gray-600">Kho: {{ product.stock }}</span>
            </div>
            <div class="flex gap-2">
              <button
                @click="viewProduct(product)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Xem
              </button>
              <button
                @click="openEditor(product)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Sửa
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    </main>

    <ProductEditor
      v-if="showEditor"
      :product="editingProduct"
      @save="saveProduct"
      @close="closeEditor"
    />

    <ProductDetail
      v-if="showDetail"
      :product="selectedProduct"
      @close="closeDetail"
    />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import ProductEditor from './ProductEditor.vue'
import ProductDetail from './ProductDetail.vue'

export default {
  name: 'Dashboard',
  components: {
    ProductEditor,
    ProductDetail
  },
  emits: ['logout'],
  setup() {
    const products = ref([
      { 
        id: 1, 
        name: 'iPhone 15 Pro', 
        category: 'Electronics', 
        price: 999, 
        stock: 50, 
        image: 'https://via.placeholder.com/300',
        description: 'Smartphone cao cấp với chip A17 Pro mạnh mẽ, camera 48MP và thiết kế titan sang trọng. Sản phẩm có màn hình Super Retina XDR 6.1 inch.'
      },
      { 
        id: 2, 
        name: 'Samsung Galaxy S24', 
        category: 'Electronics', 
        price: 899, 
        stock: 30, 
        image: 'https://via.placeholder.com/300',
        description: 'Điện thoại Android flagship với AI tích hợp và camera zoom 100x.'
      },
      { 
        id: 3, 
        name: 'MacBook Air M2', 
        category: 'Computers', 
        price: 1299, 
        stock: 20, 
        image: 'https://via.placeholder.com/300',
        description: 'Laptop siêu mỏng nhẹ với chip M2 mạnh mẽ, pin 18 giờ.'
      },
    ])

    const searchTerm = ref('')
    const filterCategory = ref('all')
    const showEditor = ref(false)
    const showDetail = ref(false)
    const editingProduct = ref(null)
    const selectedProduct = ref(null)

    const categories = computed(() => {
      return [...new Set(products.value.map(p => p.category))]
    })

    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        const matchesCategory = filterCategory.value === 'all' || product.category === filterCategory.value
        return matchesSearch && matchesCategory
      })
    })

    const openEditor = (product = null) => {
      editingProduct.value = product
      showEditor.value = true
    }

    const closeEditor = () => {
      showEditor.value = false
      editingProduct.value = null
    }

    const saveProduct = (productData) => {
      if (productData.id) {
        const index = products.value.findIndex(p => p.id === productData.id)
        products.value[index] = productData
      } else {
        products.value.push({
          ...productData,
          id: products.value.length + 1
        })
      }
      closeEditor()
    }

    const deleteProduct = (id) => {
      if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        products.value = products.value.filter(p => p.id !== id)
      }
    }

    const viewProduct = (product) => {
      selectedProduct.value = product
      showDetail.value = true
    }

    const closeDetail = () => {
      showDetail.value = false
      selectedProduct.value = null
    }

    return {
      products,
      searchTerm,
      filterCategory,
      categories,
      filteredProducts,
      showEditor,
      showDetail,
      editingProduct,
      selectedProduct,
      openEditor,
      closeEditor,
      saveProduct,
      deleteProduct,
      viewProduct,
      closeDetail
    }
  }
}
</script>