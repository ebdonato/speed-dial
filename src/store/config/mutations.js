import Vue from 'vue'

export function addBookmark(state, payload) {
    Vue.set(state.bookmarks, payload.id, payload.bookmark)
}

export function updateBookmark(state, payload) {
    Object.assign(state.bookmarks[payload.id], payload.bookmark)
}

export function deleteBookmark(state, id) {
    Vue.delete(state.bookmarks, id)
}

export function setBookmarksLoaded(state, value) {
    state.bookmarksLoaded = value
}

export function clearBookmarks(state) {
    state.bookmarks = {}
}

export function setUser(state, user) {
    state.user = {}
    state.user = { ...user }
}
