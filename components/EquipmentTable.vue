<script setup lang="ts">
import type { Equipment } from "../types";
const props = defineProps<{ items: Equipment[] }>();
</script>
<template>
  <table class="w-full text-sm">
    <thead class="text-left text-gray-500">
      <tr>
        <th class="py-2">Nome</th>
        <th>Código</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in props.items" :key="e.id" class="border-t">
        <td class="py-2">
          <NuxtLink
            :to="`/equipamentos/${e.id}`"
            class="font-medium hover:underline"
            >{{ e.nome }}</NuxtLink
          >
        </td>
        <td>{{ e.codigo }}</td>
        <td><StatusBadge :kind="e.status" /></td>
      </tr>
    </tbody>
  </table>
</template>
