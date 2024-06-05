<script setup lang="ts">
import TheButton from "@/components/_common/form/TheButton.vue"
import router from "@/router"

defineSlots()

type PropsT = {
  value: unknown[]
  loading?: boolean
  createBtnTarget?: string
  createBtnText?: string
  createBtnClickHandler?: Function
}

const props = withDefaults(defineProps<PropsT>(), {
  header: false,
  createBtnText: "Create",
})

const handleClick = (): void => {
  props.createBtnClickHandler ? props.createBtnClickHandler() : createNew()
}

const createNew = (): void => {
  router.push({ name: `${props.createBtnTarget}.create` })
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
  >
    <template
      v-if="createBtnTarget"
      #header
    >
      <TheButton
        icon="pi pi-plus"
        :text="createBtnText"
        :handle-click="handleClick"
      />
    </template>

    <slot />
  </DataTable>
</template>
