import { uid, Notify, LocalStorage, Loading } from 'quasar'
import { firebaseDB, firebaseAuth, firebaseStorage } from "boot/firebase"

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

export function loadAvatar({ commit }, uid) {

    const updateIndexedDB = (info) => {
        const externalInfo = LocalStorage.getItem(info.uid) ?? {}
        externalInfo.url = info.url
        LocalStorage.set(info.uid, externalInfo)
    }

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
            updateIndexedDB(payload)
        })
}

export function setUser({ commit }, user) {
    commit("setUser", user)
}

export function loadConfig({ commit }, uid = '') {
    const updateIndexedDB = (info) => {
        const externalInfo = LocalStorage.getItem(info.uid) ?? {}
        externalInfo.config = info.config
        LocalStorage.set(info.uid, externalInfo)
    }


    const userUid = uid || firebaseAuth.currentUser.uid

    let config = {}

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
                updateIndexedDB({
                    uid,
                    config
                })
            } else {
                commit('updateConfig', config)
            }
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

export function unloadBookmarks({ commit }) {
    commit('clearBookmarks')
}

export function loadExternalBookmarks({ commit }, uid) {

    const updateIndexedDB = (info) => {
        const externalInfo = LocalStorage.getItem(info.uid) ?? {}
        externalInfo.bookmarks = info.bookmarks
        LocalStorage.set(info.uid, externalInfo)
    }

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
            updateIndexedDB(payload)
        })
}

export function loadBookmarks({ commit }) {

    const user = firebaseAuth.currentUser.uid

    const ref = firebaseDB.ref(`bookmarks/${user}`)

    ref.once('value', (snapshot) => {
        commit('updateBookmarks', snapshot.val())

        LocalStorage.set("waitingAuth", false)
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

export function toggleEditMode({ commit, state }) {
    commit("setEditMode", !state.editMode)
}

export function setEditMode({ commit }, value) {
    commit("setEditMode", value)
}

export function setShowFooterButtons({ commit }, value) {
    commit("setShowFooterButtons", value)
}
