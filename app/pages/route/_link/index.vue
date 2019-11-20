<template>
  <div>

  </div>
</template>
<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'
  export default {
    layout: 'none',
    data() {
      return {
      }
    },
    async mounted() {
      let link = this.$route.params.link
      let config = {
        params: {click: 1}
      };
      await axios.get(process.env.apiUrl+'/links/'+link, config)
      .then((res) => {
        if(res.data) {
          window.location = res.data.url;
        }
      })
      .catch((err) =>{
        console.log('error')
      })
    },
    methods: {

    }
  }
</script>

