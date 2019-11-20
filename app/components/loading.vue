<template>
    <b-loading v-if="loading" :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>