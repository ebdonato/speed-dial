<template>
    <q-page class="flex flex-center">
        <div class="column items-center" v-if="!hasUser">
            <img src="icons/favicon-96x96.png" alt="Logo" />
            <div class="q-mt-sm q-gutter-md">
                <q-btn
                    round
                    color="primary"
                    icon="ion-logo-github"
                    aria-label="Login com Github"
                    @click="githubSignIn"
                />
                <q-btn
                    round
                    color="primary"
                    icon="ion-logo-google"
                    aria-label="Login com Google"
                    @click="googleSignIn"
                />
                <q-btn
                    round
                    color="primary"
                    icon="ion-logo-facebook"
                    aria-label="Login com Facebook"
                    @click="facebookSignIn"
                />
                <q-btn
                    round
                    color="primary"
                    icon="ion-logo-yahoo"
                    aria-label="Login com Yahoo"
                    @click="yahootSignIn"
                />
            </div>
        </div>
        <div class="column items-center q-gutter-md" v-else>
            <div class="text-h5">Olá {{ displayNameUser }}</div>
            <q-img
                :src="avatar"
                style="border-radius: 100px; max-width: 200px"
                spinner-color="white"
            >
                <div class="fit flex flex-center full-width">
                    <q-btn
                        style="width: 100%; height: 100%"
                        round
                        flat
                        icon="cached"
                        size="xl"
                        :text-color="$q.dark.isActive ? 'white' : 'black'"
                        :to="{ name: 'Avatar' }"
                        aria-label="Definir Avatar"
                    />
                </div>
            </q-img>
            <q-btn
                outline
                label="Início"
                :to="{ name: 'Index' }"
                class="std-btn"
                aria-label="Início"
            />
            <q-btn
                outline
                label="Configurações"
                :to="{ name: 'Config' }"
                class="std-btn"
                aria-label="Configurações"
            />
            <q-btn
                outline
                label="Sair"
                @click="signOut"
                class="std-btn"
                aria-label="Logout"
            />
        </div>
    </q-page>
</template>

<script>
import firebase from "firebase/app"
import { firebaseAuth } from "boot/firebase"

export default {
    nome: "PageAuth",
    data() {
        return {
            sampleUrl: `https://placeimg.com/200/200/nature?t=${Math.random()}`,
        }
    },
    methods: {
        facebookSignIn() {
            const provider = new firebase.auth.FacebookAuthProvider()
            this.signIn(provider)
        },
        githubSignIn() {
            const provider = new firebase.auth.GithubAuthProvider()
            this.signIn(provider)
        },
        googleSignIn() {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.signIn(provider)
        },
        yahootSignIn() {
            const provider = new firebase.auth.OAuthProvider("yahoo.com")
            this.signIn(provider)
        },
        signIn(provider) {
            this.$q.localStorage.set("waitingAuth", true)
            firebaseAuth.signInWithRedirect(provider)
        },
        signOut() {
            firebaseAuth
                .signOut()
                .then(() => {
                    this.$q.notify({
                        message: "Tchau!",
                        color: "positive",
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.$q.notify({
                        message: error.message,
                        caption: error.code,
                        color: "negative",
                    })
                })
        },
    },
    computed: {
        hasUser() {
            return this.$store.getters["config/hasUser"]
        },
        avatar() {
            return (
                this.$store.getters["config/getUser"].avatarUrl ||
                this.sampleUrl
            )
        },
        displayNameUser() {
            return this.$store.getters["config/getUser"]?.displayName || ""
        },
    },
}
</script>
