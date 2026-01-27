import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // Auth APIs
  login(email, password) {
    return apiClient.post('/auth/login', { email, password })
  },
  register(fullName, email, password) {
    return apiClient.post('/auth/register', { fullName, email, password })
  },
  forgotPassword(email) {
    return apiClient.post('/auth/forgot-password', { email })
  },

  // Product Card APIs
  getAllProductCards(search, category) {
    return apiClient.get('/product-cards', {
      params: { search, category }
    })
  },
  getProductCardById(id) {
    return apiClient.get(`/product-cards/${id}`)
  },
  createProductCard(data) {
    return apiClient.post('/product-cards', data)
  },
  updateProductCard(id, data) {
    return apiClient.put(`/product-cards/${id}`, data)
  },
  deleteProductCard(id) {
    return apiClient.delete(`/product-cards/${id}`)
  },
  getCategories() {
    return apiClient.get('/product-cards/categories')
  }
}