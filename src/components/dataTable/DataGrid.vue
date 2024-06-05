<script setup lang="ts">
defineSlots()

type PropsT = {
  value: unknown[]
  loading?: boolean
}

defineProps<PropsT>()
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
    <slot />
  </DataTable>
</template>
