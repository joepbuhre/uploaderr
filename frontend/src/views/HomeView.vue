<template>
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="shadow-2xl flex">
            <div
                class="md:px-20 px-5 h-[75vh] py-6 bg-slate-100 rounded-md flex justify-between items-center flex-col relative"
            >
                <h1 class="font-bold text-2xl">Upload bestanden hier</h1>
                <div class="w-full h-full overflow-y-auto">
                    <div
                        v-for="(fl, i) in Object.values(fileUploads)"
                        class="border border-solid border-slate-400 rounded-md my-2 hover:bg-slate-200 w-full relative"
                    >
                        <div class="flex py-2 px-3">
                            <div class="w-full">
                                <p class="m-0 underline">{{ fl.file.name }}</p>
                                <span class="text-sm text-slate-700">{{ fl.file.type }}</span>
                            </div>
                            <div v-if="fl.progress > 0" class="mr-2">
                                {{ (fl.progress * 100).toFixed(2) }}%
                            </div>
                            <div class="w-[20px]">
                                <button v-if="fl.progress === 0" @click="removeFile(fl)">
                                    <Trash2 />
                                </button>
                                <button @click="startUpload(fl)" v-if="fl.isUploading === false && fl.progress > 0">
                                    <PlayCircle />
                                </button>
                                <button @click="pauseUpload(fl)" v-if="fl.isUploading && fl.progress > 0">
                                    <PauseCircle />
                                </button>
                            </div>
                        </div>
                        <div class="w-full h-[10px]">
                            <div
                                v-if="fl.progress > 0"
                                class="bg-blue-600 rounded-bl-md ease-linear duration-500 h-full"
                                :class="{'rounded-br-md': fl.progress === 1}"
                                :style="{ width: fl.progress * 100 + '%' }"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-5">
                    <button
                        @click="upload"
                        class="flex items-center gap-5 font-bold border-2 border-dashed border-gray-600 p-3 rounded-md"
                    >
                        <Upload :size="40" />
                        Selecteer bestanden
                        <!-- <span class="animate-ping absolute inline-flex h-44 w-44 rounded-full bg-green opacity-75"></span> -->
                        <input
                            ref="inputFile"
                            multiple
                            @change="handleInputFile"
                            type="file"
                            class="hidden"
                        />
                    </button>
                    <button @click="handleUpload">Upload</button>
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

<style lang="postcss">
html {
    @apply bg-blue-700 bg-opacity-60;
}
</style>

<script setup lang="ts">
import { Upload, Trash2 } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { api } from "../utils/api";
import * as tus from "tus-js-client";
import { PlayCircle } from "lucide-vue-next";
import { PauseCircle } from "lucide-vue-next";

const inputFile = ref<HTMLInputElement | null>(null);

const showUpload = ref(false);

interface fileObject {
    tusUpload?: tus.Upload;
    progress: number;
    file: File;
    isUploading: boolean;
}

const fileUploads = ref<{ [key: string]: fileObject }>({});

const handleUpload = () => {
    // Get the selected file from the input element
    Object.values(fileUploads.value).forEach((fileObj) => {
        const file = fileObj.file;

        fileObj["tusUpload"] = new tus.Upload(file, {
            endpoint: getUploadUrl.value,
            retryDelays: [0, 3000],

            metadata: {
                filename: file.name,
                filetype: file.type,
            },
            removeFingerprintOnSuccess: true,
            headers: {
                "x-api-key": window.VITE_PUBLIC_KEY || "",
                filename: file.name,
            },
            onError: function (error) {
                console.log("Failed because: " + error);
                fileObj.isUploading = false;
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                fileObj.progress = bytesUploaded / bytesTotal;
                fileObj.isUploading = true;
            },
            onSuccess: function () {
                //@ts-ignore
                fileObj.isUploading = false;
            },
        });

        fileObj["tusUpload"].start();
    });
};

const getUploadUrl = computed(() => {
    const url = new URL(window.location.toString())
    url.hash = ''
    url.pathname = '/api/file'
    
    return url.toString()
})

const upload = () => {
    if (inputFile.value) {
        inputFile.value.click();
    }
};

// Tus upload functions
const startUpload = (fl: fileObject) => {
    if(fl.tusUpload) {
        fl.tusUpload.start()
        fl.isUploading = true
    }
}
const pauseUpload = (fl: fileObject) => {
    if(fl.tusUpload) {
        fl.tusUpload.abort()
        fl.isUploading = false
    }
}

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
    if (_files) {
        Array.from(_files).forEach((fl: File) => {
            fileUploads.value[fl.name] = {
                file: fl,
                progress: 0,
                isUploading: false,
            };
        });
    }
};

const handleDrop = (e: DragEvent) => {
    unhighlight();
    let dt = e.dataTransfer;
    let _files = dt?.files;
    if (_files === undefined) {
        return;
    }

    Array.from(_files).forEach((fl) => {
        fileUploads.value[fl.name] = {
            file: fl,
            progress: 0,
            isUploading: false,
        };
    });
};

const removeFile = (fl: fileObject) => {
    delete fileUploads.value[fl.file.name];
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
