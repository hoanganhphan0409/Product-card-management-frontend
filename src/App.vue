<template>
  <div id="app">
    <LoginPage v-if="!isLoggedIn" @login="handleLogin" />
    <Dashboard v-else @logout="handleLogout" />
  </div>
</template>

<script>
import { ref } from 'vue'
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

    const handleLogin = () => {
      isLoggedIn.value = true
    }

    const handleLogout = () => {
      isLoggedIn.value = false
    }

    return {
      isLoggedIn,
      handleLogin,
      handleLogout
    }
  }
}
</script>