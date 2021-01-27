<template>
    <div id="q-app" class="bg-background">
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App",
    beforeCreate() {
        const waitingAuth = this.$q.localStorage.getItem("waitingAuth") ?? false

        setTimeout(() => {
            this.$q.loading.hide()
        }, 20000)

        waitingAuth &&
            this.$q.loading.show({
                delay: 400, // ms
                backgroundColor: "black",
            })
    },
}
</script>
<style scoped lang="sass">
.bg-background
    height: 100%
    width: 100%
    background: $primary
    background: -webkit-linear-gradient(to right bottom, $accent, $primary, $secondary)
    background: linear-gradient(to right bottom, $accent, $primary, $secondary )
</style>
