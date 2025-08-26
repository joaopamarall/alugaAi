<script setup lang="ts">
import { onMounted } from "vue";
import { useReservationStore } from "@/stores/reservations";
const store = useReservationStore();

onMounted(async () => {
  await store.fetchAll();
});
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-xl font-semibold">Reservas</h1>
    <NuxtLink
      to="/reservas/nova"
      class="px-3 py-2 rounded-xl bg-black text-white text-sm"
      >Nova reserva</NuxtLink
    >
  </div>
  <div class="bg-white p-4 rounded-2xl shadow">
    <ReservationTable :items="store.list" />
  </div>
</template>
