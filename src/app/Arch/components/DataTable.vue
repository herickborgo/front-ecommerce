<template lang="pug">
  #dataTable
    v-data-table.elevation-2.mt-1.table-nowrap(
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :loading="loading"
      no-data-text="No records found"
      no-results-text="No results found"
      hide-actions
      )
      template(slot="items" slot-scope="props")
        tr
          slot(
            name="table-rows"
            :item="props.item"
            )
    .text-xs-center.py-3
      v-pagination(
        v-model="currentPage"
        :length="totalPages"
        )
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      require: true
    },
    pages: {
      type: Number,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    pagination: {
      descending: false,
      rowsPerPage: 10
    }
  }),
  computed: {
    currentPage: {
      get () {
        const { page } = this
        return page
      },
      set (value) {
        this.$emit('update-pagination', value)
      }
    },
    totalPages () {
      const { pages } = this
      return pages
    }
  }
}
</script>

<style lang="css">
</style>
