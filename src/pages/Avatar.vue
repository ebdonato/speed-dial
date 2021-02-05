<template>
    <q-page padding class="fit column justify-center q-gutter-sm">
        <div class="text-center text-h4 q-mb-xs">Avatar</div>
        <q-file
            filled
            v-model="selectedFile"
            v-if="!selectedFile"
            label="Escolher o arquivo"
        >
            <template v-slot:prepend>
                <q-icon name="attach_file" />
            </template>
        </q-file>

        <clipper-fixed
            class="my-clipper"
            ref="clipper"
            :src="imgURL"
            bg-color="transparent"
        >
        </clipper-fixed>

        <div
            class="q-gutter-sm q-mt-sm fit row wrap justify-center"
            v-if="selectedFile"
        >
            <q-btn
                outline
                class="std-btn"
                aria-label="Recortar"
                no-caps
                @click="getResult"
            >
                <q-avatar square icon="edit" size="1rem" class="q-mx-sm" />
                Recortar
            </q-btn>
            <q-btn
                outline
                class="std-btn"
                aria-label="Limpar"
                no-caps
                @click="selectedFile = null"
            >
                <q-avatar square icon="clear" size="1rem" class="q-mx-sm" />
                Limpar
            </q-btn>
        </div>

        <div class="q-gutter-sm q-mt-sm fit row wrap justify-center">
            <q-btn
                outline
                label="Voltar"
                class="std-btn"
                aria-label="white"
                @click="goBack"
            />
        </div>
    </q-page>
</template>

<script>
export default {
    name: "PageAvatar",
    data() {
        return {
            selectedFile: null,
            croppedImage: "",
        }
    },
    computed: {
        imgURL() {
            return this.selectedFile
                ? window.URL.createObjectURL(this.selectedFile)
                : ""
        },
    },
    methods: {
        getResult() {
            const dataURItoBlob = (dataURI) => {
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
                const byteString = atob(dataURI.split(",")[1])

                // separate out the mime component
                const mimeString = dataURI
                    .split(",")[0]
                    .split(":")[1]
                    .split(";")[0]

                // write the bytes of the string to an ArrayBuffer
                const ab = new ArrayBuffer(byteString.length)

                // create a view into the buffer
                const ia = new Uint8Array(ab)

                // set the bytes of the buffer to the correct values
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i)
                }

                // write the ArrayBuffer to a blob, and you're done
                const blob = new Blob([ab], { type: mimeString })
                return blob
            }

            const canvas = this.$refs.clipper.clip() //call component's clip method
            const imageURI = canvas.toDataURL("image/jpeg", 1) //canvas->image
            this.croppedImage = dataURItoBlob(imageURI)

            this.$store.dispatch("config/uploadUserAvatar", this.croppedImage)
            this.goBack()
        },
        goBack() {
            this.$router.back()
        },
    },
}
</script>

<style scoped>
.my-clipper {
    margin: 0 auto;
    width: 100%;
    max-width: 400px;
}
</style>
