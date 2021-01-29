<template>
    <q-page padding class="flex flex-center">
        <q-card
            class="bg-transparent text-white full-width"
            style="max-width: 400px"
        >
            <q-card-section>
                <div class="text-h6">Configurações</div>
            </q-card-section>

            <q-card-section class="q-gutter-sm">
                <q-input dark filled v-model="title" label="Título Externo" />
                <q-input
                    dark
                    filled
                    v-model="subtitle"
                    label="Subtítulo Externo"
                />
                <q-input
                    dark
                    filled
                    readonly
                    v-model="externalLink"
                    label="Link Externo"
                >
                    <template v-slot:after>
                        <q-btn
                            round
                            dense
                            flat
                            icon="content_copy"
                            @click="copyLink"
                        />
                    </template>
                </q-input>
            </q-card-section>

            <q-separator dark />

            <q-card-actions align="right">
                <q-btn flat class="small-btn" @click="save">OK</q-btn>
                <q-btn flat class="small-btn" :to="{ name: 'Auth' }"
                    >cancelar</q-btn
                >
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
import { copyToClipboard } from "quasar"
export default {
    name: "PageConfig",
    data() {
        return {
            title: "",
            subtitle: "",
        }
    },
    computed: {
        externalLink() {
            const uid = this.$store.getters["config/getUser"].uid
            return `${window.location.origin}/#/uid/${uid}`
        },
    },
    methods: {
        save() {
            const config = {
                title: this.title,
                subtitle: this.subtitle,
            }

            this.$store.dispatch("config/updateConfig", config)
            this.$router.push({ name: "Auth" })
        },
        copyLink() {
            copyToClipboard(this.externalLink)
                .then(() => {
                    this.$q.notify({
                        message: "Link copiado para a área de transferência!",
                        color: "positive",
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.$q.notify({
                        message: "Algo deu errado",
                        color: "negative",
                    })
                })
        },
    },
    mounted() {
        const config = this.$store.getters["config/getConfig"]

        this.title = config?.title ?? ""
        this.subtitle = config?.subtitle ?? ""
    },
}
</script>
