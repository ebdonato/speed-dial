import { Notify } from 'quasar'
import firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyA4vu-JJpq7D5vjww2yThN-Js5_M_15hqQ",
	authDomain: "speed-dial-1982.firebaseapp.com",
	projectId: "speed-dial-1982",
	storageBucket: "speed-dial-1982.appspot.com",
	messagingSenderId: "605319237776",
	appId: "1:605319237776:web:203d8e02d6f922bad28815",
	measurementId: "G-CMLH3C11R3"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firebaseAuth = firebaseApp.auth()
const firebaseDB = firebaseApp.database()
const firebaseStorage = firebaseApp.storage()

export { firebaseAuth, firebaseDB, firebaseStorage }

export default ({ store, router }) => {

	firebaseAuth.onAuthStateChanged(user => {

		if (user) {
			const lastUser = store.state.config.user.displayName

			const { displayName, uid, photoURL } = user
			store.dispatch("config/setUser", { displayName, uid, photoURL })
			store.dispatch("config/loadBookmarks")
			store.dispatch("config/loadUserAvatar")
			store.dispatch("config/loadConfig")

			!router.currentRoute.name || ["Index", "ExternalIndex"].includes(router.currentRoute.name) || router.push({ name: "Index" })

			lastUser == displayName || Notify.create({
				message: `Olá ${displayName || ''}`,
				color: "primary",
			})

		} else {
			store.dispatch("config/setUser", {})
			store.dispatch("config/unloadBookmarks")
			!router.currentRoute.name || ["Auth", "ExternalIndex"].includes(router.currentRoute.name) || router.push({ name: "Auth" })
		}

	})

}
