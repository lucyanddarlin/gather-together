import { get, post } from './request'
export const reqGatherProjectList = (page: number, size: number) =>
  get<{ code: number; body: any }>('/gather/list/cond/project', {
    page,
    size,
  })
export const reqGatherProjectListFilter = (
  page: number,
  size: number,
  projectMode: number,
  projectType: number
) =>
  get<{ code: number; body: any }>('/gather/list/cond/project', {
    page,
    size,
    projectMode,
    projectType,
  })

export const reqGatherProjectSingle = (project_id: any) =>
  get<{ code: number; body: any }>('/gather/get/project', { project_id })

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

export const reqGatherPersonList = (page: number, size: number) =>
  get<{ code: number; body: any }>('/gather/list/vita', { page, size })

export const reqGatherPersonSingle = (user_id: any) =>
  get<{ code: number; body: any }>('/gather/get/vita', { user_id })
