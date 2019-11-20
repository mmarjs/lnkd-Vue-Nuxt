<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" :class="{ 'is-active': showNav }" style="margin:auto 0" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleMenu()">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <nuxt-link class="navbar-item" to="/" style="background-color:#fff;font-size:28px;">
        <img src="logo.svg" width="32" height="32" alt="Lnkd Logo">
        <span style="color:#000; font-weight: 700">&nbsp;LNKD</span>
      </nuxt-link>
      <nuxt-link to="/upgrade" v-if="user && !user.pro">
        <span class="tag is-warning is-rounded" style="margin-top: 1.4em">Upgrade to PRO</span>
      </nuxt-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <div @click="toggleMenu" style="display:inherit">
          <nuxt-link to="/info" v-if="!user" class="navbar-item">More info</nuxt-link>
          <nuxt-link to="/pricing" v-if="!user" class="navbar-item">Pricing</nuxt-link>
          <nuxt-link to="/blog" v-if="!user" class="navbar-item">Blog</nuxt-link>
          <nuxt-link to="/contact" v-if="!user" class="navbar-item">Contact us</nuxt-link>
          <nuxt-link v-if="user && currentPage.id" :to="'/links?page='+currentPage.id" class="navbar-item"><!--<img src="/i/cube.svg"> &nbsp;--> Links</nuxt-link>
          <nuxt-link v-if="user && currentPage.id" :to="'/settings?page='+currentPage.id" class="navbar-item"><!--<img src="/i/page.svg"> &nbsp;--> Page</nuxt-link>
        </div>
        <b-dropdown aria-role="list" v-if="user && pages && pages.length">
          <a class="navbar-item" slot="trigger" style="padding:0.2rem">
            <span v-if="currentPage && currentPage.name">{{currentPage.name}}</span>
            <span v-else>Select page</span>
            <b-icon icon="menu-down"></b-icon>
          </a>
          <b-dropdown-item has-link v-for="page in pages" :key="page.id" @click="showNav = false">
            <n-link :to="'/links?page='+page.id">
              {{page.name}}
            </n-link>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item @click="logout"><strong>+ Create new page</strong></b-dropdown-item>
        </b-dropdown>



      </div>

      <div class="navbar-end">
        <nuxt-link v-if="!user" to="signin" class="navbar-item button is-primary is-medium" style="margin: auto;">&raquo; Connect</nuxt-link>
        <nuxt-link v-if="user" to="/account" class="navbar-item">My account</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    data() {
      return {
        showNav: false,
        apiUrl: process.env.apiUrl,
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user']
      },
      pages() {
        return this.$store.getters['pages/list']
      },
      page() {
        return this.$route.query.page || null
      },
      currentPage() {
        return this.$store.getters['pages/current'] || null
      }
    },
    methods: {
      toggleMenu() {
        this.showNav = !this.showNav;
      },
      ...mapMutations({
        setUser: 'auth/setUser',
        logout: 'auth/logout'
      })
    }
  }
</script>
<style>
  .navbar-end img {
    height: 16px;
  }
  .navbar {
    border-bottom: 2px solid #c0c0c0;
  }
</style>
