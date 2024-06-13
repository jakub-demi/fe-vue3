<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { MenuItem } from "primevue/menuitem"
import type { ActionsMenuPermissionsT, InteractEventT } from "@/types"
import router from "@/router"
import TheButton from "@/components/_common/form/TheButton.vue"
import { setAccessDeniedToast, setAxiosErrorToast, setAxiosSuccessToast } from "@/utils"
import doAxios from "@/utils/doAxios"
import dialogStore from "@/stores/dialogStore"
import texts from "@/texts"

const dialog = dialogStore()

type PropsT = {
  id: number
  route: string
  handleReloadAsyncFn: () => Promise<void>
  additionalActionsTitle?: string
  additionalActions?: MenuItem[]
  permissions?: ActionsMenuPermissionsT
  extAxiosDeletePath?: string
}

const props = defineProps<PropsT>()

const actionsMenu = ref()

const toggle = (event: InteractEventT) => {
  actionsMenu.value.toggle(event)
}

const confirmRemoval = () => {
  dialog.showDialog(texts.actionsMenu.removal.dialog.texts.confirmation, () => doRemoval())
}

const doRemoval = async () => {
  await doAxios(props.extAxiosDeletePath ?? `/${props.route}/${props.id}`, "delete", true)
    .then(async (res) => {
      setAxiosSuccessToast(res)
      await props.handleReloadAsyncFn()
    })
    .catch(setAxiosErrorToast)
}

const actions: MenuItem[] = [
  {
    label: "",
    items: [
      {
        label: "View",
        icon: "pi pi-eye",
        command: () => {
          if (props.permissions && !props.permissions.view) {
            setAccessDeniedToast()
            return
          }
          router.push({ name: `${props.route}.view`, params: { id: props.id } })
        },
      },
      {
        label: "Edit",
        icon: "pi pi-pencil",
        command: () => {
          if (props.permissions && !props.permissions.edit) {
            setAccessDeniedToast()
            return
          }
          router.push({ name: `${props.route}.edit`, params: { id: props.id } })
        },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => {
          if (props.permissions && !props.permissions.delete) {
            setAccessDeniedToast()
            return
          }
          confirmRemoval()
        },
      },
    ],
  },
]

onMounted(() => {
  props.additionalActions &&
    actions.push({ label: props.additionalActionsTitle ?? "More", items: props.additionalActions })
})
</script>

<template>
  <TheButton
    text="Actions"
    :handle-click="toggle"
    aria-haspopup="true"
    aria-controls="actions_menu"
  />
  <Menu
    ref="actionsMenu"
    id="actions_menu"
    :model="actions"
    :popup="true"
  />
</template>
