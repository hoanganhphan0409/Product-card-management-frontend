<template>
  <div id="app">
    <LoginPage v-if="!isLoggedIn" @login="handleLogin" />
    <Dashboard v-else @logout="handleLogout" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import LoginPage from './components/LoginPage.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'App',
  components: {
    LoginPage,
    Dashboard
  },
  setup() {
    const isLoggedIn = ref(false)
    
    onMounted(() => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (token && user) {
        isLoggedIn.value = true
      }
    })

    const handleLogin = (userData) => {
      isLoggedIn.value = true
    }

    const handleLogout = () => {
      isLoggedIn.value = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    return {
      isLoggedIn,
      handleLogin,
      handleLogout
    }
  }
}
</script>