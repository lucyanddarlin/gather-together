import type { PublishType, ReportType } from '@/utils/adminConstant'

export type ReportItem = {
  admin_name: string
  business_id: number
  date: string
  reason: string
  report_id: number
  reporter_id: number
  reporter_name: string
  report_desc: string
  state: number
  type: number

  head_url?: string
  creator_name?: string
  creator_time?: string
  report_content?: string
}

export type Sector = {
  title: string
  key: number
  children: Array<Module>
}

export type Module = {
  title: string
  path: string
  color: string
  key: number
  type: ReportType | PublishType
  src?: {
    title: string
    path: string
  }
  api: Function
}
