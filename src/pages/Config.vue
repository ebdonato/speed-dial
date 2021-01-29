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
            </q-card-section>

            <q-separator dark />

            <q-card-actions align="right">
                <q-btn flat class="small-btn" @click="save">OK</q-btn>
                <q-btn flat class="small-btn">cancelar</q-btn>
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script>
export default {
    name: "PageConfig",
    data() {
        return {
            title: "",
            subtitle: "",
        }
    },
    methods: {
        save() {
            const config = {
                title: this.title,
                subtitle: this.subtitle,
            }

            this.$store.dispatch("config/updateConfig", config)
        },
    },
    mounted() {
        const config = this.$store.getters["config/getConfig"]

        this.title = config?.title ?? ""
        this.subtitle = config?.subtitle ?? ""
    },
}
</script>

<style>
</style>
