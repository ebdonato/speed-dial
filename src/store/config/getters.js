export function getBookmarks(state) {
    return state.bookmarks
}
export function getExternalBookmarks(state) {
    return state.externalBookmarks
}

export function getExternalAvatarUrl(state) {
    return state.externalAvatarUrl
}

export function hasUser(state) {
    return !!state.user?.uid
}

export function getUser(state) {
    return state.user
}

export function isEditMode(state) {
    return state.editMode
}

export function showFooterButtons(state) {
    return state.showFooterButtons
}

export function getConfig(state) {
    return state.config
}

export function getExternalConfig(state) {
    return state.externalConfig
}

export function getPickedGradientColors(state) {
    return state.pickedGradient
}

export function getWallpaper(state) {
    const url = !!state.wallpaper.blob ? `url(${URL.createObjectURL(state.wallpaper.blob)})` : 'none'
    return {
        ...state.wallpaper, url
    }
}
