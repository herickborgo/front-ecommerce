<template lang="pug">
  #layout
    v-toolbar
      v-toolbar-title VINTAGE
      v-spacer
      v-icon.black--text(large) account_circle
      v-btn(flat @click="logout()") Sign Out | Sign In
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
    },
    goToLogin () {
      location.reload()
      return this
        .$router
        .replace('/login')
    }
  }
}
</script>
