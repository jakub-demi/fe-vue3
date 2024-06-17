<script setup lang="ts">
import { getAvatarForUser, getInitialsForUser } from "@/utils"
import type { TextSizeT, UserT } from "@/types"
import { computed } from "vue"

type PropsT = {
  user: UserT | null
  size?: `size-${number | string}` | `size-${number}/${number}` | `size-[${string}]`
  labelSize?: TextSizeT
  className?: string
  showTooltip?: boolean
}
const props = withDefaults(defineProps<PropsT>(), {
  size: "size-9",
  labelSize: "text-sm",
  className: "",
  showTooltip: false,
})

const userAvatar = computed(() => getAvatarForUser(props.user))
const userInitials = computed(() => getInitialsForUser(props.user))
</script>

<template>
  <Avatar
    v-tooltip.bottom="showTooltip ? user?.fullName : undefined"
    :label="!userAvatar ? userInitials : undefined"
    :image="userAvatar ? userAvatar : undefined"
    :pt="{ root: size, label: labelSize }"
    :class="['flex items-center justify-center rounded-full border-2 border-black', className]"
    shape="circle"
  />
</template>
