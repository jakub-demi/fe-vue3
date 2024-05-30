<script setup lang="ts">
import texts from "@/texts"
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="border-2 border-primary-600 rounded-md p-8 shadow-2xl shadow-primary">
      <div class="flex flex-col text-3xl py-6 text-center font-extrabold text-primary-600">
        <div>4&nbsp;0&nbsp;4</div>
        <div>
          {{ texts._documentErrors["404"].text1 }}
        </div>
        <div>
          {{ texts._documentErrors["404"].text2 }}
        </div>
      </div>
    </div>
  </div>
</template>
