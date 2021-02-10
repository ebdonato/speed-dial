<template>
    <q-page class="flex flex-center" ref="externalIndexPage">
        <div
            class="flex flex-center column"
            v-if="!(bookmarks == '' && avatar == '')"
        >
            <div
                class="text-h4 full-width q-pa-sm text-center"
                :class="colorClass"
                v-if="title"
            >
                {{ title }}
            </div>
            <div
                class="text-h6 full-width q-pa-xs text-center"
                :class="colorClass"
                v-if="subtitle"
            >
                {{ subtitle }}
            </div>

            <q-img
                :src="avatar"
                style="border-radius: 100px; max-width: 200px"
                spinner-color="white"
                class="shadow-8 q-my-md"
                v-if="avatar"
            />
            <q-btn
                v-if="Object.keys(bookmarks).length <= 0"
                class="text-white std-btn q-mt-sm q-px-xl"
            >
                <div class="q-ml-sm col-grow">Nenhum Link</div>
            </q-btn>
            <div class="row justify-center q-pa-none q-mt-sm">
                <Link
                    v-for="(bookmark, key) in bookmarks"
                    :key="key"
                    :link="bookmark"
                    :id="key"
                    :showIcons="showIcons"
                    :transparentButton="!wallpaper"
                />
            </div>
        </div>
        <q-spinner color="white" size="3em" :thickness="10" v-else />
    </q-page>
</template>

<script>
import { dom } from "quasar"
const { height, width } = dom

import { defaultConfig } from "assets/default"

export default {
    name: "ExternalIndex",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        Link: () => import("components/Link"),
    },
    computed: {
        bookmarks() {
            return this.$store.getters["config/getExternalBookmarks"]
        },
        avatar() {
            return this.$store.getters["config/getExternalAvatarUrl"]
        },
        title() {
            return this.$store.getters["config/getExternalConfig"]?.title ?? ""
        },
        subtitle() {
            return (
                this.$store.getters["config/getExternalConfig"]?.subtitle ?? ""
            )
        },
        showIcons() {
            return (
                this.$store.getters["config/getExternalConfig"]?.showIcons ??
                true
            )
        },
        wallpaper() {
            return (
                !!this.$store.getters["config/getExternalConfig"].wallpaper &&
                !!this.$store.getters["config/getWallpaper"].blob
            )
        },
        colorClass() {
            const color = this.$q.dark.isActive
                ? "bg-dark-translucid"
                : "bg-translucid"
            return this.wallpaper ? color : "bg-transparent"
        },
    },
    mounted() {
        const pageHeight = height(this.$refs.externalIndexPage.$el)
        const pageWidth = width(this.$refs.externalIndexPage.$el)

        this.$store.dispatch("config/loadWallpaper", {
            height: pageHeight,
            width: pageWidth,
        })
    },
    beforeMount() {
        const externalInfo = this.$q.localStorage.getItem(this.id)

        if (externalInfo) {
            this.$store.commit(
                "config/setExternalAvatarUrl",
                externalInfo?.url ?? ""
            )
            this.$store.commit(
                "config/updateExternalBookmarks",
                externalInfo?.bookmarks ?? ""
            )
            this.$store.commit(
                "config/updateExternalConfig",
                externalInfo?.config ?? { ...defaultConfig }
            )
        }

        this.$store.dispatch("config/loadExternalBookmarks", this.id)
        this.$store.dispatch("config/loadAvatar", this.id)
        this.$store.dispatch("config/loadConfig", this.id)
    },
}
</script>
