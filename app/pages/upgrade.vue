<template>
  <div>

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Upgrade to Pro</p>
      </header>
      <div class="card-content" v-if="!subscription">
        For a limited time, unlock the full LNKD experience for FREE for 30 days, and then only pay 3.25$/month. <!--(Billed as $39/year)--><br>
        <ul type="disc">
          <li>- Support our continuous development of Lnkd. Plus, we'll stop nagging you to upgrade :)</li>
          <li>- Schedule your links, however you like</li>  
          <li>- Access to more themes</li>  
          <li>- Create your own custom theme</li>  
          <li>- Whitelabel (remove our logo from the page)</li>  
          <li>- Google Analytics</li>  
          <li>- Audience retargeting with Facebook pixel</li>
        </ul>
        <hr>
        
        <button class="button is-primary is-large" @click="upgrade" :class="{ 'is-loading': buttonLoading }">+ Activate free trial</button>
        {{success}}
      </div>
      <div class="card-content" v-else>
        You have already upgraded to our <span class="tag is-primary">PRO</span> plan. Thanks!
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapMutations } from 'vuex'
  export default {
    middleware: 'auth',
    data() {
      return {
        success: '',
        buttonLoading: false,
        subscription: this.$store.getters['subscriptions/list'][0]
      }
    },
    methods: {
      async upgrade() {
        this.buttonLoading = true;
        let user = this.$store.getters['auth/user']
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        var data = {
          user: user
        };
        await axios.post(process.env.apiUrl+'/subscriptions/', data, config)
        .then((res) => {

          var stripe = Stripe(process.env.stripePK);
          stripe.redirectToCheckout({
            sessionId: res.data.session,
          }).then(function (result) {
            this.success = result.error.message
          });


        })
        .catch((err) =>{
          console.log('error')
        })
      },
      async fetch({ store, $axios }) {
        store.commit('subscriptions/emptyList')
        let user = store.getters['auth/user'];

        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
          params: {user: user.id, status: "active"}
        };
        await $axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/subscriptions', config)
        .then((res) => {
          if(res.data) {
            let subscription = res.data[0]
            store.commit('subscriptions/add', subscription)
          }
        })
        .catch((err) =>{
          console.log('error')
        })
      }
    }
  }
</script>
