<script setup lang="ts">
import { useRoute } from "vue-router";
import { useReservationStore } from "@/stores/reservations";
import dayjs from "dayjs";
import { computed, onMounted } from "vue";

const route = useRoute();
const store = useReservationStore();
onMounted(async () => {
  await store.fetchAll();
});
const r = computed(() => store.list.find((x) => x.id === route.params.id));

async function devolver() {
  if (!r.value) return;
  await store.concluir(r.value.id);
}
</script>

<template>
  <div v-if="r" class="bg-white p-4 rounded-2xl shadow max-w-2xl">
    <h1 class="text-xl font-semibold mb-2">
      Reserva • {{ r.equipamentoNome || r.equipamentoId }}
    </h1>
    <div class="text-sm text-gray-600">Responsável: {{ r.responsavel }}</div>
    <div class="mt-2 grid md:grid-cols-3 gap-3 text-sm">
      <div>
        <span class="text-gray-500">Início:</span>
        {{ dayjs(r.inicio).format("DD/MM/YYYY HH:mm") }}
      </div>
      <div>
        <span class="text-gray-500">Fim:</span>
        {{ dayjs(r.fim).format("DD/MM/YYYY HH:mm") }}
      </div>
      <div>
        <span class="text-gray-500">Status:</span>
        <StatusBadge :kind="r.status" />
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button
        @click="devolver"
        v-if="r.status === 'ativa'"
        class="px-4 py-2 rounded-xl bg-black text-white"
      >
        Registrar devolução
      </button>
      <span v-else class="text-sm text-gray-600"
        >Devolvido
        {{
          r.devolvidoEm ? dayjs(r.devolvidoEm).format("DD/MM HH:mm") : ""
        }}</span
      >
    </div>
  </div>
</template>
