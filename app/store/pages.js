export const state = () => ({
  list: [],
  current: {}
})

export const mutations = {
  add(state, page) {
    state.list.push(page)
  },
  emptyList(state) {
    state.list = []
  },
  addCurrent(state, page) {
    state.current = page
  },
  emptyCurrent(state) {
    state.current = {}
  },
  updatePage(state, page) {
    console.log('updated page settings')
  },
}

export const getters = {
  list: state => {
    return state.list
  },
  current: state => {
    return state.current
  }
}