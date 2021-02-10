<template>
    <q-layout view="lhh LpR lff" :style="style">
        <q-header class="bg-transparent" dense> </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer :class="colorClass" dense>
            <q-btn
                v-if="showWallpaper && wallpaperInfo.info"
                size="sm"
                flat
                :label="`Foto de ${wallpaperInfo.info.author}`"
                type="a"
                :href="wallpaperInfo.info.url"
                target="_blank"
                :text-color="$q.dark.isActive ? 'white' : 'black'"
            />
        </q-footer>
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
        title() {
            return this.$store.getters["config/getExternalConfig"]?.title ?? ""
        },
        subtitle() {
            return (
                this.$store.getters["config/getExternalConfig"]?.subtitle ?? ""
            )
        },
        showWallpaper() {
            return (
                !!this.$store.getters["config/getExternalConfig"].wallpaper &&
                !!this.$store.getters["config/getWallpaper"].blob
            )
        },
        colorClass() {
            const color = this.$q.dark.isActive
                ? "bg-dark-translucid"
                : "bg-translucid"
            return this.showWallpaper ? color : "bg-transparent"
        },
        style() {
            return this.showWallpaper
                ? this.styleWallpaper()
                : this.styleBackground(
                      [
                          ...this.$store.getters["config/getExternalConfig"]
                              .colors,
                      ],
                      this.$store.getters["config/getExternalConfig"]
                          .gradientDirection
                  )
        },
    },
}
</script>
