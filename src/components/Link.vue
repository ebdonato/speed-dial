<template>
    <div>
        <q-btn
            v-if="!editMode"
            type="a"
            :href="parseUrl(link.url)"
            class="std-btn q-ma-xs"
            :class="colorClass"
            :aria-label="link.name"
            no-caps
            v-touch-hold.mouse="handleHold"
        >
            <q-avatar size="1rem" square v-if="showIcons">
                <img :src="getIconUrl(link.url)" :alt="link.url" />
            </q-avatar>

            <div class="q-ml-sm col-grow">{{ link.name }}</div>
        </q-btn>
        <q-btn
            v-else
            @click="edit"
            class="std-btn q-ma-xs"
            :class="colorClass"
            :aria-label="link.name"
            no-caps
        >
            <q-avatar
                square
                text-color="white"
                icon="edit"
                size="1rem"
                class="q-mr-xs"
            />
            <div class="q-ml-sm col-grow">{{ link.name }}</div>
            <q-avatar
                square
                text-color="white"
                icon="menu"
                size="1rem"
                class="q-mr-xs handle"
            />
        </q-btn>
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
                    index: 0,
                    name: "stackoverflow",
                    url: "www.stackoverflow.com",
                }
            },
        },
        transparentButton: {
            type: Boolean,
            default: true,
        },
        enableHolding: {
            type: Boolean,
            default: false,
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
    computed: {
        colorClass() {
            const color = this.$q.dark.isActive
                ? "bg-dark-translucid"
                : "bg-translucid"
            return this.transparentButton ? "bg-transparent" : color
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
            if (this.enableHolding) {
                evt.preventDefault()
                evt.stopPropagation()
                this.$store.dispatch("config/setEditMode", true)
                this.edit()
            }
        },
        edit() {
            if (this.$store.getters["config/isEditMode"]) {
                this.$store.dispatch("config/setEditMode", false)
                this.$router.push(`edit/${this.id}`)
            }
        },
    },
}
</script>

