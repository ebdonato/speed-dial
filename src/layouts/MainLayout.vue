<template>
    <q-layout view="lhh LpR lff" :style="style">
        <q-header class="bg-transparent" dense>
            <q-toolbar class="row">
                <q-btn
                    flat
                    :label="productName"
                    no-caps
                    text-color="grey-8"
                    @click="autoClose"
                />
                <q-space />
                <q-btn
                    round
                    :to="{ name: 'Auth' }"
                    v-if="hasUser && showFooterButtons"
                    size="xs"
                >
                    <q-avatar size="sm">
                        <img :src="photoUser" alt="Avatar" />
                    </q-avatar>

                    <q-tooltip
                        :delay="1000"
                        anchor="center left"
                        self="center right"
                    >
                        Configurações
                    </q-tooltip>
                </q-btn>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <transition
                mode="out-in"
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
            >
                <router-view />
            </transition>
        </q-page-container>
        <q-footer class="bg-transparent" dense>
            <q-toolbar>
                <template v-if="hasUser && showFooterButtons">
                    <q-btn
                        round
                        icon="edit"
                        size="sm"
                        :text-color="$q.dark.isActive ? 'white' : 'black'"
                        @click="isEditMode = !isEditMode"
                        aria-label="Alternar modo edição"
                    >
                        <q-tooltip
                            :delay="1000"
                            anchor="center right"
                            self="center left"
                        >
                            Editar Links
                        </q-tooltip>
                    </q-btn>
                    <q-space />
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
                    <q-space />
                    <q-btn
                        round
                        icon="add"
                        size="sm"
                        :text-color="$q.dark.isActive ? 'white' : 'black'"
                        :to="{ name: 'NewLink' }"
                        aria-label="Adicionar novo link"
                    >
                        <q-tooltip
                            :delay="1000"
                            anchor="center left"
                            self="center right"
                        >
                            Novo Link
                        </q-tooltip>
                    </q-btn>
                </template>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import mixin from "assets/mixin"
import { productName } from "../../package.json"

export default {
    name: "MainLayout",
    mixins: [mixin],
    data() {
        return {
            productName,
        }
    },
    computed: {
        isEditMode: {
            get() {
                return this.$store.getters["config/isEditMode"]
            },
            set(value) {
                this.$store.dispatch("config/setEditMode", value)
            },
        },
        showFooterButtons() {
            return this.$store.getters["config/showFooterButtons"]
        },
        hasUser() {
            return this.$store.getters["config/hasUser"]
        },
        showWallpaper() {
            return (
                !!this.$store.getters["config/getConfig"].wallpaper &&
                this.$store.getters["config/getWallpaper"].blob
            )
        },
        photoUser() {
            return (
                this.$store.getters["config/getUser"]?.photoURL ||
                "https://cdn.quasar.dev/img/avatar2.jpg"
            )
        },
        style() {
            return this.showWallpaper
                ? this.styleWallpaper()
                : this.styleBackground(
                      [...this.$store.getters["config/getConfig"].colors],
                      this.$store.getters["config/getConfig"].gradientDirection
                  )
        },
    },
    methods: {
        autoClose() {
            let seconds = 5

            const dialog = this.$q.dialog({
                title: "Desenvolvido por",
                message: "Eduardo Batista Donato",
            })

            const timer = setInterval(() => {
                seconds--

                if (seconds <= 0) {
                    clearInterval(timer)
                    dialog.hide()
                }
            }, 1000)
        },
    },
    mounted() {
        this.$q.dark.set(this.$store.getters["config/getConfig"].theme)
        document.title = this.productName
    },
}
</script>
