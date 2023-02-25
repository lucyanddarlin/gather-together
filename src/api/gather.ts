import { get } from './request'
export const reqGatherProjectList = (page: number, size: number) =>
  get<{ code: number; body: any }>('/gather/list/project', { page, size })
export const reqGatherProjectSingle = (project_id: any) =>
  get<{ code: number; body: any }>('/gather/get/project', { project_id })
