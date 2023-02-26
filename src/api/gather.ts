import { get, post } from './request'
export const reqGatherProjectList = (page: number, size: number) =>
  get<{ code: number; body: any }>('/gather/list/cond/project', { page, size })
export const reqGatherProjectSingle = (project_id: any) =>
  get<{ code: number; body: any }>('/gather/get/project', { project_id })
export const reqPublishProject = (
  contact: string,
  introduce: string,
  needs: string,
  pic_count: string,
  project_mode: string,
  project_name: string,
  project_type: string,
  zone_id: string
) =>
  post<{ code: number; body: any }>('/gather/create/project', {
    contact,
    introduce,
    needs,
    pic_count,
    project_mode,
    project_name,
    project_type,
    zone_id,
  })
