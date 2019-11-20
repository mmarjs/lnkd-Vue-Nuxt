<template>
  <div class="container">
    <client-only>
      <!-- Facebook Pixel Code -->
      <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1888788144736780');
        fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=1888788144736780&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Facebook Pixel Code -->
    </client-only>
    <div v-if="$nuxt.isOnline">
      <Header/>
      <nuxt/>
      <client-only>
        <script>
          window.fcWidget.init({
            token: "f1560bd5-ab1a-4d4e-aa94-a57752c20bc1",
            host: "https://wchat.freshchat.com"
          });
        </script>
      </client-only>
    </div>
    <section class="hero is-primary" v-else>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            You are offline<br><br>
          </h1>
          <h2 class="subtitle">
            <a href="/" class="button is-rounded">Reload</a>
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  export default {
    components: {
      Header
    }
  }
</script>

<style>
  html {
    padding-top: 5rem!important;
  }
  body {
    padding-left: 1em;
    padding-right: 1em;
  }
  .container {
    padding-bottom:4em;
  }
  .hero-body .container {
    padding-bottom: 2em;
  }
  .navbar {
    margin-bottom: 2em;
  }
  .handle {
    cursor: move;
  }
  .link-row {
    margin: 8px 0;
    border: 2px solid #e6e6e6;
    border-radius: 8px;
    background: #e6e6e6;
  }
  .link-row input {
    border: 1px solid #c0c0c0;
    background: #f0f0f0;
    border-radius: 8px;
  }
  .link-row .icon {
    color: #c0c0c0;
  }
  .link-row .icon:hover {
    color: #585858;
  }
  .link-row .column {
    padding: 0.5rem;
  }
  .clickable {
    cursor: pointer;
  }
  .nuxt-link-exact-active {
    background-color: #eee;
    color: #000;
  }
  input {
    font-size: 16px!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
  }
</style>
