<script setup lang="ts">
import type { Reserva } from "../types";
import dayjs from "dayjs";
const props = defineProps<{ items: Reserva[] }>();
</script>
<template>
  <table class="w-full text-sm">
    <thead class="text-left text-gray-500">
      <tr>
        <th class="py-2">Equipamento</th>
        <th>Responsável</th>
        <th>Início</th>
        <th>Fim</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="r in props.items" :key="r.id" class="border-t">
        <td class="py-2">
          <NuxtLink
            :to="`/reservas/${r.id}`"
            class="font-medium hover:underline"
            >{{ r.equipamentoNome || r.equipamentoId }}</NuxtLink
          >
        </td>
        <td>{{ r.responsavel }}</td>
        <td>{{ dayjs(r.inicio).format("DD/MM HH:mm") }}</td>
        <td>{{ dayjs(r.fim).format("DD/MM HH:mm") }}</td>
        <td><StatusBadge :kind="r.status" /></td>
      </tr>
    </tbody>
  </table>
</template>
