import miniToastr from 'mini-toastr'

export default {
  created () {
    miniToastr.init()
  },
  methods: {
    messageSuccess (message) {
      miniToastr.success(message, 'Success!')
    },
    messageError (message) {
      miniToastr.error(message, 'Error!')
    },
    messageWarning (message) {
      miniToastr.warning(message, 'Warning!')
    },
    messageInfo (message) {
      miniToastr.info(message, 'Info!')
    },
    messageBodyErrors (error) {
      const keys = Object.keys(error)
      keys.forEach((key) => {
        const errorArray = error[key]
        miniToastr.error(errorArray, 'Erro!')
      })
    }

  }
}
