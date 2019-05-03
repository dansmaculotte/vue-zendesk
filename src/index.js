module.exports = {
  install: function (Vue, options) {
    if (!options.key || options.key.length === 0) {
      console.warn('Please enter a Zendesk Web Widget Key')
      return
    }

    const zE = window.zE = window.zE || []

    window.zESettings = options.settings

    zE.load = (key) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.id = 'ze-snippet'
      script.src = 'https://static.zdassets.com/ekr/snippet.js?key=' + key

      const first = document.getElementsByTagName('script')[0]
      first.parentNode.insertBefore(script, first)
    }

    if (!options.disabled) {
      zE.load(options.key)
    }

    Object.defineProperty(Vue, '$zendesk', {
      get () { return window.zE }
    })
    Object.defineProperty(Vue.prototype, '$zendesk', {
      get () { return window.zE }
    })
  }
};
