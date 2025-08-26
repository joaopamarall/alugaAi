<script setup lang="ts">
import { useReservationStore } from "@/stores/reservations";
import { onMounted } from "vue";
const rs = useReservationStore();

onMounted(async () => {
  await rs.fetchAll();
});
</script>
<template>
  <h1 class="text-xl font-semibold mb-4">Devoluções</h1>
  <div class="bg-white p-4 rounded-2xl shadow">
    <ReservationTable :items="rs.list.filter((r) => r.status !== 'ativa')" />
  </div>
</template>
