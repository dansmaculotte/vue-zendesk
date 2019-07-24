<template>
  <div>
    <h1>Works !</h1>
    <button @click="load">Load</button>
    <button @click="toggle">Toggle</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: true
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
    }
  }
}
</script>
