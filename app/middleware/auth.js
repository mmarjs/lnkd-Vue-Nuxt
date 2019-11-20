export default function ({ store, redirect }) {
  // use store.getters.isAuth ...
  if (!store.getters['auth/user']) {
    return redirect('/signin')
  }
}