<template>
    <div
        class="bg-green-200 w-screen h-screen flex justify-center items-center"
    >
        <div class="shadow-2xl flex">
            <div
                class="px-20 md:h-[75vh] py-6 bg-slate-100 rounded-md flex justify-between items-center flex-col relative"
            >
                <h1 class="font-bold text-2xl">Upload bestanden hier</h1>
                <div class="w-full h-full overflow-y-auto">
                    <div
                    v-for="(fl, i) in files"
                    class="border border-solid border-slate-400 rounded-md my-2 py-2 px-3 flex hover:bg-slate-200 w-full "
                >
                    <div class="w-full">
                        <p class="m-0 underline">{{ fl.name }}</p>
                        <span class="text-sm text-slate-700">{{
                            fl.type
                        }}</span>
                    </div>
                    <div class="w-[20px]">
                        <button @click="files.splice(i, 1)"><Trash2 /></button>
                    </div>
                </div>
                </div>
                <div class="flex gap-5">
                    <button
                        @click="upload"
                        class="flex items-center gap-5 font-bold border-2 border-dashed border-gray-600 p-3 rounded-md"
                    >
                        <Upload :size="40" />
                        Upload bestanden
                        <!-- <span class="animate-ping absolute inline-flex h-44 w-44 rounded-full bg-green opacity-75"></span> -->
                        <input
                            ref="inputFile"
                            multiple
                            @change="handleInputFile"
                            type="file"
                            class="hidden"
                        />
                    </button>
                    <button @click="confirmUpload">Upload</button>
                </div>
            </div>
        </div>
    </div>
    <div
        v-if="showUpload"
        @dragleave="unhighlight"
        @drop="handleDrop"
        ref="dropzone"
        class="fixed inset-0 m-9 flex justify-center items-top p-5 bg-slate-200 bg-opacity-60 z-50 border-4 rounded-md border-dashed border-black"
    >
        <p class="text-4xl">Drop to upload</p>
    </div>
</template>

<script setup lang="ts">
import { Upload, Trash2 } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { api } from "../utils/api";

const inputFile = ref<HTMLInputElement | null>(null);

const showUpload = ref(false);

const files = ref<File[]>([]);

const upload = () => {
    if (inputFile.value) {
        console.log(inputFile.value.click());
    }
};

const preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
};

const highlight = () => {
    showUpload.value = true;
};

const unhighlight = () => {
    showUpload.value = false;
};

const handleInputFile = (e: Event) => {
    if (e.currentTarget === null) {
        return;
    }
    let _files: FileList | null = (<HTMLInputElement>e.currentTarget).files;
    console.log(_files);
    if (_files) {
        files.value = files.value.concat(Array.from(_files));
    }
};

const handleDrop = (e: DragEvent) => {
    unhighlight();
    let dt = e.dataTransfer;
    let _files = dt?.files;
    if (_files === undefined) {
        return;
    }

    files.value = files.value.concat(Array.from(_files));

};

const confirmUpload = () => {
    const fdata = new FormData();
    files.value.forEach((fl: File) => {
        fdata.append("document", fl);
    });

    api.post("/document/create", fdata)
        .then((res) => {
            console.log("success");
            files.value = []
        })
        .catch((err) => {
            console.log("err");
        });
};

const dropzone = ref<HTMLInputElement | null>(null);

onMounted(() => {

    const $el = document.querySelector("body");
    if ($el) {
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            window.addEventListener(eventName, preventDefaults, false);
        });
        ["dragover"].forEach((eventName) => {
            window.addEventListener(eventName, highlight, false);
        });
    }
});
</script>
