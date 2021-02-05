<template>
    <div>
        <template v-if="!editMode">
            <q-btn
                type="a"
                :href="parseUrl(link.url)"
                class="std-btn"
                :aria-label="link.name"
                no-caps
                v-touch-hold.mouse="handleHold"
            >
                <q-avatar size="1rem" square v-if="showIcons">
                    <img :src="getIconUrl(link.url)" :alt="link.url" />
                </q-avatar>

                <div class="q-ml-sm col-grow">{{ link.name }}</div>
            </q-btn>
        </template>

        <template v-else>
            <q-btn
                @click="edit"
                class="std-btn"
                :aria-label="link.name"
                no-caps
            >
                <q-avatar
                    square
                    color="red"
                    text-color="white"
                    icon="edit"
                    size="1rem"
                    class="q-mr-xs"
                />
                <div class="q-ml-sm col-grow">{{ link.name }}</div>
            </q-btn>
        </template>
    </div>
</template>

<script>
export default {
    name: "Link",
    props: {
        id: {
            type: String,
            default: "",
        },
        link: {
            type: Object,
            default: function () {
                return {
                    name: "stackoverflow",
                    url: "www.stackoverflow.com",
                }
            },
        },
        editMode: {
            type: Boolean,
            default: false,
        },
        showIcons: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        getIconUrl(url) {
            let startPosition = url.indexOf("://")
            startPosition = startPosition < 0 ? 0 : startPosition + 3
            // console.log(startPosition)

            let endPosition = url.indexOf("/", startPosition)
            endPosition = endPosition < 0 ? url.length : endPosition + 1
            // console.log(endPosition)

            const newUrl =
                "https://www.google.com/s2/favicons?sz=64&domain_url=" +
                (startPosition ? "" : "https://") +
                url.substr(0, endPosition)
            // console.log(newUrl)

            return newUrl
        },
        parseUrl(url) {
            return url.startsWith("http") ? url : `http://${url}`
        },
        handleHold({ evt }) {
            evt.preventDefault()
            evt.stopPropagation()
            this.edit()
        },
        edit() {
            this.$store.dispatch("config/setEditMode", false)
            this.$router.push(`edit/${this.id}`)
        },
    },
}
</script>

