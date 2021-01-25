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
<style scoped>
.bg-background {
    height: 100%;
    width: 100%;
    background: #2c5364; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to bottom,
        #2c5364,
        #203a43,
        #0f2027
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to bottom,
        #2c5364,
        #203a43,
        #0f2027
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
