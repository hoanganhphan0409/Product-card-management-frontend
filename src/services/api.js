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

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth APIs
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password })
    return response.data
  },
  
  async register(fullName, email, password) {
    const response = await apiClient.post('/auth/register', { fullName, email, password })
    return response.data
  },
  
  async forgotPassword(email) {
    const response = await apiClient.post('/auth/forgot-password', { email })
    return response.data
  },

  // Product Card APIs
  async getAllProductCards(search = '', category = '') {
    const response = await apiClient.get('/product-cards', {
      params: { search, category: category === 'all' ? '' : category }
    })
    return response.data
  },
  
  async getProductCardById(id) {
    const response = await apiClient.get(`/product-cards/${id}`)
    return response.data
  },
  
  async createProductCard(data) {
    const response = await apiClient.post('/product-cards', data)
    return response.data
  },
  
  async updateProductCard(id, data) {
    const response = await apiClient.put(`/product-cards/${id}`, data)
    return response.data
  },
  
  async deleteProductCard(id) {
    const response = await apiClient.delete(`/product-cards/${id}`)
    return response.data
  },
  
  async getCategories() {
    const response = await apiClient.get('/product-cards/categories')
    return response.data
  }
}