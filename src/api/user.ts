import { get, post } from './request'
import type {
  GetUserProfileResult,
  PostLoginResult,
  RawUserCv,
} from '@/typings/user'

export const reqUserLogin = (data: {
  iv: string
  code: string
  encryptedData: string
}) => post<PostLoginResult>('/auth/user', data)

export const reqGetUserProfile = () =>
  get<GetUserProfileResult>('/user/info/get')

export const reqGetUserCV = () =>
  get<{ code: number; message: string; body: RawUserCv }>('/user/vita/get')

export const reqCreateUserCV = (cv: RawUserCv) =>
  post<{ [key: string]: string }>('/user/vita/create', cv)

export const reqUpdateUserCV = (data: Partial<RawUserCv>) =>
  post('/user/vita/modify/', data)

export const reqRemoveUserCV = () =>
  post<{ [key: string]: string }>('/user/allVita/remove')

export const reqAddCVProject = (
  data: Array<{ project_name: string; project_exp: string }>
) => post<{ [key: string]: string }>('/user/vita/add/project', data)

export const reqModifyCVProject = (data: {
  project_name?: string
  project_exp?: string
  project_id: string
}) => post<{ [key: string]: string }>('/user/vita/modify/project', data)

export const reqRemoveCVProject = (project_id: string) =>
  post<{ [key: string]: string }>(
    `/user/vita/remove/project?project_id=${project_id}`
  )

export const reqAddCVCert = (
  data: Array<{ cert_name: string; date: number }>
) => post<{ [key: string]: string }>('/user/vita/add/cert', data)

export const reqModifyCVCert = (data: {
  cert_name: string
  date: number
  cert_id: string
}) => post<{ [key: string]: string }>('/user/vita/modify/cert', data)

export const reqRemoveCVCert = (cert_id: string) =>
  post<{ [key: string]: string }>(`/user/vita/remove/cert?cert_id=${cert_id}`)

export const reqGetOwnTopic = (page: number, size: number) =>
  get('/user/forum/list', { page, size })

export const reqGetOwnProject = (page: number, size: number) =>
  get('/gather/list/created/project', { page, size })
