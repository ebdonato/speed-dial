<template>
    <q-page class="flex flex-center">
        <q-card v-if="!hasUser">
            <q-card-section class="column items-center">
                <img src="icons/favicon-96x96.png" alt="Logo" />
                <div class="q-mt-sm q-gutter-md">
                    <q-btn
                        round
                        flat
                        icon="ion-logo-github"
                        aria-label="Login com Github"
                        @click="githubSignIn"
                    />
                    <q-btn
                        round
                        flat
                        icon="ion-logo-google"
                        aria-label="Login com Google"
                        @click="googleSignIn"
                    />
                    <q-btn
                        round
                        flat
                        icon="ion-logo-facebook"
                        aria-label="Login com Facebook"
                        @click="facebookSignIn"
                    />
                    <q-btn
                        round
                        flat
                        icon="ion-logo-yahoo"
                        aria-label="Login com Yahoo"
                        @click="yahootSignIn"
                    />
                </div>
            </q-card-section>
        </q-card>
        <q-card v-else>
            <q-card-section class="column items-center q-gutter-md">
                <div class="text-h5">Olá {{ displayNameUser }}</div>
                <q-img
                    :src="avatar"
                    style="border-radius: 100px; max-width: 200px"
                    spinner-color="white"
                >
                    <div class="fit flex flex-center full-width q-gutter-xs">
                        <q-btn
                            round
                            icon="cached"
                            size="xl"
                            :to="{ name: 'Avatar' }"
                            aria-label="Definir Avatar"
                            flat
                        >
                            <q-tooltip :delay="1000">
                                Definir Avatar
                            </q-tooltip>
                        </q-btn>
                        <q-btn
                            v-if="hasAvatar"
                            round
                            icon="clear"
                            size="xl"
                            @click="deleteAvatar"
                            aria-label="Remover Avatar"
                            flat
                        >
                            <q-tooltip :delay="1000">
                                Remover Avatar
                            </q-tooltip>
                        </q-btn>
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
            </q-card-section>
        </q-card>
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
        deleteAvatar() {
            this.$q
                .dialog({
                    title: "Avatar",
                    message: "Excluir o avatar?",
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    this.$store.dispatch("config/deleteUserAvatar")
                })
        },
    },
    computed: {
        hasUser() {
            return this.$store.getters["config/hasUser"]
        },
        hasAvatar() {
            return !!this.$store.getters["config/getUser"].avatarUrl
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

