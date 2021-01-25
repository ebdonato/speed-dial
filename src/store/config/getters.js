export function getBookmarks(state) {
    return state.bookmarks
}

export function hasUser(state) {
    return !!state.user?.uid
}

export function getUser(state) {
    return state.user
}
