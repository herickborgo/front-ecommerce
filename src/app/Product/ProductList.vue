<template lang="pug">
  card-default
    v-toolbar.elevation-1.py-2(color="grey lighten-4")
      v-toolbar-title Products
      v-spacer
    v-card-text
      v-card-title
        .title
          v-flex(xs12 md3)
            v-btn(
              color="primary"
              slot="activator"
              @click="goToForm()"
              ) Add Product
          v-flex(xs12 sm6)
            lazy-text-field(:search-term.sync="searchTerm")
      v-data-table.elevation-2.mt-1.table-nowrap(
        no-data-text="No records found"
        no-results-text="No results found"
        :headers="headers"
        :items="items"
        hide-actions
        :pagination.sync="pagination"
        :loading="loading"
        )
        template(slot="items" slot-scope="props")
          tr
            td.text-xs-left {{ props.item.name }}
            td.text-xs-left {{ props.item.category_name }}
            td.text-xs-left ${{ props.item.price }}
            td.text-xs-left.cursor-pointer
              v-tooltip(top)
                v-btn.ma-0(
                  icon
                  flat
                  dark
                  color="grey darken-3"
                  small
                  slot="activator"
                  @click="editRow(props.item.id)"
                  )
                  v-icon.grey--text.text--darken-2 edit
                span Edit
              v-tooltip(top)
                v-btn(
                  icon
                  flat
                  dark
                  color="grey darken-3"
                  small
                  slot="activator"
                  @click="deleteRow(props.item.id)"
                  )
                  v-icon.grey--text.text--darken-2 delete
                span Delete
    .text-xs-center.py-3
      v-pagination(
        v-model="currentPage"
        :length="pages"
        )
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import FileUpload from '@/app/Arch/FileUpload'
import LazyTextField from '@/app/Arch/components/LazyTextField'
import ProductService from '@/services/ProductService'
import notification from '@/mixins/notification'

export default {
  name: 'product-list',
  components: {
    CardDefault,
    LazyTextField,
    FileUpload
  },
  mixins: [
    notification
  ],
  data: () => ({
    currentPage: 1,
    searchTerm: '',
    pagination: {
      rowsPerPage: 10,
      totalItems: null
    },
    metadata: {},
    items: [],
    headers: [
      { text: 'Name', value: 'name', align: 'left', width: '20%', sortable: false },
      { text: 'Category', value: 'category_name', align: 'left', width: '20%', sortable: false },
      { text: 'Price', value: 'price', align: 'left', width: '20%', sortable: false },
      { text: 'Actions', value: 'actions', align: 'left', width: '20%', sortable: false }
    ],
    uri: 'products',
    uriImage: 'http://localhost:8081/products',
    loading: true
  }),
  computed: {
    pages () {
      let { rowsPerPage, totalItems } = this.pagination
      if (rowsPerPage == null || totalItems == null) {
        return 0
      }
      return Math.ceil(totalItems / rowsPerPage)
    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts (page, search) {
      ProductService
        .facade()
        .index(page, search)
        .then(({ data }) => {
          this.items = data.data
          this.currentPage = data.current_page
          this.pagination.totalItems = data.total
          this.loading = false
        })
      // console.log(this.items)
    },
    editRow (id) {
      this
        .$router
        .push(`${this.uri}/edit/${id}`)
    },
    deleteRow (id) {
      const options = {
        title: 'Warning !!!',
        text: 'Are you sure you want to delete this product ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'primary',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }

      this
        .$swal(options)
        .then((result) => {
          if (result.value) {
            this.deleteProduct(id)
          }
        })
    },
    deleteProduct (id) {
      ProductService
        .facade()
        .destroy(id)
        .then(() => {
          this.getProducts()
          this.messageSuccess('Product successfully deleted')
        })
    },
    goToForm () {
      this
        .$router
        .push(`${this.uri}/new`)
    },
    returnPhoto (image) {
      if (image) {
        return `${this.uriImage}/${image}`
      }
      return ''
    }
  },
  watch: {
    currentPage: {
      handler (value) {
        this.getProducts(value)
      }
    },
    searchTerm: {
      handler (value) {
        this.getProducts(this.currentPage, value)
      }
    },
    items: {
      handler (value) {
        console.log(value)
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
.title
  display flex
  justify-content space-between
  width 100%
  flex-wrap wrap
.table-nowrap
  white-space nowrap
</style>
