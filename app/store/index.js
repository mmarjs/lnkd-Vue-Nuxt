export const strict = false
import cookieparser from 'cookieparser'
import axios from 'axios'

export const actions = {
  async nuxtServerInit({ commit }, { req, query }) {
    let user = null
    let newuser = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
      if(user) {
        let config = {
          headers: {'Authorization': "Bearer " + user.jwt}
        };
        const updateUser = await axios.get((process.env.SERVER_URL || process.env.apiUrl)+'/users/me', config)
        .then((res) => {
          newuser = res.data
          res.data.pages.forEach(page => {
            commit('pages/add', page)   
            if(page.id == query.page) {
              commit('pages/addCurrent', page)   
            }
          })

          delete newuser.subscriptions
          delete newuser.pages
          return newuser
        })
        updateUser.jwt = user.jwt
        commit('auth/setUser', updateUser)
        // commit('pages/emptyList')

      
      }

    }

  }
}