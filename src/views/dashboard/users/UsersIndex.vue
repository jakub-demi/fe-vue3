<script setup lang="ts">
import DataGrid from "@/components/dataTable/DataGrid.vue"
import texts from "@/texts"
import type { UserDataTableT, UserTableSlotPropsT } from "@/types"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import { ref, onMounted } from "vue"
import { getUsersForTable } from "@/utils/services/userService"
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import IconSizeWrap from "@/components/icons/IconSizeWrap.vue"

const usersTable = ref<UserDataTableT[]>([])
const loading = ref<boolean>(true)

const handleDataLoad = async () => {
  loading.value = true
  await getUsersForTable(usersTable)
  loading.value = false
}

onMounted(handleDataLoad)
</script>

<template>
  <DataGrid
    :value="usersTable"
    :loading="loading"
    create-btn-target="users"
  >
    <Column
      :header="texts.users.table.headers.firstname"
      field="firstname"
    />
    <Column
      :header="texts.users.table.headers.lastname"
      field="lastname"
    />
    <Column
      :header="texts.users.table.headers.email"
      field="email"
    />
    <Column
      :header="texts.users.table.headers.isAdmin"
      field="is_admin"
    >
      <template #body="slotProps: UserTableSlotPropsT">
        <IconSizeWrap v-if="!!slotProps.data.is_admin">
          <CheckIcon />
        </IconSizeWrap>
        <IconSizeWrap v-else>
          <XMarkIcon />
        </IconSizeWrap>
      </template>
    </Column>
    <Column :header="texts.table.headers.actions">
      <template #body="slotProps: UserTableSlotPropsT">
        <ActionsMenu
          :id="slotProps.data.id"
          route="users"
          :handle-reload-async-fn="handleDataLoad"
        />
      </template>
    </Column>
  </DataGrid>
</template>
