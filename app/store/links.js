export const state = () => ({
  list: []
})

export const mutations = {
  add(state, link) {
    state.list.push(link)
  },
  toggleStatus(state, link) {
    link.status = !link.status
  },
  toggleStar(state, link) {
    link.star = !link.star
  },
  toggleSchedule(state, link) {
    link.schedule = !link.schedule
  },
  updateLink(state, link) {
    console.log('updated link name/url')
  },
  reorder(state, all) {
    console.log('reorder')
    state.list = all;
  },
  delete(state, link) {
    state.list.splice(state.list.indexOf(link), 1)
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}