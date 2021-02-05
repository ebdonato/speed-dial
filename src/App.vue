<template>
    <div id="q-app">
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
