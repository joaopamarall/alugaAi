<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ kind: string }>();

const statusClass = computed(() => {
  switch (props.kind) {
    case "disponivel":
      return "bg-green-100 text-green-700";
    case "reservado":
      return "bg-yellow-100 text-yellow-800";
    case "manutencao":
      return "bg-red-100 text-red-700";
    case "cancelada":
      return "bg-gray-200 text-gray-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
});
</script>
<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
    :class="statusClass"
    >{{ kind }}</span
  >
</template>
