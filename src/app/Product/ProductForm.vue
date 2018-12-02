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
              v-card(
                raised
                max-width="200px"
                max-height="200px"
                )
                v-img(
                  name="image"
                  id="image"
                  :src="image.image_url"
                  height="150px"
                )
                v-card-actions
                  v-spacer
                  v-btn(flat @click="removeImage(key)")
                    v-icon delete
          v-layout(column align-center justify-center)
            v-flex.mt-2(xs12)
              file-upload(
                name="image"
                id="image"
                :model.sync="product.images"
                :buttonTitle="'Add image'"
                :buttonIcon="'add_a_photo'"
                :multiple="true"
                :isBase64="true"
                @update-file="setProductImages($event)"
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
              currency-input(
                :field="product.price"
                label="Price"
                @set-currency="setProductPrice($event)"
                )
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
import CurrencyInput from '@/app/Arch/components/CurrencyInput'

export default {
  name: 'product-form',
  components: {
    CardDefault,
    FileUpload,
    CurrencyInput
  },
  data: () => ({
    title: 'New product',
    id: null,
    product: {
      images: [],
      price: 0
    },
    inputRules: [
      (v) => !!v || 'Filling in this field is required.'
    ],
    formValid: false,
    categories: [],
    uriImage: 'http://localhost:8081/'
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
          let imagesProduct = []
          this.product = data

          images.map((productImage) => {
            const { image } = productImage
            imagesProduct.push(image)
          })
          this
            .product
            .images = imagesProduct
          this.title = `Editar ${data.name}`
        })
    },
    setProductImages (event) {
      this
        .product
        .images
        .push({ image_url: event })
    },
    setProductPrice (event) {
      this
        .product
        .price = event
    },
    removeImage (index) {
      this
        .product
        .images
        .splice(index, 1)
    },
    save () {
      if (!this.isValidForm) {
        return
      }

      const { verifyIdExist } = this
      return verifyIdExist ? this.update() : this.store()
    },
    store () {
      ProductService
        .facade()
        .store(this.product)
        .then(({ body }) => {
          this.successfullRequest('Product created successfully')
          this
            .$router
            .replace('/products')
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
          this
            .$router
            .replace('/products')
        })
        .catch((response) => {
          miniToastr.error('Required fields', 'Error!!')
        })
    },
    successfullRequest (message) {
      miniToastr.success(message, 'Success!')
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
