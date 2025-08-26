export type UUID = string
export type EquipmentStatus = 'disponivel' | 'reservado' | 'manutencao'
export interface Equipment {
  id: UUID
  nome: string
  codigo?: string
  descricao?: string
  status: EquipmentStatus
}
export type ReservaStatus = 'ativa' | 'concluida' | 'atrasada' | 'cancelada'
export interface Reserva {
  id: UUID
  equipamentoId: UUID
  equipamentoNome?: string
  responsavel: string
  inicio: string // ISO datetime
  fim: string // ISO datetime
  status: ReservaStatus
  observacoes?: string
  devolvidoEm?: string | null
}