<template>
  <div>
    <h1>Works !</h1>
    <button @click="load">Load</button>
    <button @click="toggle">Toggle</button>
    <button @click="show">Show</button>
    <button @click="hide">Hide</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: false
    }
  },
  methods: {
    load() {
      this.$zendesk.load(ZENDESK_KEY)
    },
    toggle() {
      if (this.status) {
        this.$zendesk.hide()
      } else {
        this.$zendesk.show()
      }

      this.status = !this.status
    },
    show() {
      this.$zendesk.show()
    },
    hide() {
      this.$zendesk.hide()
    }
  },
  created() {
    this.$zendesk.$on('loaded', () => {
      console.log('zendesk is loaded !')
    })
  }
}
</script>
