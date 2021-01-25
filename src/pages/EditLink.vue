<template>
    <q-page class="flex flex-center">
        <div class="row justify-center" style="width: 100%">
            <q-card class="bg-secondary text-white col-10 col-md-6">
                <q-card-section>
                    <div class="text-h4">Link</div>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="name"
                        label="Nome"
                        label-color="white"
                        ref="nome"
                        dark
                        :rules="[
                            (val) => val.length > 0 || 'Campo Obrigatório',
                        ]"
                    />
                    <q-input
                        v-model="url"
                        label="URL"
                        label-color="white"
                        dark
                        ref="url"
                        :rules="[
                            (val) => val.length > 0 || 'Campo Obrigatório',
                            (val) => isValidUrl(val) || 'URL Inválida',
                        ]"
                    />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn outline class="col-3" @click="remove">Excluir</q-btn>
                    <q-btn outline class="col-4" @click="save">OK</q-btn>
                    <q-btn outline class="col-4" @click="cancel"
                        >Cancelar</q-btn
                    >
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script>
export default {
    name: "EditLink",
    props: {
        id: {
            type: String,
            required: false,
            default: "",
        },
    },
    data() {
        return {
            name: "",
            url: "",
            safeExit: false,
        }
    },
    methods: {
        isValidUrl(url) {
            const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
            return re.test(url)
        },
        exit() {
            this.$router.push({ name: "Index" })
        },
        save() {
            this.safeExit = true

            const payload = {
                id: this.id,
                bookmark: {
                    name: this.name,
                    url: this.url,
                },
            }

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
                    this.safeExit = true
                    this.$store.dispatch("config/removeBookmark", this.id)
                    this.exit()
                })
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.safeExit) {
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
        if (this.id) {
            const bookmark = this.$store.getters["config/getBookmarks"][this.id]

            this.name = bookmark.name
            this.url = bookmark.url
        }
    },
}
</script>

<style>
</style>
