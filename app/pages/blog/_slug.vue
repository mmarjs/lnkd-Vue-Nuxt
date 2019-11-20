<template>
  <div class="columns is-mobile is-centered">
    <div v-if="article" class="column is-12-mobile is-8-tablet article">
      <h2>{{article.name}}</h2>
      <p>{{moment(article.date).format('DD MMM YYYY')}}</p>
      <hr>
      <div v-html="article.html"></div>
    </div>
    <div v-else>not found</div>
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment-timezone'
  import showdown from 'showdown'
  import { mapMutations } from 'vuex'

  export default {
    components: {
    },
    data() {
      return {
        slug: this.$route.params.slug,
      }
    },
    computed: {
      article: {
        get() {
          return this.$store.getters['articles/list'][0]
        },
      },
      moment() {
        return moment;
      },
    },
    methods: {

    },
    async asyncData({ store, $axios, params }) {
      store.commit('articles/emptyList')
      let config = {
        params: {slug: params.slug}
      };
      await $axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/articles', config)
      .then((res) => {
        if(res.data) {
          let converter = new showdown.Converter();
          res.data.forEach(article => {
            let html = converter.makeHtml(article.content);
            store.commit('articles/add', {html: html, ...article})
          });
        }
      })
      .catch((err) =>{
        console.log('error')
      })


    }
  }
</script>

<style>
</style>
