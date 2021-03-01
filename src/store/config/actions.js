import { uid, Notify, LocalStorage, Loading, Dark } from 'quasar'
import { firebaseDB, firebaseAuth, firebaseStorage } from "boot/firebase"
import { defaultConfig } from "assets/default"
import axios from 'axios'

export function uploadUserAvatar({ commit }, avatarBlob) {
    const user = firebaseAuth.currentUser.uid
    const ref = firebaseStorage.ref(`${user}`)
    const imagesRef = ref.child('logo.jpg')

    imagesRef.put(avatarBlob)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            commit("setUserAvatarUrl", url)
        })
        .catch(err => {
            console.error(err)
            commit("setUserAvatarUrl", '')
        })

}

export function loadUserAvatar({ commit }) {
    const uid = firebaseAuth.currentUser.uid
    const ref = firebaseStorage.ref(`${uid}`)

    ref.child('logo.jpg').getDownloadURL()
        .then((url) => {
            commit("setUserAvatarUrl", url)
        })
        .catch(err => {
            console.error(err)
            commit("setUserAvatarUrl", '')
        })
}

export function deleteUserAvatar({ commit }) {
    const uid = firebaseAuth.currentUser.uid
    const ref = firebaseStorage.ref(`${uid}`)

    ref.child('logo.jpg').delete()
        .then(() => {
            commit("setUserAvatarUrl", '')
        }).catch(err => {
            Notify.create({
                message: "Algo deu errado ao excluir o avatar",
                color: 'negative'
            })
            console.error(err)
        })
}

export function loadAvatar({ commit }, uid) {
    const payload = {}

    payload.uid = uid

    const ref = firebaseStorage.ref(`${uid}`)
    ref.child('logo.jpg').getDownloadURL()
        .then((url) => {
            payload.url = url
        })
        .catch(err => {
            console.error(err)
            payload.url = ''
        })
        .finally(() => {
            commit("setExternalAvatarUrl", payload.url)
        })
}

export function setUser({ commit }, user) {
    commit("setUser", user)
}

export function setConfig({ commit }, config) {
    commit('updateConfig', config)
}

export function loadConfig({ commit }, uid = '') {
    const userUid = uid || firebaseAuth.currentUser.uid

    let config = { ...defaultConfig }

    const ref = firebaseDB.ref(`config/${userUid}`)
    ref.once('value')
        .then((snapshot) => {
            config = { ...snapshot.val() }
        })
        .catch(error => {
            console.error(error)
        })
        .finally(() => {
            if (uid) {
                commit('updateExternalConfig', config)

            } else {
                commit('updateConfig', config)
            }

            Dark.set(config.theme)
        })

}

export function updateConfig({ commit }, config) {
    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`config/${user}`)

    ref.set(config, error => {
        if (error) {
            console.error(error)
        }
        else {
            Notify.create({
                message: "Configurações atualizadas",
                color: 'primary'
            })
            commit('updateConfig', config)
        }
    })
}

export function setBookmarks({ commit }, bookmarks) {
    commit('updateBookmarks', bookmarks)
}

export function setBookmarksFromArray({ commit, dispatch }, bookmarksArray) {
    const bookmarks = bookmarksArray.reduce((acc, bookmark) => {
        const payload = {}
        payload[bookmark.key] = { ...bookmark }
        delete payload[bookmark.key].key
        Object.assign(acc, payload)
        return acc
    }, {})

    commit('updateBookmarks', bookmarks)
    dispatch('updateBookmarks', bookmarks)
}

export function unloadBookmarks({ commit }) {
    commit('clearBookmarks')
}

export function unloadConfig({ commit }) {
    commit('clearConfig')
}

export function loadExternalBookmarks({ commit }, uid) {

    const payload = {}

    payload.uid = uid

    const ref = firebaseDB.ref(`bookmarks/${uid}`)
    ref.once('value')
        .then((snapshot) => {
            payload.bookmarks = snapshot.val()

        })
        .catch(error => {
            console.error(error)
            payload.bookmarks = {}
        })
        .finally(() => {
            commit('updateExternalBookmarks', payload.bookmarks)

        })
}

export function loadBookmarks({ commit }) {

    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`bookmarks/${user}`).orderByChild('index')

    ref.once('value', (snapshot) => {
        commit('updateBookmarks', snapshot.val())
        LocalStorage.set("waitingAuth", false)
        LocalStorage.remove("waitingAuth")
        Loading.hide()

    }, error => {
        console.error(error)
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

export function updateBookmarks({ }, payload) {
    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`bookmarks/${user}`)

    ref.set(payload, error => {
        if (error) {
            console.error(error)
        }
        else {
            Notify.create({
                message: 'Links atualizados',
                color: 'primary'
            })
        }
    })

}



export function toggleEditMode({ commit, state }) {
    commit("setEditMode", !state.editMode)
}

export function setEditMode({ commit }, value) {
    commit("setEditMode", value)
}

export function setShowFooterButtons({ commit }, value) {
    commit("setShowFooterButtons", value)
}

export function loadWallpaper({ commit, state }, imageSize) {
    const url = `https://picsum.photos/${imageSize.width}/${imageSize.height}`

    if (!state.wallpaper.blob) {
        axios.get(url, {
            responseType: "blob",
            timeout: 120000,
        })
            .then((response) => {
                const payload = { blob: response.data }
                commit('updateWallpaper', payload)
                getPicInfo(response.headers["picsum-id"])
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getPicInfo = (id) => {
        axios.get(`https://picsum.photos/id/${id}/info`)
            .then((response) => {
                const payload = { info: response.data }
                commit('updateWallpaper', payload)
            })
            .catch(err => {
                console.log(err)
            })
    }
}
