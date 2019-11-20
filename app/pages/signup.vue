<template>
  <div>
    signup
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: '',
      username: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit() {

    },
    ...mapMutations({
      setUser: 'auth/setUser'
    })
  }
}
</script>