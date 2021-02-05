<template>
    <q-layout view="hHh lpR fFf" :style="style">
        <q-header class="bg-transparent" dense></q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer class="bg-transparent" dense></q-footer>
    </q-layout>
</template>

<script>
import mixin from "assets/mixin"
export default {
    name: "ExternalLayout",
    mixins: [mixin],
    mounted() {
        this.$q.dark.set(this.$store.getters["config/getExternalConfig"].theme)
    },
    computed: {
        style() {
            return this.styleBackground(
                [...this.$store.getters["config/getExternalConfig"].colors],
                this.$store.getters["config/getExternalConfig"]
                    .gradientDirection
            )
        },
    },
}
</script>
