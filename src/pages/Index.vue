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

        <draggable
            handle=".handle"
            class="row justify-center q-pa-none"
            v-model="bookmarks"
        >
            <Link
                v-for="bookmark in bookmarks"
                :key="bookmark.key"
                :link="bookmark"
                :id="bookmark.key"
                :editMode="isEditMode"
                :showIcons="showIcons"
                :transparentButton="!wallpaper"
                :enableHolding="true"
            />
        </draggable>
    </q-page>
</template>

<script>
import draggable from "vuedraggable"
import { dom } from "quasar"
const { height, width } = dom

export default {
    name: "PageIndex",
    components: {
        Link: () => import("components/Link"),
        draggable,
    },
    computed: {
        bookmarks: {
            set(value) {
                const sortedBookmarks = value.map((el, index) => {
                    return {
                        ...el,
                        index,
                    }
                })
                this.$store.dispatch(
                    "config/setBookmarksFromArray",
                    sortedBookmarks
                )
            },
            get() {
                const links = this.$store.getters["config/getBookmarks"]
                return Object.keys(links)
                    .map((key) => {
                        return {
                            ...links[key],
                            key,
                        }
                    })
                    .sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0))
            },
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
