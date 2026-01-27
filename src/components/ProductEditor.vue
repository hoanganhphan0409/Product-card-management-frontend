<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 class="text-2xl font-bold mb-6">
        {{ product ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới' }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tên sản phẩm</label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
              <input
                v-model="formData.category"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập danh mục"
                required
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Giá</label>
              <input
                v-model.number="formData.price"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập giá"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
              <input
                v-model.number="formData.stock"
                type="number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số lượng"
                required
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hình ảnh sản phẩm</label>
            <div class="flex items-start gap-4">
              <div class="flex-1">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition text-gray-600 hover:text-blue-500"
                >
                  {{ imagePreview ? 'Thay đổi hình ảnh' : 'Chọn hình ảnh' }}
                </button>
              </div>
              <div v-if="imagePreview" class="w-32 h-32 border rounded-lg overflow-hidden">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mô tả chi tiết sản phẩm
            </label>
            <div class="border border-gray-300 rounded-lg overflow-hidden">
              <textarea
                ref="editor"
                v-model="formData.description"
                class="w-full p-4 min-h-[300px]"
                placeholder="Nhập mô tả chi tiết sản phẩm..."
              ></textarea>
            </div>
          </div>
        </div>
        <div class="flex gap-4 mt-6">
          <button
            type="submit"
            class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {{ product ? 'Cập nhật' : 'Thêm mới' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue'

export default {
  name: 'ProductEditor',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const formData = reactive({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      image: '',
      description: ''
    })

    const imagePreview = ref(null)
    const editor = ref(null)
    let ckEditorInstance = null

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          imagePreview.value = reader.result
          formData.image = reader.result
        }
        reader.readAsDataURL(file)
      }
    }

    const handleSubmit = () => {
      if (ckEditorInstance) {
        formData.description = ckEditorInstance.getData()
      }
      
      const productData = {
        ...formData,
        id: props.product?.id
      }
      
      emit('save', productData)
    }

    onMounted(() => {
      if (props.product) {
        Object.assign(formData, props.product)
        imagePreview.value = props.product.image
      }

      if (window.CKEDITOR && editor.value) {
        ckEditorInstance = window.CKEDITOR.replace(editor.value, {
          height: 300,
          toolbar: [
            { name: 'document', items: ['Source'] },
            { name: 'clipboard', items: ['Undo', 'Redo'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList'] },
            { name: 'insert', items: ['Link', 'Image', 'Table'] },
            { name: 'styles', items: ['Format', 'Font', 'FontSize'] }
          ]
        })
        
        if (formData.description) {
          ckEditorInstance.setData(formData.description)
        }
      }
    })

    return {
      formData,
      imagePreview,
      editor,
      handleImageUpload,
      handleSubmit
    }
  }
}
</script>
