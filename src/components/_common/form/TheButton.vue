<script setup lang="ts">
import type { PropType } from "vue"
import texts from "@/texts"

const props = defineProps({
  text: {
    type: String,
    required: false,
  },
  type: {
    type: String as PropType<"save" | "create" | "update" | "submit" | "button">,
    required: false,
    default: "button",
  },
  handleClick: {
    type: Function,
    required: false,
  },
  className: {
    type: String,
    required: false,
    default: "",
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
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
</script>

<template>
  <Button
    :loading="loading"
    :type="getType()"
    @click="handleClick ?? void 0"
    :class="className"
  >
    <span
      v-if="loading"
      class="pi pi-spin pi-spinner mr-1"
    />
    {{ text ?? getText() ?? "" }}
  </Button>
</template>
