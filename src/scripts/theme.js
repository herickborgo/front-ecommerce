var vueTheme = {}
var defaultValues = {
  toolbar: {
    visible: true
  }
}

vueTheme.install = function (Vue, options) {
  Vue.prototype.$theme = defaultValues

  Vue.prototype.$theme.get = function (property) {
    return property.split('.').reduce(function (key, subkey) {
      return key[subkey]
    }, defaultValues)
  }

  Vue.prototype.$theme.toggle = function (property) {
    defaultValues[property] = !defaultValues[property]
  }
}

module.exports = vueTheme
