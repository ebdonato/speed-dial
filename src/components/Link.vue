<template>
    <q-btn
        @click="clickButton"
        class="std-btn q-ma-xs"
        :class="colorClass"
        :aria-label="link.name"
        no-caps
        v-touch-hold.mouse="handleHold"
        :ripple="false"
        :outline="buttonOutline"
    >
        <div v-if="editMode">
            <q-avatar
                square
                text-color="white"
                icon="menu"
                size="1rem"
                class="q-mr-xs handle"
            />
        </div>
        <div v-else>
            <q-avatar size="1rem" square v-if="showIcons">
                <img :src="getIconUrl(link.url)" :alt="link.url" />
            </q-avatar>
        </div>

        <div class="q-ml-sm col-grow">{{ link.name }}</div>
    </q-btn>
</template>

<script>
export default {
    name: "Link",
    props: {
        id: {
            type: String,
            default: ""
        },
        link: {
            type: Object,
            default: function() {
                return {
                    index: 0,
                    name: "stackoverflow",
                    url: "www.stackoverflow.com"
                };
            }
        },
        transparentButton: {
            type: Boolean,
            default: true
        },
        enableHolding: {
            type: Boolean,
            default: false
        },
        editMode: {
            type: Boolean,
            default: false
        },
        showIcons: {
            type: Boolean,
            default: true
        },
        buttonOutline: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        colorClass() {
            const color = this.$q.dark.isActive
                ? "bg-dark-translucid"
                : "bg-translucid";
            return this.transparentButton ? "bg-transparent" : color;
        }
    },
    methods: {
        getIconUrl(url) {
            let startPosition = url.indexOf("://");
            startPosition = startPosition < 0 ? 0 : startPosition + 3;
            // console.log(startPosition)

            let endPosition = url.indexOf("/", startPosition);
            endPosition = endPosition < 0 ? url.length : endPosition + 1;
            // console.log(endPosition)

            const newUrl =
                "https://www.google.com/s2/favicons?sz=64&domain_url=" +
                (startPosition ? "" : "https://") +
                url.substr(0, endPosition);
            // console.log(newUrl)

            return newUrl;
        },
        parseUrl(url) {
            return url.startsWith("http") ? url : `http://${url}`;
        },
        handleHold({ evt }) {
            if (this.enableHolding && !this.editMode) {
                evt.preventDefault();
                evt.stopPropagation();
                this.$store.dispatch("config/setEditMode", true);
                this.clickButton();
            }
        },
        clickButton() {
            if (this.editMode) {
                this.$store.dispatch("config/setEditMode", false);
                this.$router.push(`edit/${this.id}`);
            } else {
                window.location = this.link.url;
            }
        }
    }
};
</script>

<style lang="sass">
.sortable-ghost
    opacity: 0
.sortable-drag
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
</style>
