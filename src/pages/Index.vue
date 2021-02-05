<template>
    <q-page padding class="flex flex-center">
        <q-btn
            v-if="Object.keys(bookmarks).length <= 0"
            class="text-white std-btn"
            icon="add"
            :to="{ name: 'NewLink' }"
        >
            <div class="q-ml-sm col-grow">Novo Item</div>
        </q-btn>
        <div
            class="flex justify-center items-center content-center q-gutter-md"
        >
            <Link
                v-for="(bookmark, key) in bookmarks"
                :key="key"
                :link="bookmark"
                :id="key"
                :editMode="isEditMode"
                :showIcons="showIcons"
            />
        </div>
    </q-page>
</template>

<script>
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
    },
}
</script>
