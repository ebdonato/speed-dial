<template>
    <q-page class="flex flex-center">
        <div class="column items-center" v-if="!hasUser">
            <img src="icons/favicon-96x96.png" />
            <div class="q-mt-sm q-gutter-md">
                <q-btn
                    round
                    color="primary"
                    icon="eva-facebook"
                    @click="facebookSignIn"
                />
                <q-btn
                    round
                    color="primary"
                    icon="eva-google"
                    @click="googleSignIn"
                />
            </div>
        </div>
        <div class="column items-center q-gutter-md" v-else>
            <div class="text-h5 text-white">{{ displayNameUser }}</div>
            <img :src="photoUser" />
            <q-btn
                outline
                label="Início"
                color="white"
                :to="{ name: 'Index' }"
                class="small-btn"
            />
            <q-btn
                outline
                label="Sair"
                color="white"
                @click="signOut"
                class="small-btn"
            />
        </div>
    </q-page>
</template>

<script>
import firebase from "firebase/app"
import { firebaseAuth } from "boot/firebase"

export default {
    nome: "PageAuth",
    methods: {
        facebookSignIn() {
            const provider = new firebase.auth.FacebookAuthProvider()
            this.signIn(provider)
        },
        googleSignIn() {
            const provider = new firebase.auth.GoogleAuthProvider()
            this.signIn(provider)
        },
        signIn(provider) {
            firebaseAuth
                .signInWithPopup(provider)
                .then((result) => {
                    this.$q.notify({
                        message: `Olá ${result.user.displayName}`,
                        color: "primary",
                    })
                })
                .catch((error) => {
                    this.$q.notify({
                        message: error.message,
                        caption: error.code,
                        color: "negative",
                    })
                    console.error(error)
                })
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
        photoUser() {
            return (
                this.$store.getters["config/getUser"]?.photoURL ||
                "https://cdn.quasar.dev/img/avatar2.jpg"
            )
        },
        displayNameUser() {
            return (
                this.$store.getters["config/getUser"]?.displayName ||
                "Nome do Usuário"
            )
        },
    },
}
</script>
