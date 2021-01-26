<template>
    <q-page padding class="flex flex-center">
        <q-header class="bg-transparent" dense>
            <q-toolbar class="row">
                <q-btn
                    flat
                    label="Speed Dial 1982"
                    no-caps
                    text-color="secondary"
                    @click="autoClose"
                />
                <q-space />
                <q-btn round @click="signOut" v-if="hasUser" size="xs">
                    <q-avatar size="sm">
                        <img :src="photoUser" alt="Avatar" />
                    </q-avatar>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-btn
            v-if="Object.keys(bookmarks).length <= 0"
            class="text-white std-btn"
            icon="add"
            :to="{ name: 'NewLink' }"
        >
            <div class="q-ml-sm col-grow">Novo Item</div>
        </q-btn>
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

        <q-footer class="bg-transparent" dense>
            <q-toolbar>
                <template v-if="hasUser">
                    <q-btn
                        round
                        icon="edit"
                        size="sm"
                        @click="toggleEdit = !toggleEdit"
                        aria-label="Alternar modo edição"
                    />
                    <q-space />
                    <q-btn
                        round
                        icon="add"
                        size="sm"
                        :to="{ name: 'NewLink' }"
                        aria-label="Adicionar novo link"
                    />
                </template>
            </q-toolbar>
        </q-footer>
    </q-page>
</template>

<script>
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
        autoClose() {
            let seconds = 5

            const dialog = this.$q
                .dialog({
                    dark: true,
                    title: "Desenvolvido por",
                    message: "Eduardo Batista Donato",
                })
                .onOk(() => {
                    // console.log('OK')
                })
                .onCancel(() => {
                    // console.log('Cancel')
                })
                .onDismiss(() => {
                    clearTimeout(timer)
                    // console.log('I am triggered on both OK and Cancel')
                })

            const timer = setInterval(() => {
                seconds--

                if (seconds <= 0) {
                    clearInterval(timer)
                    dialog.hide()
                }
            }, 1000)
        },
    },
}
</script>
