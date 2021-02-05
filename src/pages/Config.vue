<template>
    <q-page padding class="flex flex-center">
        <div class="row justify-center" style="width: 100%">
            <q-card class="bg-transparent col-12 col-md-6">
                <q-card-section>
                    <div class="text-h6">Configurações</div>
                </q-card-section>

                <q-card-section class="q-gutter-sm">
                    <q-input
                        filled
                        v-model="config.title"
                        label="Título Externo"
                    />
                    <q-input
                        filled
                        v-model="config.subtitle"
                        label="Subtítulo Externo"
                    />
                    <q-select
                        filled
                        v-model="themeSelect"
                        :options="['Claro', 'Escuro']"
                        label="Cor do Texto"
                    />
                    <q-select
                        filled
                        v-model="iconSelect"
                        :options="['Sim', 'Não']"
                        label="Mostrar Ícones"
                    />
                    <q-input
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

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat class="small-btn" @click="save">OK</q-btn>
                    <q-btn flat class="small-btn" :to="{ name: 'Auth' }"
                        >Cancelar</q-btn
                    >
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { copyToClipboard } from "quasar"
export default {
    name: "PageConfig",
    data() {
        return {
            config: {},
        }
    },
    computed: {
        externalLink() {
            const uid = this.$store.getters["config/getUser"].uid
            return `${window.location.origin}/#/uid/${uid}`
        },
        themeSelect: {
            get() {
                return this.config.theme ? "Claro" : "Escuro"
            },
            set(value) {
                this.$q.dark.set(value === "Claro")
                this.config.theme = this.$q.dark.isActive
            },
        },
        iconSelect: {
            get() {
                return this.config.showIcons ? "Sim" : "Não"
            },
            set(value) {
                this.config.showIcons = value == "Sim"
            },
        },
    },
    methods: {
        save() {
            this.$store.dispatch("config/updateConfig", this.config)
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
        this.config = { ...this.$store.getters["config/getConfig"] }
    },
}
</script>
