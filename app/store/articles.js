export const state = () => ({
  list: []
})

export const mutations = {
  add(state, article) {
    state.list.push(article)
  },
  emptyList(state) {
    state.list = []
  },
  updateArticle(state, article) {
    console.log('updated article settings')
  },
}

export const getters = {
  list: state => {
    return state.list
  }
}