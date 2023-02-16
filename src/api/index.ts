import { get } from './request'
import type { HomeTopicInfo, ICommentItem, PaperItem } from '@/typings/home'

export const reqGetHomePaperList = (page: number, size: number) =>
  get<{ code: number; body: PaperItem[] }>('/home/get/forum', {
    page,
    size,
  })

export const reqGetTest = (page: number, size: number) =>
  get<{ code: number; body: Array<{ title: string }> }>('/test', { page, size })

export const reqGetHomeTopicInfo = (topic_id: string | number) =>
  get<{ code: string; body: HomeTopicInfo }>(
    `/home/get/forum/one?topic_id=${topic_id}`
  )

export const reqGetTopicComments = (
  page: number,
  size: number,
  topicId: number | string
) =>
  get<{ code: number; body: ICommentItem[] }>('/home/list/forum/comment', {
    page,
    size,
    topicId,
  })
