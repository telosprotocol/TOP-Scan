import { create } from 'zustand'

export interface TableFilterState {
  transFilter: string
  blockFilter: string
  changeTransFilter: (by: string) => void
  changeBlockFilter: (by: string) => void
}

const useTableFilterStore = create<TableFilterState>((set) => ({
  transFilter: '',
  blockFilter: '',
  changeTransFilter: (by) => set(() => ({ transFilter: by })),
  changeBlockFilter: (by) => set(() => ({ blockFilter: by })),
}))

export default useTableFilterStore
