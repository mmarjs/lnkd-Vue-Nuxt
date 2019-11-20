<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">My account</p>
      </header>
      <div class="card-content">
        <div class="columns is-multiline is-mobile">
          <div class="column is-12-mobile is-6-tablet">
            <!--<img :src="'https://www.gravatar.com/avatar/'+md5(user.email)+'?d=https://res.cloudinary.com/skim/image/upload/v1554064491/user_1_ofyuxh.png'" style="border-radius:10px;border:2px solid #fff;width:48px;height:48px">-->
            <img :src="'https://graph.facebook.com/'+user.fbId+'/picture?type=large'" style="border-radius:10px;border:2px solid #fff;width:48px;height:48px">
            <br/><br/>
            <p><strong>Name</strong></p>
            {{user.username}}
            <br/><br/>
            <p><strong>Email</strong></p>
            {{user.email}}
            <br/><br>
          </div>
          <div class="column is-12-mobile is-6-tablet">
            <p><strong>Last login</strong></p>
            -
            <br/><br>
            <p><strong>Authenticated via</strong></p>
            Facebook
            <br/><br>
            <p><strong><nuxt-link v-if="user" to="#" @click.native="doLogout">Sign out</nuxt-link></strong></p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'crypto-js/md5';
  import axios from 'axios'
  import moment from 'moment-timezone'
  import { mapMutations } from 'vuex'
  export default {
    middleware: 'auth',
    data() {
      return {
        user: '',
        subscription: this.$store.getters['subscriptions/list'][0]
      }
    },
    mounted() {
        let user = this.$store.getters['auth/user']
        var config = {
            headers: {'Authorization': "bearer " + user.jwt}
        };
        axios.get(process.env.apiUrl+'/users/me', config)
        .then((res) => {
          this.user = res.data
        })
        .catch((err) =>{
          console.log('error')
        })
    },
    computed: {
      moment() {
        return moment;
      },
      md5() {
        return md5;
      }
    },
    methods: {
      cancelSubscription() {
          this.$dialog.alert({
              title: 'Cancel subscription renewal',
              message: "We are sorry you were dissatisfied with your PRO plan. For the moment, we cannot process requests automatically. Please contact us and we will immediately cancel your subscription. If possible, please take the time to also leave some feedback, it would mean a lot for us to help us improve the service.",
              confirmText: 'OK'
          })
      },
      doLogout() {
        this.logout()
        this.$router.push('/')
      },
      ...mapMutations({
        logout: 'auth/logout'
      })
    },
    async fetch({ store, $axios }) {
      store.commit('subscriptions/emptyList')
      let user = store.getters['auth/user'];

      let config = {
        headers: {'Authorization': "Bearer " + user.jwt},
        params: {user: user.id, status: "active"}
      };

    }
  }
</script>