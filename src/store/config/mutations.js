import Vue from 'vue'
import { LocalStorage } from 'quasar'

export function addBookmark(state, payload) {
    Vue.set(state.bookmarks, payload.id, payload.bookmark)
    LocalStorage.set("currentBookmarks", state.bookmarks)
}

export function updateBookmark(state, payload) {
    Object.assign(state.bookmarks[payload.id], payload.bookmark)
    LocalStorage.set("currentBookmarks", state.bookmarks)
}

export function deleteBookmark(state, id) {
    Vue.delete(state.bookmarks, id)
    LocalStorage.set("currentBookmarks", state.bookmarks)
}

export function clearBookmarks(state) {
    state.bookmarks = {}
    LocalStorage.set("currentBookmarks", state.bookmarks)
}

export function updateBookmarks(state, payload) {
    state.bookmarks = {}
    Object.assign(state.bookmarks, payload)
    LocalStorage.set("currentBookmarks", state.bookmarks)
}

export function setUser(state, user) {
    state.user = {}
    state.user = { ...user }
}

export function setEditMode(state, value) {
    state.editMode = !!value
}

export function setShowFooterButtons(state, value) {
    state.showFooterButtons = !!value
}
