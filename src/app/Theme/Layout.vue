<template lang="pug">
  #layout
    v-toolbar(v-if="showToolbar")
      v-toolbar-title VINTAGE
      v-spacer
      v-icon.black--text(large) account_circle
      v-btn(flat @click="logout()") Sign Out
</template>

<script>
import LoginService from '@/services/LoginService'
export default {
  data: () => ({
    LoginService,
    showToolbar: true
  }),
  methods: {
    logout () {
      LoginService.logout()
      this.goToLogin()
    },
    goToLogin () {
      return this
        .$router
        .push('/login')
    }
  }
}
</script>
