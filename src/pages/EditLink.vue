<template>
    <q-page padding class="flex flex-center">
        <div class="row justify-center" style="width: 100%">
            <q-card class="col-12 col-md-6">
                <q-card-section>
                    <div class="text-h4">Link</div>
                </q-card-section>

                <q-form @submit="save" @reset="reset" ref="formEditLink">
                    <q-card-section>
                        <q-input
                            v-model="bookmark.name"
                            label="Nome"
                            ref="name"
                            lazy-rules
                            :rules="[
                                (val) => val.length > 0 || 'Campo Obrigatório',
                            ]"
                        />
                        <q-input
                            v-model="bookmark.url"
                            label="URL"
                            lazy-rules
                            ref="url"
                            :rules="[
                                (val) => val.length > 0 || 'Campo Obrigatório',
                                (val) => isValidUrl(val) || 'URL Inválida',
                            ]"
                        />
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn
                            outline
                            class="col-3"
                            @click.prevent="remove"
                            v-if="id"
                            >Excluir</q-btn
                        >
                        <q-btn outline class="col-4" type="submit">OK</q-btn>
                        <q-btn outline class="col-4" @click.prevent="cancel"
                            >Cancelar</q-btn
                        >
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </q-page>
</template>

<script>
export default {
    name: "PageEditLink",
    props: {
        id: {
            type: String,
            required: false,
            default: "",
        },
    },
    data() {
        return {
            bookmark: {
                index: 0,
                name: "",
                url: "",
            },
            initialBookmark: {
                index: 0,
                name: "",
                url: "",
            },
        }
    },
    computed: {
        isSafe() {
            return !Object.keys(this.initialBookmark).some(
                (value) => this.initialBookmark[value] !== this.bookmark[value]
            )
        },
    },
    methods: {
        isValidUrl(url) {
            const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
            return re.test(url)
        },
        backup() {
            Object.assign(this.initialBookmark, this.bookmark)
        },
        reset() {
            Object.assign(this.bookmark, this.initialBookmark)
        },
        exit() {
            this.$router.push({ name: "Index" })
        },
        save() {
            const payload = {
                id: this.id,
                bookmark: {
                    index: this.bookmark.index,
                    name: this.bookmark.name,
                    url: this.bookmark.url,
                },
            }
            this.backup()
            this.$store.dispatch("config/updateBookmark", payload)
            this.exit()
        },
        cancel() {
            this.exit()
        },
        remove() {
            this.$q
                .dialog({
                    title: "Confirme",
                    message:
                        "Tem certeza que deseja excluir? Não poderá ser desfeito.",
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    this.$store.dispatch("config/removeBookmark", this.id)
                    this.reset()
                    this.exit()
                })
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.isSafe) {
            next()
        } else {
            this.$q
                .dialog({
                    title: "Confirme",
                    message:
                        "Alterações não salvas serão perdidas. Tem certeza que deseja sair?",
                    cancel: true,
                    persistent: true,
                })
                .onOk(() => {
                    next()
                })
                .onCancel(() => {
                    next(false)
                })
        }
    },
    mounted() {
        const bookmarks = this.$store.getters["config/getBookmarks"]

        if (this.id) {
            this.bookmark.index = bookmarks[this.id]?.index ?? 0
            this.bookmark.name = bookmarks[this.id].name
            this.bookmark.url = bookmarks[this.id].url

            this.backup()
        } else {
            const maxIndex = Object.values(bookmarks).reduce((max, el) => {
                const currentIndex = el?.index ?? 0

                return currentIndex > max ? currentIndex : max
            }, 0)
            this.bookmark.index = maxIndex + 1
            this.initialBookmark.index = maxIndex + 1
        }
    },
}
</script>

<style>
</style>
