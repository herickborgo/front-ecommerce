<template lang="pug">
  #currencyInput
    .v-input.v-text-field.v-input--is-label-active.v-input--is-dirty.theme--light.primary--text
      .v-input__control
        .v-input__slot
          .v-text-field__slot
            label.v-label.v-label--active.theme--light.label_input {{ label }}
            money(
              v-model="model"
              v-bind="money"
              tabindex="0"
              :aria-label="label"
              type="text"
            )
        .v-text-field__details
          .v-messages.theme--light
            .v-messages__wrapper
              .v-messages__message
</template>

<script>
import { Money } from 'v-money'

export default {
  name: 'currency-input',
  props: {
    field: {
      type: Number,
      required: true
    },
    label: {
      type: String,
      default: 'Price'
    }
  },
  components: {
    Money
  },
  data: () => ({
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '$ ',
      suffix: '',
      precision: 2,
      masked: false
    }
  }),
  computed: {
    model: {
      get () {
        return this.field
      },
      set (value) {
        this.$emit('set-currency', value)
      }
    }
  }
}
</script>

<style lang="stylus">
  .label_input
    left 0px
    right auto
    position absolute
</style>
