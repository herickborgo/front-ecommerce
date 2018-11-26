<template lang="pug">
  card-default
    v-toolbar.elevation-1.py-2
      v-btn(icon
        @click="goToBack()"
      )
        v-icon keyboard_backspace
      v-toolbar-title {{ title }}
      v-spacer
    v-divider
    v-card-text.pt-2.pb-2
      v-container(grid-list-md align-center justify-center)
        v-form(
          v-model="formValid"
          ref="form"
          lazy-validation
          )
          v-layout(row wrap)
            v-flex(
              xs12
              md3
              v-if="product.images"
              v-for="(image, key) in product.images"
              :key="key"
              )
              v-avatar(:size="200")
                v-img(
                  name="image"
                  id="image"
                  :src="image"
                )
          v-layout(column align-center justify-center v-if="!imagesExists")
            v-flex.mt-2(xs12)
              file-upload(
                name="image"
                id="image"
                :model.sync="product.images"
                :buttonTitle="'Add image'"
                :buttonIcon="'add_a_photo'"
                :multiple="true"
                :isBase64="true"
                )
          v-layout.mt-2(row)
            v-flex(xs12)
              v-text-field(
                name="name"
                label="Name"
                id="name"
                :rules="inputRules"
                v-model="product.name"
                required
                )
          v-layout(row wrap)
            v-flex(xs12 sm6)
              v-select(
                name="category_id"
                label="Categories"
                id="category_id"
                :items="categories"
                item-text="name"
                item-value="id"
                :rules="inputRules"
                v-model="product.category_id"
                required
                )
            v-flex(xs12 sm6)
              .v-input.v-text-field.v-input--is-label-active.v-input--is-dirty.theme--light.primary--text
                .v-input__control
                  .v-input__slot
                    .v-text-field__slot
                      label.v-label.v-label--active.theme--light.label_input Price
                      money(
                        v-model="product.price"
                        v-bind="money"
                        tabindex="0"
                        aria-label="Price"
                        type="text"
                      )
                  .v-text-field__details
                    .v-messages.theme--light
                      .v-messages__wrapper
                        .v-messages__message
          v-layout(row)
            v-flex(xs12)
              v-textarea(
                name="description"
                label="Description"
                id="description"
                :rules="inputRules"
                v-model="product.description"
                required
                )
        v-layout.mt-5(row)
          v-spacer
          v-btn(
            @click="goToBack()"
            ) Cancel
          v-btn(
            color="primary"
            @click="save()"
            ) Save
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import FileUpload from '@/app/Arch/FileUpload'
import ProductService from '@/services/ProductService'
import CategoryService from '@/services/CategoryService'
import miniToastr from 'mini-toastr'
import { Money } from 'v-money'

export default {
  name: 'product-form',
  components: {
    CardDefault,
    FileUpload,
    Money
  },
  data: () => ({
    title: 'New product',
    id: null,
    product: {
      images: []
    },
    inputRules: [
      (v) => !!v || 'Filling in this field is required.'
    ],
    formValid: false,
    categories: [],
    uriImage: 'http://localhost:8081/',
    money: {
      decimal: ',',
      thousands: '.',
      prefix: '$ ',
      suffix: '',
      precision: 2,
      masked: false
    },
    imagesExists: false
  }),
  computed: {
    verifyIdExist () {
      return !!this.id
    },
    isValidForm () {
      return this
        .$refs
        .form
        .validate()
    }
    // insertImage () {
    //   const { images } = this.product
    //   return images.length === 0
    // }
  },
  created () {
    const { id: idParams } = this.$route.params
    this.id = idParams

    if (this.id) {
      this.getProductId()
    }

    this.getCategories()
    miniToastr.init()
  },
  methods: {
    getCategories () {
      CategoryService
        .facade()
        .getAll()
        .then(({ data }) => {
          this.categories = data
        })
    },
    getProductId () {
      ProductService
        .facade()
        .show(this.id)
        .then(({ data }) => {
          const { images } = data
          if (images.length > 0) {
            this.imagesExists = true
          }
          let imagesProduct = []
          this.product = data

          images.map((productImage) => {
            const { path } = productImage.image
            imagesProduct.push(`${this.uriImage}${path}`)
          })
          this.product.images = imagesProduct
          this.title = `Editar ${data.name}`
        })
    },
    save () {
      if (!this.isValidForm) {
        return
      }

      if (this.verifyIdExist) {
        if (this.imagesExists) {
          this.product.images = []
        }
        return this.update()
      }

      return this.store()
    },
    store () {
      ProductService
        .facade()
        .store(this.product)
        .then(({ body }) => {
          this.successfullRequest('Product created successfully')
        }, () => {
          if (!this.product.images) {
            return miniToastr.error('Required image', 'Error!!')
          }
          miniToastr.error('error', 'Error!!')
        })
    },
    update () {
      ProductService
        .facade()
        .update(this.id, this.product)
        .then(({ body }) => {
          this.successfullRequest('Product successfully edited')
        })
        .catch((response) => {
          miniToastr.error('Required fields', 'Error!!')
        })
    },
    successfullRequest (message) {
      miniToastr.success(message, 'Success!')
      this.goToBack()
    },
    goToBack () {
      this
        .$router
        .back()
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
