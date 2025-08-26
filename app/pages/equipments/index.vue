<script setup lang="ts">
import { onMounted } from "vue";
import { useEquipmentStore } from "@/stores/equipment";
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const store = useEquipmentStore();

onMounted(async () => {
  await store.fetchAll();
});

const schema = toTypedSchema(
  z.object({
    nome: z.string().min(2),
    codigo: z.string().optional(),
    descricao: z.string().optional(),
  })
);

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema: schema,
});
const [nome] = defineField("nome");
const [codigo] = defineField("codigo");
const [descricao] = defineField("descricao");

const onSubmit = handleSubmit(async (values) => {
  await store.create({
    nome: values.nome,
    codigo: values.codigo,
    descricao: values.descricao,
    status: "disponivel",
  });
  resetForm();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Equipamentos</h1>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="font-medium mb-3">Cadastrar equipamento</h2>
        <form @submit.prevent="onSubmit" class="space-y-3">
          <div>
            <label class="text-sm">Nome*</label>
            <input
              v-model="nome"
              class="mt-1 w-full border rounded-xl px-3 py-2"
              placeholder="Ex: Furadeira"
            />
            <p class="text-red-600 text-xs" v-if="errors.nome">
              {{ errors.nome }}
            </p>
          </div>
          <div>
            <label class="text-sm">Código</label>
            <input
              v-model="codigo"
              class="mt-1 w-full border rounded-xl px-3 py-2"
              placeholder="EQ-001"
            />
          </div>
          <div>
            <label class="text-sm">Descrição</label>
            <textarea
              v-model="descricao"
              class="mt-1 w-full border rounded-xl px-3 py-2"
              rows="3"
            />
          </div>
          <button class="px-4 py-2 rounded-xl bg-black text-white">
            Salvar
          </button>
        </form>
      </div>
      <div class="bg-white p-4 rounded-2xl shadow">
        <h2 class="font-medium mb-3">Lista</h2>
        <EquipmentTable :items="store.list" />
      </div>
    </div>
  </div>
</template>
