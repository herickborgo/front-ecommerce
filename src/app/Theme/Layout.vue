<template lang="pug">
  #layout
    v-toolbar(v-if="showToolbar")
      v-toolbar-title VINTAGE
      v-spacer
      v-icon.black--text(large) account_circle
      v-btn(flat @click="logout()") Sign Out | Sign In
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
      location.reload()
      return this
        .$router
        .replace('/login')
    }
  },
  watch: {
    '$theme.toolbar': {
      handler (value) {
        this.showToolbar = value.visible
      }
    },
    deep: true
  }
}
</script>
