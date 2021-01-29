<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-transparent" dense></q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer class="bg-transparent" dense></q-footer>
    </q-layout>
</template>

<script>
export default {
    name: "ExternalLayout",
    mounted() {
        this.$q.dark.set(this.$store.getters["config/getExternalConfig"].theme)
    },
}
</script>
