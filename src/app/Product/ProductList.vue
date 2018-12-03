<template lang="pug">
  card-default
    v-toolbar.elevation-1(color="grey lighten-4")
      v-toolbar-title Products
      v-spacer
    v-card-text
      .title
        v-flex(xs12 md6)
          v-btn.ml-0(
            color="primary"
            slot="activator"
            @click="goToForm()"
            ) Add Product
          v-btn.ml-0(
            color="primary"
            slot="activator"
            @click="importProduct()"
            ) Import Product
        v-flex(xs12 sm6)
          lazy-text-field(:search-term.sync="pagination.search")
      data-table(
        :headers="headers"
        :items="items"
        :page="pagination.page"
        :pages="pages"
        :loading="loading"
        @update-pagination="setPage($event)"
        )
        template(slot="table-rows" slot-scope="items")
          td.text-xs-left {{ items.item.name }}
          td.text-xs-left {{ items.item.category_name }}
          td.text-xs-left ${{ items.item.price }}
          td.text-xs-left.cursor-pointer
            v-tooltip(top)
              v-btn.ma-0(
                icon
                flat
                dark
                color="grey darken-3"
                small
                slot="activator"
                @click="editRow(items.item.id)"
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
                @click="deleteRow(items.item.id)"
                )
                v-icon.grey--text.text--darken-2 delete
              span Delete
    CSVDialog(
      :modal="modal"
      @set-modal="setModal($event)"
      @upload-csv="uploadCSV($event)"
      )
</template>

<script>
import CardDefault from '@/app/Arch/components/CardDefault'
import LazyTextField from '@/app/Arch/components/LazyTextField'
import DataTable from '@/app/Arch/components/DataTable'
import ProductService from '@/services/ProductService'
import notification from '@/mixins/notification'
import CSVDialog from '@/app/CSV/CSVDialog'

export default {
  name: 'product-list',
  components: {
    CardDefault,
    LazyTextField,
    DataTable,
    CSVDialog
  },
  mixins: [
    notification
  ],
  data: () => ({
    items: [],
    headers: [
      { text: 'Name', value: 'name', align: 'left', width: '20%', sortable: false },
      { text: 'Category', value: 'category_name', align: 'left', width: '20%', sortable: false },
      { text: 'Price', value: 'price', align: 'left', width: '20%', sortable: false },
      { text: 'Actions', value: 'actions', align: 'left', width: '20%', sortable: false }
    ],
    uri: 'products',
    loading: true,
    pages: 1,
    pagination: {
      page: 1,
      search: '',
      perPage: 10
    },
    modal: false,
  }),
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      const { search, page, perPage } = this.pagination
      const params = {
        page,
        per_page: perPage,
        search
      }
      ProductService
        .facade()
        .index(params)
        .then(({ data }) => {
          this.items = data.data
          this.pages = data.last_page
          this.loading = false
        })
    },
    setPage (event) {
      this.pagination.page = event
    },
    editRow (id) {
      this
        .$router
        .replace(`${this.uri}/edit/${id}`)
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
        .replace(`${this.uri}/new`)
    },
    importProduct () {
      this.modal = true
    },
    setModal (event) {
      this.modal = event
    },
    uploadCSV (event) {
      ProductService
        .facade()
        .uploadCSV(event)
        .then(() => {
          this.modal = false
          this.messageSuccess('Product successfully imported')
          window.location.refresh()
        }, ({ response }) => {
          const { data } = response
          this.messageBodyErrors(data.errors)
        })
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getProducts()
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
