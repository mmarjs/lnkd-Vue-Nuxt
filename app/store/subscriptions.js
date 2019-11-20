export const state = () => ({
  list: []
})

export const mutations = {
  add(state, subscription) {
    state.list.push(subscription)
  },
  emptyList(state) {
    state.list = []
  },
  updateSubscription(state, subscription) {
    console.log('updated subscription settings')
  },
}

export const getters = {
  list: state => {
    return state.list
  }
}