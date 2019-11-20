<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Thanks!</p>
      </header>
      <div class="card-content">
        Thank you for upgrading to <span class="tag is-primary">PRO</span> !<br>
        We promise we won't let you down.<br><br>
        <button class="button is-loading"> &nbsp; </button> Returning to your account..
        <!--<nuxt-link to="/links"><strong>Return to your account</strong></nuxt-link>-->
      </div>
    </div>
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
    mounted() {
      setTimeout(function(){
        window.location.href = '/links'
      }, 2500);
    },
    methods: {
    }
  }
</script>

<style>

</style>
