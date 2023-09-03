import { post } from './request'
import type { ReportItem } from '@/typings/admin'
import type { ReportState, ReportType } from '@/utils/adminConstant'

export const reqGetReportList = (
  page: number,
  size: number,
  body: { state: string; type: string }
) =>
  post<{
    code: string
    body: Array<ReportItem>
    message: string
  }>(`/admin/report/list?page=${page}&size=${size}`, body)

export const reqReportHandle = (report_id: string, handle_type: ReportState) =>
  post<{
    code: string
    body: any
    message: string
  }>(`/admin/report/handle`, { handle_type, report_id })

export const reqReport = (
  businessId: string,
  reason: string,
  type: ReportType
) =>
  post<{
    code: string
    body: any
    message: string
  }>(`/home/report/commit`, { businessId, reason, type: `${type}` })
