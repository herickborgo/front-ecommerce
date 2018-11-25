<template lang="pug">
  main.login
    .login__card
      .display-3 VINTAGE
      .white
        v-alert.ma-0(error :value="error") {{ errorText }}
        form#form-login(@submit.prevent="login()")
          v-card-text
            v-text-field(
              hide-details
              label="E-mail"
              required
              type="text"
              v-model="payload.email"
            )
            v-text-field.mb-4(
              hide-details
              label="Senha"
              ref="password"
              required
              type="password"
              v-model="payload.password"
            )
            v-layout(row wrap)
              v-flex(xs12)
                v-btn(
                  dark
                  small
                  block
                  type="submit"
                  color="primary"
                ) Sign In
</template>

<script>
import LoginService from '@/services/LoginService'

export default {
  data: () => ({
    LoginService,
    error: false,
    errorText: '',
    payload: {
      email: '',
      password: ''
    }
  }),
  methods: {
    login () {
      this.error = false
      LoginService
        .facade()
        .login(this.payload)
        .then(({ data }) => {
          const { token } = data
          const rollbackUri = localStorage.getItem('rollback-uri')
          LoginService.setToken(token)
          this
            .$router
            .replace(rollbackUri || '/')
        }, ({ response }) => {
          console.log('asd')
          const { data } = response
          const keys = Object.keys(data.errors)
          keys.forEach((key) => {
            data.errors[key].forEach((error) => {
              this.errorText = error
            })
          })
          this.error = true
        })
    }
  }
}
</script>

<style lang="stylus">
.login
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  text-align center
  display flex
  flex-direction row
  align-items center
  justify-content center

  .login__card
    position relative
    width 400px
    z-index 2

    @media (max-width: 599px)
      padding 8px
      width 100%

  .login__logo
    padding 0 0 20px
    text-align center

    img
      display inline-block
      height 50px
</style>
