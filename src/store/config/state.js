import { defaultConfig } from "assets/default"

export default function () {
	return {
		externalBookmarks: '',
		externalAvatarUrl: '',
		externalConfig: { ...defaultConfig },
		bookmarks: {},
		user: null,
		config: { ...defaultConfig },
		editMode: false,
		showFooterButtons: false,
		pickedGradient: []
	}
}
