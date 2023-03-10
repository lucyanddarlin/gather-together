import { get, post } from './request'
import type { IGatherItem } from '@/typings/gather'

export const reqGatherProjectList = (page: number, size: number) => {
  return get<{ code: number; body: any }>(
    `/gather/list/cond/project?page=${page}&size=${size}`
  )
}
export const reqOtherGatherProjectList = (
  page: number,
  size: number,
  project_mode?: number,
  project_type?: number
) => {
  let url = `/gather/list/cond/project?page=${page}&size=${size}`
  if (project_mode !== undefined) {
    url += `&projectMode=${project_mode}`
  }
  if (project_type !== undefined) {
    url += `&projectType=${project_type}`
  }
  return get<{ code: number; body: { result: Array<IGatherItem> } }>(url)
}
export const reqGatherPersonList = (page: number, size: number) => {
  return get<{ code: number; body: any }>(
    `/gather/list/vita?page=${page}&size=${size}`
  )
}
export const reqOtherGatherPersonList = (
  page: number,
  size: number,
  skillId?: number,
  direction?: number
) => {
  let url = `/gather/list/vita?page=${page}&size=${size}`
  if (skillId !== undefined) {
    url += `&skillId=${skillId}`
  }
  if (direction !== undefined) {
    url += `&direction=${direction}`
  }
  return get<{ code: number; body: any }>(url)
}

export const reqGatherProjectSingle = (project_id: any) =>
  get<{ code: number; body: IGatherItem }>('/gather/get/project', {
    project_id,
  })

export const reqPublishProject = (data: {
  contact: string
  introduce: string
  needs: string
  pic_count?: string
  project_mode: string
  project_name: string
  project_type: string
  zone_id?: string
}) => post<{ code: number; body: any }>('/gather/create/project', data)

export const reqGatherPersonSingle = (user_id: any) =>
  get<{ code: number; body: any }>('/gather/get/vita', { user_id })

export const reqRemoveProject = (project_id: string) =>
  get<{ [key: string]: string }>(
    `/gather/remove/project?project_id=${project_id}`
  )
