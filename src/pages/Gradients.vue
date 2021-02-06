<template>
    <q-page padding class="flex column flex-center q-gutter-sm">
        <q-btn
            flat
            label="uiGradients"
            size="xl"
            no-caps
            type="a"
            target="blank"
            href="http://uiGradients.com"
        />
        <div class="row q-gutter-xs justify-center">
            <q-btn
                v-for="(gradient, id) in gradients"
                :key="id"
                no-caps
                class="col-12 col-md-5"
                :label="gradient.name"
                :style="{
                    background: style(gradient.colors),
                }"
                @click="click(gradient.colors)"
            />
        </div>
        <q-btn outline label="Voltar" class="std-btn" @click="exit" />
    </q-page>
</template>

<script>
import mixin from "assets/mixin"
export default {
    name: "PageGradients",
    mixins: [mixin],
    data() {
        return {
            gradients: [
                {
                    name: "Blu",
                    colors: ["#00416A", "#E4E5E6"],
                },
                {
                    name: "Ver",
                    colors: ["#FFE000", "#799F0C"],
                },
                {
                    name: "Ver Black",
                    colors: ["#F7F8F8", "#ACBB78"],
                },
                {
                    name: "Combi",
                    colors: ["#00416A", "#799F0C", "#FFE000"],
                },
            ],
        }
    },
    methods: {
        exit() {
            this.$router.push({ name: "Config" })
        },
        click(colors) {
            this.$store.commit("config/pickedGradientColors", colors)
            this.exit()
        },
        style(colors) {
            return this.styleBackground([...colors], "Horizontal").background
        },
    },
    mounted() {
        this.$store.commit("config/pickedGradientColors", [])
        this.$axios
            .get("https://uigradients.com/gradients.json")
            .then((response) => {
                this.gradients = [...response.data]
            })
            .catch((e) => {
                console.error(e)
                this.$q.notify({
                    message: "Algo deu errado",
                    color: "negative",
                })
            })
    },
}
</script>

