const load = require('load-script')

module.exports = {
  install: function (Vue, options) {
    if (!options.key || options.key.length == 0) {
      console.warn('Please enter a Zendesk Web Widget Key')
      return
    }

    window.zESettings = options.settings

    const source = `https://static.zdassets.com/ekr/snippet.js?key=${options.key}`
    load(source, {
      attrs: {
        id: 'ze-snippet'
      }
    }, (error) => {
      if (error) {
        console.warn('Failed to loaded Zendesk Web Widget')
        return
      }
    })

    Object.defineProperty(Vue, '$zendesk', {
      get () { return window.zE }
    })
    Object.defineProperty(Vue.prototype, '$zendesk', {
      get () { return window.zE }
    })
  }
};
