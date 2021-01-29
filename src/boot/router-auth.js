import { LocalStorage } from 'quasar'
import { defaultConfig } from "assets/default"

export default ({ router, store }) => {

  const currentUser = LocalStorage.getItem("currentUser") ?? {}
  const currentBookmarks = LocalStorage.getItem("currentBookmarks") ?? {}
  const currentConfig = LocalStorage.getItem("currentConfig") ?? { ...defaultConfig }
  store.dispatch("config/setUser", currentUser)
  store.dispatch("config/setBookmarks", currentBookmarks)
  store.dispatch("config/setConfig", currentConfig)

  router.beforeEach((to, from, next) => {

    store.dispatch("config/setShowFooterButtons", to.name == "Index")

    const loggedIn = !!store.getters["config/hasUser"]

    if (loggedIn || to.name == "Auth" || to.name == "ExternalIndex") {
      next()
    } else {
      next({ name: "Auth" })
    }
  })
}
