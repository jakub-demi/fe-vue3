<script setup lang="ts">
import TheButton from "@/components/_common/form/TheButton.vue"
import router from "@/router"
import type { PVDataTableEditModeT } from "@/types/primevue"
import type { DataTableRowEditCancelEvent, DataTableRowEditSaveEvent } from "primevue/datatable"

defineSlots()

type PropsT = {
  value: unknown[]
  loading?: boolean
  createBtnTarget?: string
  createBtnText?: string
  createBtnClickHandler?: Function
  backBtnTarget?: string
  backBtnText?: string
  editMode?: PVDataTableEditModeT
  dataKey?: string
  handleRowEditSave?: (event: DataTableRowEditSaveEvent) => void
  handleRowEditCancel?: (event: DataTableRowEditCancelEvent) => void
}

const props = withDefaults(defineProps<PropsT>(), {
  header: false,
  createBtnText: "Create",
  backBtnText: "Back",
})

const editingRows = defineModel("editingRows", { type: Array<any>, required: false })

const handleCreate = (): void => {
  props.createBtnClickHandler ? props.createBtnClickHandler() : createNew()
}

const createNew = (): void => {
  router.push({ name: `${props.createBtnTarget}.create` })
}

const handleBack = (): void => {
  router.push({ name: props.backBtnTarget })
}
</script>

<template>
  <DataTable
    :loading="loading"
    :value="value"
    :rows="15"
    :paginator="true"
    :rows-per-page-options="[5, 15, 25, 35, 45]"
    paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    show-gridlines
    class="lg:min-w-[50rem]"
    v-model:editing-rows="editingRows"
    :edit-mode="editMode"
    :data-key="dataKey"
    @row-edit-save="handleRowEditSave"
    @row-edit-cancel="handleRowEditCancel"
  >
    <template
      v-if="backBtnTarget || createBtnTarget"
      #header
    >
      <div class="flex flex-row gap-2">
        <TheButton
          v-if="backBtnTarget"
          icon="pi pi-arrow-left"
          :text="backBtnText"
          :handle-click="handleBack"
        />
        <TheButton
          v-if="createBtnTarget"
          icon="pi pi-plus"
          :text="createBtnText"
          :handle-click="handleCreate"
        />
      </div>
    </template>

    <slot />
  </DataTable>
</template>
