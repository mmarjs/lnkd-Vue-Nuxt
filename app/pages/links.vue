<template>
  <div class="container">
    <div v-if="page && page.id">
      <draggable v-model="links" :options="{handle: '.handle', animation:350}">
        <div v-for="link in links" :key="link.id" class="columns is-multiline is-mobile link-row">
          <div class="column is-2-mobile is-1-tablet">
            <b-switch :value="link.status" @change.native="changeStatus(link)"></b-switch>
          </div>
          <div class="column">
            <div class="columns is-multiline is-mobile">
              <div class="column is-12-mobile is-4-tablet linkname">
                <b-field>
                  <b-input v-model="link.name" :name="'linkname'+link.id" placeholder="Title" @input="updateLink(link)" maxlength="30" :has-counter=false></b-input>
                </b-field>
              </div>
              <div class="column is-12-mobile is-8-tablet linkurl">
                <b-field :type="{'is-danger': errors.first('url'+link.id)}" :message="{'URL is invalid': errors.first('url'+link.id)}">
                  <b-input v-model="link.url" type="url" data-vv-delay="300" v-validate.initial="{url: {require_protocol: true }}" :name="'url'+link.id" placeholder="https://" @input="updateLink(link)"></b-input>
                </b-field>
              </div>


              <div class="column is-12" v-if="link.schedule" >
                <div class="columns is-multiline is-mobile" >
                  <div class="column is-12-mobile is-4-tablet">
                    <label><strong>Start date</strong></label>
                    <div class="field has-addons">
                      <b-datepicker placeholder="Click to select..." icon="calendar-today" v-model="link.setStart">   
                      </b-datepicker>
                      <b-timepicker icon="clock" v-model="link.setStart">
                      </b-timepicker>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-4-tablet">
                    <label><strong>End date</strong></label>
                    <div class="field has-addons">
                      <b-datepicker placeholder="Click to select..." icon="calendar-today" v-model="link.setEnd">   
                      </b-datepicker>
                      <b-timepicker icon="clock" v-model="link.setEnd">
                      </b-timepicker>
                    </div>
                  </div>
                  <div class="column is-12-mobile is-2-tablet">
                    <label><strong>&nbsp;</strong></label>
                    <div class="field has-addons">
                      <p class="control">
                        <a class="button is-primary" @click="setSchedule(link)">
                          Set schedule
                        </a>
                      </p>
                      <p class="control is-info">
                        <a class="button is-hovered" @click="link.setStart=null;link.setEnd=null;setSchedule(link)">
                          Reset
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                &nbsp;
              </div>


              <div class="column is-12 link-options">
                <a @click="confirmRemove(link)">
                  <img src="/i/delete.svg">
                </a>
                &nbsp;
                <a @click="changeStar(link)">
                  <img src="/i/star-filled.svg" v-if="link.star == true"> 
                  <img src="/i/star.svg" v-else>
                </a>
                &nbsp;
                <a @click="link.schedule = !link.schedule">
                  <img src="/i/scheduled.svg" v-if="link.setStart || link.setEnd">
                  <img src="/i/time.svg" v-else>
                </a>
                &nbsp;
                <a class="handle">
                  <img src="/i/move.svg">
                </a>

                <span class="quick-stats">
                  <p v-if="link.clicks">{{link.clicks}} click<span v-if="link.clicks > 1">s</span></p>
                  <p v-else>no clicks yet</p>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </draggable>
      <div class="notification is-warning" v-if="!links.length">You have no links. Try adding some!</div>
      <br>
      <button class="button is-primary is-large" @click="addLink">+ add</button>
      <a class="button is-dark  is-large" v-if="page" :href="page.slug" target="_blank">Preview my page</a>
      <br><br><br>
    </div>
    <div v-else class="notification">
      Select the page you want to edit
      <nuxt-link v-for="page in pages" :key=page.id :to="'/links?page='+page.id"><p>{{page.name}}</p></nuxt-link>
    </div>
    <!-- <div v-else class="notification is-primary">
      Great, you're here!<br>
      You have no page where you can add links. No worries, just press the button below!
      <br><br>
      <button class="button is-primary is-inverted" @click="createPage">Create page</button>
    </div> -->
  </div>
