<template>
  <div>
    <div class="columns is-mobile is-centered">
      <div class="column is-11-mobile is-8-tablet" style="text-align:center">
        <h1><strong>Our Blog</strong></h1>
        <br/><br/>
        <div v-for="art in articles" :key="art.id" style="text-align:left">
          <h2><nuxt-link :to="'/blog/'+art.slug">{{art.name}}</nuxt-link></h2>
          <p>{{art.content}}</p>
          <p><b-icon icon="calendar" style="color: #c0c0c0;vertical-align: middle"></b-icon> {{moment(art.date).format('DD MMM YYYY')}}</p>
          <hr>
        </div>
      </div>
    </div>
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
        query: '',
        date: new Date(),
        articles: this.$store.getters['articles/list']
      }
    },
    computed: {
      moment() {
        return moment;
      },
    },
    methods: {

    },
    async asyncData({ store, $axios }) {
      store.commit('articles/emptyList')
      await $axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/articles?_sort=date:DESC')
      .then((res) => {
        if(res.data) {
          res.data.forEach(article => {
            article.content = article.content.substring(0, 190)+'...'
            store.commit('articles/add', article)
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
