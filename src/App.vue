<template>
    <div id="q-app" class="bg-background">
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App",
}
</script>
<style scoped lang="sass">
.bg-background
    height: 100%
    width: 100%
    background: $primary
    background: -webkit-linear-gradient(to bottom, $primary, $secondary, $dark)
    background: linear-gradient(to bottom, $primary, $secondary, $dark )
</style>
