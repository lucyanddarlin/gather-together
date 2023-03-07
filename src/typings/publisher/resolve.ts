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

// export function DescToPub(
//   description: IDescription | undefined,
//   post_type: string
// ) {
//   if (!description) return new Publish(post_type)
//   const type = Type[description.post_type]
//   const ipublish: IPublish = {
//     post_id: description.post_id,
//     title: {
//       title: '标题',
//       value: description.title,
//       type: 'text',
//       placeholder: `请输入${type}标题`,
//       limit: 20,
//     },
//     start_time: {
//       title: type === '比赛' ? '报名开始' : type,
//       value: description.start_time,
//       type: 'time',
//       placeholder: `请输入${type === '比赛' ? '报名开始' : type}时间`,
//     },
//     end_time: {
//       title: type === '比赛' ? '报名结束' : type,
//       value: description.end_time,
//       type: 'time',
//       placeholder: `请输入${type === '比赛' ? '报名结束' : type}时间`,
//     },
//     // location: '各学校分会场',
//     host: {
//       title: '主办方',
//       value: description.host,
//       type: 'text_no_enter',
//       placeholder: `请输入主办方名称，多个主办方请以顿号隔开`,
//       limit: 50,
//     },
//     host_type: {
//       title: '主办方类型',
//       value: description.host_type,
//       type: 'text_option',
//     },
//     location: {
//       title: `${type}地点`,
//       value: description.location,
//       type: 'text_no_enter',
//       placeholder: `请输入${type}举办地点`,
//       limit: 30,
//     },
//     score_type: {
//       title: `${type}类型`,
//       value: description.score_type,
//       type: 'option',
//       placeholder: `请选择${type}类型`,
//     },
//     access: {
//       title: '报名方式',
//       value: description.access,
//       type: 'text_elastic',
//       placeholder: `请输入报名途径指引或者报名链接`,
//       limit: 50,
//     },
//     detail: {
//       title: `${type}详情`,
//       value: description.detail,
//       type: 'textarea',
//       placeholder: `请输入${type}介绍内容`,
//       limit: 2000,
//     },
//     state: description.state,
//     imgs: {
//       title: '上传图片（可选）',
//       value: description.imgs,
//       type: 'imgs',
//     },
//   }
//   const p: Publish = Publish.createPublish(ipublish, post_type)
//   if (description.post_type === Type.比赛) {
//     p['race_level'] = {
//       title: '比赛级别',
//       type: 'option',
//       placeholder: '请选择比赛级别',
//       value: description.race_level,
//     }
//   }
//   return p
// }

export function PubToDesc(publish: Publish, post_type: Type): IDescription {
  // 将发布的信息转换为描述信息
  const description: IDescription = {
    title: publish.title.value as string,
    start_time: publish.start_time.value as Date,
    end_time: publish.end_time.value as Date,
    state: publish.state,
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
