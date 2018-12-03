<template lang="pug">
  #csvDialog
    v-dialog(
      v-model="dialog"
      persistent
      max-width="240px"
      )
      v-card
        v-card-text
          v-container(fluid)
            v-layout(row wrap align-center justify-center fill-height)
              v-flex(xs12)
                file-upload(
                  name="image"
                  id="image"
                  :model.sync="file"
                  :buttonTitle="'Upload CSV'"
                  :isBase64="false"
                  typeAccept="text/csv"
                  @update-file="setFile($event)"
                  )
              v-flex(xs12)
                h2.grey--text {{ file.name }}
        v-card-actions
          v-container(grid-list-md)
            v-layout(row wrap align-center justify-center fill-height)
              v-flex(xs6)
                v-btn(@click="dialog = false") Cancel
              v-flex(xs6)
                v-btn.primary(@click="upload()") Upload
            v-layout(row wrap align-center justify-center fill-height)
              v-flex(xs12)
                v-btn(
                  dark
                  small
                  block
                  color="primary"
                  @click="sync()"
                ) Sync
</template>

<script>
import FileUpload from '@/app/Arch/FileUpload'

export default {
  props: {
    modal: {
      type: Boolean,
      required: true
    }
  },
  components: {
    FileUpload
  },
  data: () => ({
    file: {}
  }),
  computed: {
    dialog: {
      get () {
        return this.modal
      },
      set (value) {
        this.$emit('set-modal', value)
      }
    }
  },
  methods: {
    setFile (event) {
      this.file = event
    },
    upload () {
      this.$emit('upload-csv', this.file)
      this.file = {}
    },
    sync () {
      this.$emit('sync-csv')
    }
  }
}
</script>

<style lang="css">
</style>
