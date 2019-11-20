<template>
  <div>
    <b-collapse class="card" v-for="(info, index) in block.content.questions" :key="info.q" :open="index == 0 ? true : false" style="margin-bottom:2em">
      <div slot="trigger" class="card-header" role="button">
        <p class="card-header-title" style="background:#fff">
          {{info.q}}
        </p>
      </div>
      <div class="card-content">
        <div class="content">
          {{info.a}}
        </div>
      </div>
    </b-collapse>


  </div>


</template>
<script>
  import axios from 'axios'
  import moment from 'moment-timezone'
  import { mapMutations } from 'vuex'

  export default {
    components: {
    },
    data() {
      return {
        slug: this.$route.params.slug,
        block: this.$store.getters['blocks/list'].find(function(element) { return element['name'] == 'info'; })
      }
    },
    computed: {
      moment() {
        return moment;
      },
    },
    methods: {

    },
    async asyncData({ store, $axios, params }) {
      store.commit('blocks/emptyList')
      let config = {};
      await $axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/blocks', config)
      .then((res) => {
        if(res.data) {
          res.data.forEach(block => {
            store.commit('blocks/add', block)
          });
        }
      })
      .catch((err) =>{
        console.log('error')
      })


    }
  }
</script>
