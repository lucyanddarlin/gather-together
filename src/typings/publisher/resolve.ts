import { format } from 'date-fns'
import { toDate } from '@/utils/common'

import { Type } from '.'
import type {
  ChangeBody,
  GetPublish,
  HostType,
  IDescription,
  Level,
  PostBody,
  Publish,
  ScoreType,
} from '.'

export function PubToDesc(publish: Publish, post_type: Type): IDescription {
  // 将发布的信息转换为描述信息
  const description: IDescription = {
    title: publish.title.value as string,
    start_time: publish.start_time.value as Date,
    end_time: publish.end_time.value as Date,
    state: publish.state,
    time_state: publish.time_state,
    post_id: publish.post_id,
    post_type,
    location: publish.location.value as string,
    host: publish.host.value as string,
    host_type: publish.host_type.value as HostType,
    race_level: publish.race_level?.value as Level,
    score_type: publish.score_type.value as ScoreType,
    access: publish.access.value as string,
    detail: publish.detail.value as string,
    imgs: publish.imgs?.value as Array<string>,
  }
  return description
}

export function GetPublishToDesc(p: GetPublish) {
  const desc: IDescription = {
    title: p.title,
    start_time: toDate(p.start_time),
    end_time: toDate(p.end_time),
    state: p.state,
    time_state: p.time_state,
    post_id: p.post_id,
    post_type: p.post_type,
    location: p.location,
    host: p.sponsor_name,
    host_type: p.sponsor_type,
    detail: p.detail,
    access: p.regist_info,
    imgs: p.picture_urls,
    score_type: p.second_type,
  }
  if (p.race_level !== undefined) desc.race_level = p.race_level
  if (p.post_type === Type.比赛) {
    desc.score_type = p.race_type
  }
  if (p.post_type === Type.活动) {
    desc.score_type = p.event_type
  }
  if (p.post_type === Type.讲座) {
    desc.score_type = p.lecture_type
  }
  return desc
}

export function DescToPostBody(d: IDescription) {
  const p: PostBody = {
    zone_id: 1,
    post_type: d.post_type,
    start_time: format(d.start_time, 'yyyy-MM-dd HH:mm:ss'),
    end_time: format(d.end_time, 'yyyy-MM-dd HH:mm:ss'),
    title: d.title,
    detail: d.detail,
    location: d.location,
    sponsor_name: d.host,
    sponsor_type: d.host_type,
    regist_info: d.access,
    pic_count: d.imgs ? d.imgs.length : 0,
    event_type: 0,
    lecture_type: 0,
    race_level: d.race_level ? d.race_level : 0,
    race_type: 0,
  }
  // 前期使用了score_type 统一收集类型，这里作转换
  if (d.post_type === Type.比赛) {
    p.race_type = d.score_type
  } else if (d.post_type === Type.讲座) {
    p.lecture_type = d.score_type
  } else if (d.post_type === Type.活动) {
    p.event_type = d.score_type
  }
  return p
}

export function DescToChangeBody(d: IDescription) {
  console.log('DescToPostBody', d)
  const p: ChangeBody = {
    zone_id: 1,
    sponsor_type: d.host_type,
    sponsor_name: d.host,
    detail: d.detail,
    start_time: format(d.start_time, 'yyyy-MM-dd HH:mm:ss'),
    end_time: format(d.end_time, 'yyyy-MM-dd HH:mm:ss'),
    regist_info: d.access,
    location: d.location,
    pic_count: d.imgs ? d.imgs.length : 0,
    race_level: d.race_level ? d.race_level : 0,
    title: d.title,
    race_type: 0,
    lecture_type: 0,
    event_type: 0,
    post_type: d.post_type,
  }
  return p
}
