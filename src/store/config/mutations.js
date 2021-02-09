import Vue from 'vue'
import { LocalStorage } from 'quasar'
import { defaultConfig } from "assets/default"

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
    LocalStorage.set("currentUser", user)
}

export function setEditMode(state, value) {
    state.editMode = !!value
}

export function setShowFooterButtons(state, value) {
    state.showFooterButtons = !!value
}

export function setUserAvatarUrl(state, avatarUrl) {
    state.user = { ...state.user, avatarUrl }
    LocalStorage.set("currentUser", state.user)
}

export function updateExternalBookmarks(state, bookmarks) {
    state.externalBookmarks = {}
    Object.assign(state.externalBookmarks, bookmarks)
}

export function setExternalAvatarUrl(state, url) {
    state.externalAvatarUrl = url
}

export function updateConfig(state, config) {
    Object.assign(state.config, config)
    LocalStorage.set("currentConfig", state.config)
}

export function clearConfig(state) {
    state.config = {}
    Object.assign(state.config, { ...defaultConfig })
    LocalStorage.set("currentConfig", state.config)
}

export function pickedGradientColors(state, colors) {
    state.pickedGradient = colors
}

export function updateExternalConfig(state, config) {
    state.externalConfig = {}
    Object.assign(state.externalConfig, config)
}
