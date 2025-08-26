import { defineStore } from 'pinia'
import { nanoid } from 'nanoid/non-secure'
import { useApi } from '../composables/useApi'
import type { Equipment, UUID } from '../types'


function newId(): UUID { return nanoid() as UUID }


export const useEquipmentStore = defineStore('equipment', {
  state: () => ({
    list: [] as Equipment[],
    loading: false,
  }),
  getters: {
    byId: (s) => (id: UUID) => s.list.find(e => e.id === id),
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { $api } = useApi()
        this.list = await $api('/equipamentos')
      } finally { this.loading = false }
    },
    async create(payload: Omit<Equipment, 'id' | 'status'> & { status?: Equipment['status'] }) {
      const { $api } = useApi()
      const eq: Equipment = { id: newId(), status: payload.status ?? 'disponivel', ...payload }
      const saved = await $api('/equipamentos', { method: 'POST', body: eq })
      await this.fetchAll()
      return saved
    },
    async update(id: UUID, patch: Partial<Equipment>) {
      const { $api } = useApi()
      await $api(`/equipamentos/${id}`, { method: 'PUT', body: patch })
      await this.fetchAll()
    }
  }
})