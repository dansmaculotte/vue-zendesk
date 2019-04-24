<template>
  <div>
    <h1>Works !</h1>
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
    toggle() {
      if (this.status) {
        this.$zendesk('webWidget', 'hide')
      } else {
        this.$zendesk('webWidget', 'show')
      }

      this.status = !this.status
    }
  }
}
</script>
