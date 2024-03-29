<template>
    <q-page padding class="flex flex-center">
        <div class="row justify-center" style="width: 100%">
            <q-card class="col-12 col-md-6">
                <q-card-section>
                    <div class="text-h6">Configurações</div>
                </q-card-section>

                <q-card-section class="q-gutter-sm">
                    <q-input
                        filled
                        v-model="config.title"
                        label="Título Externo"
                    />
                    <q-input
                        filled
                        v-model="config.subtitle"
                        label="Subtítulo Externo"
                    />
                    <q-select
                        filled
                        v-model="themeSelect"
                        :options="['Claro', 'Escuro']"
                        label="Cor do Texto"
                    />
                    <q-select
                        filled
                        v-model="iconSelect"
                        :options="['Sim', 'Não']"
                        label="Mostrar Ícones"
                    />
                    <q-select
                        filled
                        v-model="buttonOutlineSelect"
                        :options="['Sim', 'Não']"
                        label="Mostrar Bordas"
                    />
                    <q-select
                        filled
                        v-model="wallpaperSelect"
                        :options="['Sim', 'Não']"
                        label="Mostrar Wallpaper"
                    />
                    <q-input
                        filled
                        readonly
                        v-model="externalLink"
                        label="Link Externo"
                    >
                        <template v-slot:after>
                            <q-btn
                                round
                                dense
                                flat
                                icon="content_copy"
                                @click="copyLink"
                            />
                        </template>
                    </q-input>

                    <q-select
                        filled
                        v-model="config.gradientDirection"
                        :options="['Horizontal', 'Vertical', 'Diagonal']"
                        label="Direção Gradiente"
                    />

                    <q-input
                        filled
                        class="q-pb-xs"
                        v-model="selectedColor"
                        :rules="['anyColor']"
                        label="Escolha uma cor"
                    >
                        <template v-slot:prepend>
                            <q-icon name="colorize" class="cursor-pointer">
                                <q-popup-proxy
                                    transition-show="scale"
                                    transition-hide="scale"
                                >
                                    <q-color v-model="selectedColor" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>

                        <template v-slot:after>
                            <div
                                v-for="(color, index) of config.colors"
                                :key="index"
                                :style="{
                                    background: config.colors[index],
                                    border: 'solid 1px'
                                }"
                            >
                                <q-btn
                                    round
                                    dense
                                    flat
                                    icon="remove"
                                    @click="removeColor(index)"
                                    :disable="!(config.colors.length > 1)"
                                />
                            </div>
                            <q-btn dense flat icon="add" @click="addColor" />
                            <q-btn
                                dense
                                flat
                                icon="dehaze"
                                :to="{ name: 'Gradients' }"
                            />
                        </template>
                    </q-input>
                    <div
                        class="row items-center q-mt-xs"
                        :style="{
                            background: 'rgba(255, 255, 255, 0.1)'
                        }"
                    ></div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="center">
                    <q-btn outline class="small-btn" @click="save" label="OK" />
                    <q-btn
                        outline
                        class="small-btn"
                        :to="{ name: 'Auth' }"
                        label="Cancelar"
                    />
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { copyToClipboard } from "quasar";

export default {
    name: "PageConfig",
    data() {
        return {
            config: {},
            selectedColor: "#283c86"
        };
    },
    computed: {
        externalLink() {
            const uid = this.$store.getters["config/getUser"].uid;
            return `${window.location.origin}/#/uid/${uid}`;
        },
        themeSelect: {
            get() {
                return this.config.theme ? "Claro" : "Escuro";
            },
            set(value) {
                this.config.theme = value === "Claro";
            }
        },
        iconSelect: {
            get() {
                return this.config.showIcons ? "Sim" : "Não";
            },
            set(value) {
                this.config.showIcons = value == "Sim";
            }
        },
        wallpaperSelect: {
            get() {
                return this.config.wallpaper ? "Sim" : "Não";
            },
            set(value) {
                this.config.wallpaper = value == "Sim";
            }
        },
        buttonOutlineSelect: {
            get() {
                return this.config.buttonOutline ? "Sim" : "Não";
            },
            set(value) {
                this.config.buttonOutline = value == "Sim";
            }
        }
    },
    methods: {
        addColor() {
            const colors = [...this.config.colors];
            colors.push(this.selectedColor);
            this.config.colors = [...colors];
        },
        removeColor(index) {
            const colors = [...this.config.colors];
            colors.splice(index, 1);
            this.config.colors = [...colors];
        },
        save() {
            this.$q.dark.set(this.config.theme);
            this.$store.dispatch("config/updateConfig", this.config);
            this.$router.push({ name: "Auth" });
        },
        copyLink() {
            copyToClipboard(this.externalLink)
                .then(() => {
                    this.$q.notify({
                        message: "Link copiado para a área de transferência!",
                        color: "positive"
                    });
                })
                .catch(error => {
                    console.error(error);
                    this.$q.notify({
                        message: "Algo deu errado",
                        color: "negative"
                    });
                });
        }
    },
    mounted() {
        this.config = { ...this.$store.getters["config/getConfig"] };
        const pickedGradientColors = this.$store.getters[
            "config/getPickedGradientColors"
        ];

        if (pickedGradientColors.length > 0) {
            this.config.colors = pickedGradientColors;
            this.$store.commit("config/pickedGradientColors", []);
        }
    }
};
</script>