</template>
<script>
  import axios from 'axios'
  import moment from 'moment-timezone'
  import { mapMutations } from 'vuex'
  import draggable from 'vuedraggable'
  import { debounce } from "debounce"

  export default {
    middleware: 'auth',
    components: {
      draggable,
    },
    watchQuery: ['page'],
    data() {
      return {
        query: '',
        date: new Date()
      }
    },
    computed: {
      moment() {
        return moment;
      },
      page() {
        return this.$store.getters['pages/current'] || null
      },
      pages() {
        return this.$store.getters['pages/list']
      },
      filteredList() {
        return this.links
      },
      links: {
        get() {
          return this.$store.getters['links/list']
        },
        set(values) {
          let user = this.$store.getters['auth/user'];
          let config = {
            headers: {'Authorization': "Bearer " + user.jwt},
          };
          values.forEach(function(link, index, arr){

            axios.put(process.env.apiUrl+'/links/'+link.id, 
              {order: index},
              config)
            .then((res) => {

            })
            .catch((err) =>{
              console.log('error')
            })
          
          
          })
          this.$store.commit('links/reorder', values)
          this.$snackbar.open({message:`Links have been reordered.`, queue: false})
        }
      },
    },
    methods: {
      async addLink() {
        var data = {
          name: '',
          order: this.links.length,
          status: true,
          star: false,
          url: '',
          clicks: 0,
          page: this.page.id,
          start: null,
          end: null,
        }

        let user = this.$store.getters['auth/user'];
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        axios.post(process.env.apiUrl+'/links/', data, config)
        .then((res) => {
          this.$store.commit('links/add', res.data)
        })
        .catch((err) =>{
          console.log('error')
        })

      },
      
      async createPage() {
        let user = this.$store.getters['auth/user']
        let username = user.username.replace(/\s+/g, '').toLowerCase() + Math.floor(1000 + Math.random() * 9000);
        var data = {
          name: user.username,
          owner: user.id,
          slug: username,
          channels: [],
          style: {theme: "default", font: "Roboto", version: 1}
        }

        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        await axios.post(process.env.apiUrl+'/pages/', data, config)
        .then((res) => {
          
          window.location = '/links'
        })
        .catch((err) =>{
          console.log('error')
        })
      },
      updateLink: debounce(function(link) {
        let user = this.$store.getters['auth/user'];
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        axios.put(process.env.apiUrl+'/links/'+link.id, 
          {name: link.name, url: link.url},
          config)
        .then((res) => {
          this.$store.commit('links/updateLink', link.name)
          this.$snackbar.open({message:`Link updated!`, queue: false})
        })
        .catch((err) =>{
          console.log('error')
        })
      }, 400),

      setSchedule(link) {
          let user = this.$store.getters['auth/user'];
          let start = this.moment.utc(link.setStart).format('YYYY-MM-DD HH:mm:ss');
          if(start == 'Invalid date') {
            start = null;
          }
          let end = this.moment.utc(link.setEnd).format('YYYY-MM-DD HH:mm:ss') ;
          if(end == 'Invalid date') {
            end = null;
          }
          let config = {
            headers: {'Authorization': "Bearer " + user.jwt},
          };
          axios.put(process.env.apiUrl+'/links/'+link.id, 
            {start: start, end: end},
            config)
          .then((res) => {
            this.$store.commit('links/toggleSchedule', link)
            this.$store.commit('links/updateLink', link.name)
          })
          .catch((err) =>{
            console.log('error')
          })
      },



      changeStatus(link) {
        let user = this.$store.getters['auth/user'];
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        axios.put(process.env.apiUrl+'/links/'+link.id, 
          {status: !link.status},
          config)
        .then((res) => {
          this.toggleStatus(link)
          console.log(res.data.status)
          if(res.data.status) {
            this.$snackbar.open({message:`Link is now active!`, queue: false})
          }
          else {
            this.$snackbar.open({message:`Link has been inactivated!`, queue: false})
          }
        })
        .catch((err) =>{
          console.log('error')
        })
      },
      
      changeStar(link) {
        let user = this.$store.getters['auth/user'];
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        axios.put(process.env.apiUrl+'/links/'+link.id, 
          {star: !link.star},
          config)
        .then((res) => {
          this.toggleStar(link)
          if(res.data.star) {
            this.$snackbar.open({message:`Link starred!`, queue: false})
          }
          else {
            this.$snackbar.open({message:`Link un-starred!`, queue: false})
          }
        })
        .catch((err) =>{
          console.log('error')
        })
      },

      confirmRemove(link) {
        this.$dialog.confirm({
            title: 'Warning',
            message: 'This will permanently delete the link!',
            cancelText: 'Cancel',
            confirmText: 'Delete Link',
            onConfirm: () => this.removeLink(link)
        })
      },
      removeLink(link) {
        let user = this.$store.getters['auth/user'];
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
        };
        axios.delete(process.env.apiUrl+'/links/'+link.id, config)
        .then((res) => {
          this.deleteLink(link)
          this.$snackbar.open({message:`Link has been deleted`, queue: false})
        })
        .catch((err) =>{
          console.log('error')
        })
      },
      ...mapMutations({
        toggleStar: 'links/toggleStar',
        toggleStatus: 'links/toggleStatus',
        deleteLink: 'links/delete',
        //updateName: 'links/updateName',
      })
    },

    //get all links from a page
    async asyncData({ store, $axios, query }) {

      let user = store.getters['auth/user'];
      let pageid = query.page || null;

      await axios.get((process.env.SERVER_URL || process.env.apiUrl) +'/pages/'+query.page)
      .then((res) => {
        if(res.data) {
          store.commit('pages/emptyCurrent')
          let page = res.data
          store.commit('pages/addCurrent', page)   
        }
      })
      .catch((err) =>{
        console.log(err)
      })

      if(pageid) {
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt},
          params: {page: pageid, _sort: "order:ASC"}
        };
        await $axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/links', config)
        .then((res) => {
          if(res.data) {
            store.commit('links/emptyList')

            res.data.forEach(link => {
              let setStart = null;
              let setEnd = null;
              if(link.start != null) {
                setStart = new Date(link.start)
              }
              if(link.end != null) {
                setEnd = new Date(link.end)
              }
              store.commit('links/add', {schedule:false, setStart:setStart, setEnd:setEnd, ...link})
            });
          }
        })
        .catch((err) =>{
          console.log('error')
        })
      }


    }
  }
</script>

<style>
  .quick-stats{
    float:right;
    padding-right:8px;
    font-size: 13px;
  }
  @media only screen and (max-width: 768px) {
    .column.linkname {
      padding-bottom: 0;
    }
    .column.column.linkname input {
      border-bottom: 0;
      border-radius: 8px 8px 0 0;
    }
    .column.linkurl {
      padding-top: 0;
    }
    .column.column.linkurl input {
      border-radius: 0 0 8px 8px;
    }
  }
</style>
