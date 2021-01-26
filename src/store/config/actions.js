import { uid, Notify, LocalStorage } from 'quasar'
import { firebaseDB, firebaseAuth } from "boot/firebase"

export function setUser({ commit, dispatch }, user) {
    dispatch("loadBookmarks")

    commit("setUser", user)

    LocalStorage.set("currentUser", user)
}

export function setBookmarks({ commit }, bookmarks) {
    commit('setBookmarksLoaded', true)
    commit('updateBookmarks', bookmarks)
    LocalStorage.set("currentBookmarks", bookmarks)
}

export function loadBookmarks({ commit }) {

    if (!firebaseAuth.currentUser) {
        commit('setBookmarksLoaded', false)
        commit('clearBookmarks')
        LocalStorage.set("currentBookmarks", {})
        return
    }

    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`bookmarks/${user}`)

    ref.once('value', (snapshot) => {
        commit('updateBookmarks', snapshot.val())

        commit('setBookmarksLoaded', true)
    }, error => {
        console.error(error)
        commit('setBookmarksLoaded', false)
    })

    ref.on('child_added', snapshot => {
        const payload = {
            id: snapshot.key,
            bookmark: snapshot.val()
        }
        commit('addBookmark', payload)
    })

    ref.on('child_changed', snapshot => {
        const payload = {
            id: snapshot.key,
            bookmark: snapshot.val()
        }
        commit('updateBookmark', payload)
    })

    ref.on('child_removed', snapshot => {
        const id = snapshot.key
        commit('deleteBookmark', id)
    })

}

export function removeBookmark({ }, id) {

    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`bookmarks/${user}/${id}`)

    ref.remove(error => {
        if (error) {
            console.error(error)
        }
        else {
            Notify.create({
                message: 'Link excluído ',
                color: 'primary'
            })
        }
    })
}

export function updateBookmark({ }, payload) {
    const user = firebaseAuth.currentUser.uid

    let message = "atualizado"

    if (!payload.id) {
        payload.id = uid()
        message = "adicionado"
    }

    const ref = firebaseDB.ref(`bookmarks/${user}/${payload.id}`)

    ref.set(payload.bookmark, error => {
        if (error) {
            console.error(error)
        }
        else {
            Notify.create({
                message: 'Link ' + message,
                color: 'primary'
            })
        }
    })

}
