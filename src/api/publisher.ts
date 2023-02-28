import { get, post } from './request'
import type {
  ChangePublish,
  OSSPostPolicyResult,
  PostPublish,
} from '@/typings/publisher'
export const reqGetNormalListRace = () =>
  get<{
    code: number
    body: Array<{ race_id: number; race_name: string }>
    message: string
  }>('/normal/list/race')

export const reqGetPublish = (page: number, size: number, post_type: number) =>
  get<{
    code: number
    body: Array<any>
    message: string
  }>(`/publish/get?page=${page}&size=${size}&postType=${post_type}`)

export const reqPostPublish = (data: PostPublish) =>
  post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/create`, data)

export const reqPostChange = (data: ChangePublish, post_id: number) => {
  return post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/change?post_id=${post_id}`, data)
}

export const reqDeletePublish = (post_id: number) => {
  return post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/delete?post_id=${post_id}`)
}
