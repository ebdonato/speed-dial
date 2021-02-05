<template>
    <q-page padding class="flex flex-center">
        <div
            class="flex flex-center column q-gutter-sm"
            v-if="!(bookmarks == '' && avatar == '')"
        >
            <div class="text-white text-h4">{{ title }}</div>

            <q-img
                :src="avatar"
                style="border-radius: 100px; max-width: 200px"
                spinner-color="white"
            />

            <div class="text-grey-6 text-h5">{{ subtitle }}</div>

            <q-btn
                v-if="Object.keys(bookmarks).length <= 0"
                class="text-white std-btn q-mt-sm"
            >
                <div class="q-ml-sm col-grow">Nenhum Link</div>
            </q-btn>

            <div
                class="flex justify-center items-center content-center q-gutter-md q-mt-sm"
            >
                <Link
                    v-for="(bookmark, key) in bookmarks"
                    :key="key"
                    :link="bookmark"
                    :id="key"
                    :showIcons="showIcons"
                />
            </div>
        </div>
        <q-spinner color="white" size="3em" :thickness="10" v-else />
    </q-page>
</template>

<script>
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
