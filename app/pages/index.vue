<script setup lang="ts">
import { onMounted } from "vue";
import { useEquipmentStore } from "../../stores/equipment";
import { useReservationStore } from "../../stores/reservations";

const useStoreEquipment = useEquipmentStore();
const rs = useReservationStore();

onMounted(async () => {
  await useStoreEquipment.fetchAll();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold">AlugaAI</h1>
    <p>Home funcionando.</p>

    <nav class="mt-4 flex gap-3">
      <NuxtLink to="/equipments">/equipamentos</NuxtLink>
      <NuxtLink to="/reservations">/reservas</NuxtLink>
      <NuxtLink to="/returns">/devolucoes</NuxtLink>
    </nav>
  </div>

  <section class="grid md:grid-cols-3 gap-4">
    <div class="p-4 bg-white rounded-2xl shadow">
      <p class="text-sm text-gray-500">Equipamentos</p>
      <p class="text-3xl font-semibold">{{ useStoreEquipment.list.length }}</p>
    </div>
    <div class="p-4 bg-white rounded-2xl shadow">
      <p class="text-sm text-gray-500">Reservas ativas</p>
      <p class="text-3xl font-semibold">{{ rs.ativas.length }}</p>
    </div>
    <div class="p-4 bg-white rounded-2xl shadow">
      <p class="text-sm text-gray-500">Disponíveis</p>
      <p class="text-3xl font-semibold">
        {{
          useStoreEquipment.list.filter((e) => e.status === "disponivel").length
        }}
      </p>
    </div>
  </section>

  <section class="mt-6 grid md:grid-cols-2 gap-4">
    <div class="bg-white rounded-2xl shadow p-4">
      <h2 class="font-semibold mb-3">Próximas reservas</h2>
      <ReservationTable :items="rs.list.slice(0, 5)" />
    </div>
    <div class="bg-white rounded-2xl shadow p-4">
      <h2 class="font-semibold mb-3">Equipamentos</h2>
      <EquipmentTable :items="useStoreEquipment.list.slice(0, 5)" />
    </div>
  </section>
</template>
