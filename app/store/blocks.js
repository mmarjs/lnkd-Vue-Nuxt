export const state = () => ({
  list: []
})

export const mutations = {
  add(state, block) {
    state.list.push(block)
  },
  emptyList(state) {
    state.list = []
  },
  updateBlock(state, block) {
    console.log('updated block settings')
  },
}

export const getters = {
  list: state => {
    return state.list
  }
}