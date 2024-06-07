<script setup lang="ts">
import texts from "@/texts"
import type { ButtonTypeT, InteractEventT } from "@/types"

type PropsT = {
  text?: string
  type?: ButtonTypeT
  handleClick?: Function
  className?: string
  loading?: boolean
  icon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  type: "button",
  className: "",
  loading: false,
  disabled: false,
})

const getType = (): "submit" | "button" => {
  switch (props.type) {
    case "create":
    case "update":
    case "save":
      return "submit"
    default:
      return props.type
  }
}

const getText = (): string | undefined => {
  switch (props.type) {
    case "create":
      return texts.buttons.create
    case "update":
      return texts.buttons.update
    case "save":
      return texts.buttons.save
    default:
      return props.text
  }
}

const showIcon = (): boolean => {
  return !props.loading && props.icon !== undefined
}

const clickHandler = (event: InteractEventT) => {
  if (!props.handleClick) return

  props.handleClick(event)
}
</script>

<template>
  <Button
    :disabled="disabled"
    :loading="loading"
    :type="getType()"
    @click="(event) => clickHandler(event)"
    :class="className"
  >
    <span
      v-if="loading"
      class="pi pi-spin pi-spinner mr-1"
    />
    <span
      v-if="showIcon()"
      :class="[icon, 'mr-1']"
    />
    {{ text ?? getText() ?? "" }}
  </Button>
</template>
