import firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/database"

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

export { firebaseAuth, firebaseDB }

export default ({ store, router }) => {

	firebaseAuth.onAuthStateChanged(user => {

		if (user) {
			const { displayName, uid, photoURL } = user
			store.dispatch("config/setUser", { displayName, uid, photoURL })
			!router.currentRoute.name || router.currentRoute.name == "Index" || router.push({ name: "Index" })

		} else {
			store.dispatch("config/setUser", {})
			!router.currentRoute.name || router.currentRoute.name == "Auth" || router.push({ name: "Auth" })
		}
	})
}
