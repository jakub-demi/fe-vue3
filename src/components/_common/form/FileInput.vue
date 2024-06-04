<script setup lang="ts">
import type { FileUploadSelectEvent } from "primevue/fileupload"
import texts from "@/texts"

defineProps({
  chooseLabel: {
    type: String,
    required: false,
  },
  maxFileSize: {
    type: Number,
    required: false,
  },
  className: {
    type: String,
    required: false,
    default: "",
  },
  fileLimit: {
    type: Number,
    required: false,
  },
})

const _10MB = 10485760

const filesModel = defineModel("filesModel", { type: Array<File>, required: false })
const fileModel = defineModel("fileModel", { type: File, required: false })

const handleSelect = (event: FileUploadSelectEvent) => {
  filesModel.value = event.files
  fileModel.value = event.files[0]
}

const handleClear = () => {
  filesModel.value = undefined
  fileModel.value = undefined
}
</script>

<template>
  <FileUpload
    :choose-label="chooseLabel ?? texts.form.fileInput.chooseLabel"
    :custom-upload="true"
    @select="handleSelect"
    @clear="handleClear"
    mode="basic"
    :max-file-size="maxFileSize ?? _10MB"
    :file-limit="fileLimit && fileLimit > 0 ? fileLimit : 1"
    :class="className"
  />
</template>
