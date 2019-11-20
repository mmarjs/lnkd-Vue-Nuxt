import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
  setUser(state, user) {
    state.user = user
    Cookies.set('user', user, { expires: 30 })
  },
  setJwt(state, jwt) {
    state.jwt = { token: jwt}
    Cookies.set('jwt', { token: jwt})
  },
  logout(state) {
    state.user = null
    Cookies.set('user', '')
    state.jwt = null
    Cookies.set('jwt', '')
  }
}

export const getters = {
  user: state => {
    return state.user
  },
  jwt: state => {
    return state.jwt
  }
}