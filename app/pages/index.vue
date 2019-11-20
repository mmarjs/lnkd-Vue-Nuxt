<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{block.content.header}}
          </h1>
          <h2 class="subtitle">
            {{block.content.subheader}}
          </h2>
        </div>
      </div>
    </section>
    <br><br>
    <div class="columns is-multiline is-mobile is-centered" style="text-align:center">
      <div class="column is-6-mobile is-4-tablet">
        <img src="images/triple-arrows.svg" alt="" width="118">
        <h2 class="title">{{block.content.features[0].title}}</h2>
        <p>{{block.content.features[0].desc}}</p>
      </div>
      <div class="column is-6-mobile is-4-tablet">
        <img src="images/plug.svg" alt="" width="118">
        <h2 class="title">{{block.content.features[1].title}}</h2>
        <p>{{block.content.features[1].desc}}</p>
      </div>
      <div class="column is-12-mobile is-4-tablet">
        <img src="images/chart.svg" alt="" width="118">
        <h2 class="title">{{block.content.features[2].title}}</h2>
        <p>{{block.content.features[2].desc}}</p>
      </div>

      <div class="column is-12-mobile is-6-tablet" style="padding-top:3rem">
        <a class="button is-primary is-large" :href="apiUrl+'/connect/facebook'">Get Started Now</a>
      </div>

      <br>
      <br>
      <p>&nbsp;</p>
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              Still not convinced?
            </h1>
            <h2 class="subtitle">
              No worries, feel free to <a href="/info"><strong style="color:#7957d5">read more</strong></a>, or just <a href="/contact"><strong style="color:#7957d5">contact us</strong></a> if you have any questions.
            </h2>
          </div>
        </div>
      </section>

    </div>


  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      query: '',
      text: '',
      apiUrl: process.env.apiUrl,
      block: this.$store.getters['blocks/list'].find(function(element) { return element['name'] == 'homepage'; })
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user']
    },
  },
  methods: {
    ...mapMutations({
      setUser: 'auth/setUser'
    })
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
<style>
  .hero.is-primary {
    background-color: #77f9f1;
    text-align: center;
  }
  .hero.is-primary h1, .hero.is-primary h2 {

    color: #333!important;
  }
.hero {
  background-color: skyblue;
  margin-top: 40px;
  margin-bottom: 50px;
  
  -webkit-transform: skewY(2deg);
  -moz-transform: skewY(2deg);
  -ms-transform: skewY(2deg);
  -o-transform: skewY(2deg);
  transform: skewY(2deg);
}

.hero > .hero-body {
  -webkit-transform: skewY(-2deg);
  -moz-transform: skewY(-2deg);
  -ms-transform: skewY(-2deg);
  -o-transform: skewY(-2deg);
  transform: skewY(-2deg);
}
</style>