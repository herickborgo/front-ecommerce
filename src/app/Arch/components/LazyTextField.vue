<template lang="pug">
  v-text-field(
    single-line
    :label="label"
    :append-icon="icon"
    v-model="search"
    :mask="mask"
    :return-masked-value="ReturnMaskedValue"
    :type="type"
    :error="error"
    :rules="rules"
    :required="required"
    :hint="hint"
  )
</template>

<script>
export default {
  props: {
    searchTerm: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default: 'Search'
    },
    icon: {
      type: String,
      default: 'search'
    },
    mask: {
      type: String,
      default: ''
    },
    ReturnMaskedValue: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    rules: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    hint: String
  },
  data: () => ({
    timeoutId: 0
  }),
  computed: {
    search: {
      get () {
        return this.searchTerm
      },
      set (value) {
        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => this.$emit('update:searchTerm', value), 500)
      }
    }
  }
}
</script>
