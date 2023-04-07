import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { PublishType, ReportType } from '@/utils/adminConstant'
export const useManagerStore = defineStore('manager', () => {
  const cur_module: Ref<{
    title: string
    path: string
    type: ReportType | PublishType
  }> = ref({ title: '', path: '', type: 0 })
  const cur_title = ref('')
  return {
    cur_module,
    cur_title,
  }
})
