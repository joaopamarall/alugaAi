<script setup lang="ts">
import { useReservationStore } from "@/stores/reservations";
import { useEquipmentStore } from "@/stores/equipment";
import dayjs from "dayjs";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";

const rs = useReservationStore();
const eq = useEquipmentStore();
onMounted(async () => {
  Promise.all([rs.fetchAll(), eq.fetchAll()]);
});

const schema = toTypedSchema(
  z
    .object({
      equipamentoId: z.string().min(1, "Selecione um equipamento"),
      responsavel: z.string().min(2),
      inicio: z.string().min(1),
      fim: z.string().min(1),
    })
    .refine((d) => dayjs(d.fim).isAfter(dayjs(d.inicio)), {
      message: "Fim deve ser após início",
      path: ["fim"],
    })
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
});
const [equipamentoId] = defineField("equipamentoId");
const [responsavel] = defineField("responsavel");
const [inicio] = defineField("inicio");
const [fim] = defineField("fim");

const onSubmit = handleSubmit(async (v) => {
  const item = eq.list.find((x) => x.id === v.equipamentoId);
  await rs.create({
    equipamentoId: v.equipamentoId,
    equipamentoNome: item?.nome,
    responsavel: v.responsavel,
    inicio: dayjs(v.inicio).toISOString(),
    fim: dayjs(v.fim).toISOString(),
    observacoes: "",
  });
  await navigateTo("/reservas");
});
</script>

<template>
  <h1 class="text-xl font-semibold mb-4">Nova reserva</h1>
  <form
    @submit.prevent="onSubmit"
    class="grid gap-4 bg-white p-4 rounded-2xl shadow max-w-xl"
  >
    <div>
      <label class="text-sm">Equipamento*</label>
      <select
        v-model="equipamentoId"
        class="mt-1 w-full border rounded-xl px-3 py-2"
      >
        <option value="" disabled>Selecione...</option>
        <option
          v-for="e in eq.list.filter((x) => x.status !== 'manutencao')"
          :key="e.id"
          :value="e.id"
        >
          {{ e.nome }}
        </option>
      </select>
      <p class="text-red-600 text-xs" v-if="errors.equipamentoId">
        {{ errors.equipamentoId }}
      </p>
    </div>
    <div>
      <label class="text-sm">Responsável*</label>
      <input
        v-model="responsavel"
        class="mt-1 w-full border rounded-xl px-3 py-2"
        placeholder="Nome"
      />
      <p class="text-red-600 text-xs" v-if="errors.responsavel">
        {{ errors.responsavel }}
      </p>
    </div>
    <div class="grid md:grid-cols-2 gap-3">
      <div>
        <label class="text-sm">Início*</label>
        <input
          v-model="inicio"
          type="datetime-local"
          class="mt-1 w-full border rounded-xl px-3 py-2"
        />
      </div>
      <div>
        <label class="text-sm">Fim*</label>
        <input
          v-model="fim"
          type="datetime-local"
          class="mt-1 w-full border rounded-xl px-3 py-2"
        />
        <p class="text-red-600 text-xs" v-if="errors.fim">{{ errors.fim }}</p>
      </div>
    </div>
    <button class="px-4 py-2 rounded-xl bg-black text-white">Reservar</button>
  </form>
</template>
