<template>
    <q-page class="flex flex-center">
        <q-header class="bg-transparent" dense>
            <q-toolbar class="row justify-end">
                <q-btn round @click="signOut" v-if="hasUser" size="xs">
                    <q-avatar size="xs">
                        <img :src="photoUser" />
                    </q-avatar>
                </q-btn>
                <q-btn
                    v-else
                    round
                    color="primary"
                    icon="login"
                    size="xs"
                    @click="signIn"
                />
            </q-toolbar>
        </q-header>
        <div
            class="flex justify-center items-center content-center q-gutter-md"
        >
            <Link
                v-for="(bookmark, key) in bookmarks"
                :key="key"
                :link="bookmark"
                :id="key"
                :editMode="toggleEdit"
            />
        </div>

        <img
            src="icons/favicon-96x96.png"
            v-if="Object.keys(bookmarks).length <= 0"
        />

        <q-footer class="bg-transparent" dense>
            <q-toolbar>
                <template v-if="hasUser">
                    <q-btn
                        round
                        color="203a43"
                        icon="edit"
                        size="xs"
                        @click="toggleEdit = !toggleEdit"
                    />
                    <q-space />
                    <q-btn
                        round
                        color="203a43"
                        icon="add"
                        size="xs"
                        :to="{ name: 'NewLink' }"
                    />
                </template>
            </q-toolbar>
        </q-footer>
    </q-page>
</template>

<script>
import firebase from "firebase/app"
import { firebaseAuth } from "boot/firebase"

export default {
    name: "PageIndex",
    data() {
        return {
            toggleEdit: false,
        }
    },
    components: {
        Link: () => import("components/Link"),
    },
    computed: {
        bookmarks() {
            return this.$store.getters["config/getBookmarks"]
        },
        hasUser() {
            return this.$store.getters["config/hasUser"]
        },
        photoUser() {
            return (
                this.$store.getters["config/getUser"]?.photoURL ||
                "https://cdn.quasar.dev/img/avatar2.jpg"
            )
        },
    },
    methods: {
        signIn() {
            const provider = new firebase.auth.GoogleAuthProvider()

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
}
</script>
