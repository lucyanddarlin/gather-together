import { get, post } from './request'
import type {
  BodyFilter,
  ChangePublish,
  GetPublish,
  OSSPostPolicyResult,
  PostPublish,
} from '@/typings/publisher'
export const reqGetNormalListRace = () =>
  get<{
    code: number
    body: Array<{ race_id: number; race_name: string }>
    message: string
  }>('/normal/list/race')

export const reqGetPublish = (
  page: number,
  size: number,
  post_type: number,
  selections: BodyFilter
) =>
  post<{
    code: number
    body: { result: Array<GetPublish>; total_count: number }
    message: string
  }>(
    `/home/get/list/post?page=${page}&size=${size}&post_type=${post_type}`,
    selections
  )

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
