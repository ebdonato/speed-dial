<template>
    <q-page padding class="flex flex-center" ref="indexPage">
        <q-btn
            v-if="Object.keys(bookmarks).length <= 0"
            class="text-white std-btn"
            icon="add"
            :to="{ name: 'NewLink' }"
        >
            <div class="q-ml-sm col-grow">Novo Item</div>
        </q-btn>

        <q-card class="no-shadow bg-transparent">
            <q-card-section class="row justify-center q-pa-none">
                <Link
                    v-for="(bookmark, key) in bookmarks"
                    :key="key"
                    :link="bookmark"
                    :id="key"
                    :editMode="isEditMode"
                    :showIcons="showIcons"
                    :transparentButton="!wallpaper"
                    :enableHolding="true"
                />
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { dom } from "quasar"
const { height, width } = dom

export default {
    name: "PageIndex",
    components: {
        Link: () => import("components/Link"),
    },
    computed: {
        bookmarks() {
            return this.$store.getters["config/getBookmarks"]
        },
        isEditMode() {
            return this.$store.getters["config/isEditMode"]
        },
        showIcons() {
            return this.$store.getters["config/getConfig"]?.showIcons ?? true
        },
        wallpaper() {
            return (
                !!this.$store.getters["config/getConfig"].wallpaper &&
                this.$store.getters["config/getWallpaper"].blob
            )
        },
    },
    mounted() {
        const pageHeight = height(this.$refs.indexPage.$el)
        const pageWidth = width(this.$refs.indexPage.$el)

        this.$store.dispatch("config/loadWallpaper", {
            height: pageHeight,
            width: pageWidth,
        })
    },
}
</script>
