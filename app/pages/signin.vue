<template>
  <div>
    <div class="columns">
      <div class="column" style="text-align:center">
        Sign in / Sign up<br><br>
        <a v-if="!hasToken" class="button is-blue is-large" :href="apiUrl+'/connect/facebook'">
          <img src="/i/facebook.svg" style="height:1em">
          &nbsp;&nbsp; Facebook connect</a>
        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        loading: false,
        apiUrl: process.env.apiUrl,
        hasToken: false
      }
    },
    mounted() {
      let access_token = this.$route.query.access_token
      axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/auth/facebook/callback?access_token='+access_token)
      .then((res) => {
        this.hasToken = true;
        this.setUser({jwt: res.data.jwt})
        window.location.href = '/links'
      })
    },
    methods: {
      ...mapMutations({
        setUser: 'auth/setUser',
        setJwt: 'auth/setJwt',
      })
    }
  }
</script>