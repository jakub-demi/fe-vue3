<script setup lang="ts">
import dialogStore from "@/stores/dialogStore"
import { computed } from "vue"
import TheButton from "@/components/_common/form/TheButton.vue"
import texts from "@/texts"

const store = computed(() => dialogStore())

const handleConfirm = () => {
  store.value.current.confirmFn !== undefined && store.value.current.confirmFn()

  store.value.doReset()
}

const handleDecline = () => {
  store.value.current.declineFn ? store.value.current.declineFn() : void 0

  store.value.doReset()
}
</script>

<template>
  <Dialog
    v-model:visible="store.current.visible"
    modal
    :header="
      store.current.headerText ??
      (store.current.confirmFn ? texts.dialog.headers.confirm : texts.dialog.headers.info)
    "
    :class="['w-96', store.current.className]"
    :draggable="false"
    @hide="store.doReset"
  >
    <div class="p-text-secondary mb-5">{{ store.current.text }}</div>
    <div class="flex justify-content-end gap-2">
      <TheButton
        v-if="store.current.confirmFn"
        :text="store.current.confirmBtnText ?? texts.dialog.buttons.confirm"
        :handle-click="handleConfirm"
        icon="pi pi-check"
      />
      <TheButton
        :autofocus="true"
        :text="
          store.current.declineBtnText ??
          (store.current.confirmFn ? texts.dialog.buttons.decline : texts.dialog.buttons.ok)
        "
        :handle-click="handleDecline"
        icon="pi pi-times"
      />
    </div>
  </Dialog>
</template>
