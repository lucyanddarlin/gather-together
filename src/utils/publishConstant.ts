import { TimeState } from '@/typings/publisher'

export const HOST = ['政府', '组织机构', '学校']
export const LEVEL = ['院/校级', '地方级', '国家级']

export const RACE = ['创新创业', '科技学术', '人文社科']
export const LECTURE = ['创新创业', '艺术人文', '科技学术']
export const EVENT = [
  '创新创业类',
  '公益类',
  '科技类',
  '文体类',
  '思政教育类',
  '综合类',
]

export const RACE_OPTION = [
  { name: '主办方类型', value: HOST },
  { name: '比赛级别', value: LEVEL },
  { name: '比赛类型', value: RACE },
]
export const LECTURE_OPTION = [
  { name: '主办方类型', value: HOST },
  { name: '讲座类型', value: LECTURE },
]
export const EVENT_OPTION = [
  { name: '主办方类型', value: HOST },
  { name: '活动类型', value: EVENT },
]

export const TYPE_NAMES = [
  RACE, // 比赛
  LECTURE, // 讲座
  EVENT, // 活动
]

export const TYPE_LIST = ['比赛', '讲座', '活动']

export const TIME_STATE = [
  {
    index: TimeState.NotStarted,
    value: '未开始',
    color: '#FFAF50',
  },
  {
    index: TimeState.Ongoing,
    value: '进行中',
    color: '#56C28E',
  },
  {
    index: TimeState.Ended,
    value: '已结束',
    color: '#a4a4a4',
  },
]
