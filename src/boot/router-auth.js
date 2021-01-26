import { LocalStorage } from 'quasar'

export default ({ router, store }) => {

  const currentUser = LocalStorage.getItem("currentUser") ?? {}
  const bookmarks = LocalStorage.getItem("currentBookmarks") ?? {}
  store.dispatch("config/setUser", currentUser)
  store.dispatch("config/setBookmarks", bookmarks)

  router.beforeEach((to, from, next) => {

    store.dispatch("config/setShowFooterButtons", to.name == "Index")

    const loggedIn = !!store.getters["config/hasUser"]

    if (loggedIn || to.name == "Auth") {
      next()
    } else {
      next({ name: "Auth" })
    }
  })
}
