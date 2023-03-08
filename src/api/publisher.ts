import { get, post } from './request'
import type {
  BodyFilter,
  ChangeBody,
  GetPublish,
  OSSPostPolicyResult,
  PostBody,
} from '@/typings/publisher'

// 分页获取帖子列表 + 筛选
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

// 获取单一帖子的详情
export const reqGetDetail = (post_id: string) =>
  get<{
    code: number
    body: GetPublish
    message: string
  }>(`/home/get/post?post_id=${post_id}`)

// 发布帖子
export const reqPostPublish = (data: PostBody) =>
  post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/create`, data)

// 修改帖子
export const reqPostChange = (data: ChangeBody, post_id: number) => {
  return post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/change?post_id=${post_id}`, data)
}

// 删除帖子
export const reqDeletePublish = (post_id: number) => {
  return post<{
    code: number
    body: OSSPostPolicyResult
    message: string
  }>(`/publish/delete?post_id=${post_id}`)
}
