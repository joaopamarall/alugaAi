import { defineStore } from 'pinia'
import { nanoid } from 'nanoid/non-secure'
import { useApi } from '../composables/useApi'
import type { Reserva, UUID } from '../types'


function newId(): UUID { return nanoid() as UUID }


export const useReservationStore = defineStore('reservas', {
  state: () => ({
    list: [] as Reserva[],
    loading: false,
  }),
  getters: {
    ativas: (s) => s.list.filter(r => r.status === 'ativa'),
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const { $api } = useApi()
        this.list = await $api('/reservas')
      } finally { this.loading = false }
    },
    async create(payload: Omit<Reserva, 'id' | 'status'> & { status?: Reserva['status'] }) {
      const { $api } = useApi()
      const r: Reserva = { id: newId(), status: payload.status ?? 'ativa', ...payload }
      const saved = await $api('/reservas', { method: 'POST', body: r })
      await this.fetchAll()
      return saved
    },
    async concluir(id: UUID) {
      const { $api } = useApi()
      await $api(`/reservas/${id}/concluir`, { method: 'POST' })
      await this.fetchAll()
    }
  }
})