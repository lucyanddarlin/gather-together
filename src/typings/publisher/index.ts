import { addMonths } from 'date-fns'

export enum State {
  Create = 0,
  Uncensore = 1,
  Publish = 2,
  Repulse = 3,
  Delete = 4,
  Banned = 5,
}

export const StateMap = {
  [State.Create]: '创建中',
  [State.Uncensore]: '待审核',
  [State.Publish]: '进行中',
  [State.Repulse]: '已驳回',
  [State.Delete]: '已删除',
  [State.Banned]: '已封禁',
}

export enum TimeState {
  NotStarted,
  Ongoing,
  Ended,
}

export enum Type {
  比赛,
  讲座,
  活动,
}

export enum Level {
  院校级,
  地方级,
  国家级,
}

export enum ScoreType {
  // TODO: 使用了api的得分类型作为代替，发送int32，接口升级后需要更改
  创新创业,
  人文社科,
  科技学术,
  艺术人文,
  创新创业类,
  公益类,
  科技类,
  文体类 = 7,
  思政教育类 = 8,
  综合类 = 9,
}
export enum MatchType {
  创新创业 = 0,
  科技学术 = 1,
  人文社科 = 2,
}

export enum LectureType {
  创新创业 = 0,
  艺术人文 = 1,
  科技学术 = 2,
}

export enum ActivityType {
  创新创业类 = 0,
  公益类 = 1,
  科技类 = 2,
  文体类 = 3,
  思政教育类 = 4,
  综合类 = 5,
}

export enum HostType {
  政府 = 0,
  组织机构 = 1,
  学校 = 2,
}
export interface ITag {
  title: string
  color: string
}
export interface IField {
  title: string
  value: string | Date | number | Array<string> | undefined
  /* 
  - text: 单行文本
  - name_type渲染为文字输入+类型选择
  - option为单选选项
  - text_option为文字选项（如主办方类型）
  - time为时间选择
  - number为数字输入
  */
  type:
    | 'text'
    | 'textarea'
    | 'text_elastic'
    | 'text_no_enter'
    | 'option'
    | 'text_option'
    | 'imgs'
    | 'time'
  placeholder?: string
  limit?: number
  monoline?: boolean
}

export interface IDescription {
  // 摘要描述，GET获得后用这个接口包装返回数据
  // 标签显示相关的在PublishManageCardItem.vue中
  title: string
  start_time: Date
  end_time: Date
  state: State
  post_id: number
  location: string
  host: string
  host_type: HostType
  race_level?: Level
  post_type: Type
  score_type: ScoreType
  access: string
  detail: string
  time_state?: TimeState
  // 其他标签，自定义，暂保留
  tags?: Array<ITag>
  imgs?: Array<string>
}
export interface IPublish {
  // 全部信息
  title: IField
  start_time: IField
  end_time: IField
  state: State
  post_id: number
  location: IField
  host: IField
  host_type: IField
  race_level?: IField
  // TODO: 比赛类型，后期需更改
  score_type: IField
  access: IField
  detail: IField
  imgs?: IField
}

export class Publish implements IPublish {
  title: IField
  start_time: IField
  end_time: IField
  state: State
  post_id: number
  location: IField
  host: IField
  host_type: IField
  race_level?: IField
  score_type: IField
  access: IField
  detail: IField
  imgs?: IField
  get entries(): [keyof IPublish, IField | State | number | undefined][] {
    return Object.entries(this) as [
      keyof IPublish,
      IField | State | number | undefined
    ][]
  }
  constructor(type: string) {
    this.state = State.Create
    this.post_id = 0
    this.title = {
      title: `${type}名称`,
      value: '',
      type: 'text',
      placeholder: `请输入${type}名称`,
      limit: 20,
    }
    this.start_time = {
      title: '开始时间',
      value: new Date(),
      type: 'time',
      placeholder: `请输入${type === '比赛' ? '报名开始' : type}时间`,
    }
    this.end_time = {
      title: '结束时间',
      value: addMonths(new Date(), 1),
      type: 'time',
      placeholder: `请输入${type === '比赛' ? '报名结束' : type}时间`,
    }
    this.location = {
      title: `${type}地点`,
      value: '',
      type: 'text_no_enter',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}地点`,
      limit: 30,
    }
    this.host = {
      title: `主办方`,
      value: '',
      type: 'text_no_enter',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}主办方`,
      limit: 50,
    }
    this.host_type = {
      title: `主办方类型`,
      value: undefined,
      type: 'text_option',
    }
    this.race_level = {
      title: `${type}级别`,
      value: undefined,
      type: 'option',
    }
    this.score_type = {
      title: `${type}类型`,
      value: undefined,
      type: 'option',
    }
    this.access = {
      title: `报名方式`,
      value: '',
      type: 'text_elastic',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}报名方式`,
      limit: 50,
    }
    this.detail = {
      title: `${type}简介`,
      value: '',
      type: 'textarea',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}简介`,
      limit: 2000,
    }
    this.imgs = {
      title: `上传图片（可选）`,
      value: [],
      type: 'imgs',
    }
  }

  public static createPublish(i: IPublish, post_type: string): Publish {
    const publish = new Publish(post_type)
    publish.post_id = i.post_id
    publish.title.value = i.title.value
    publish.start_time.value = i.start_time.value
    publish.end_time.value = i.end_time.value
    publish.location.value = i.location.value
    publish.score_type.value = i.score_type.value
    publish.host.value = i.host.value
    publish.host_type.value = i.host_type.value
    publish.detail.value = i.detail.value
    if (i.access) publish.access.value = i.access.value
    if (i.imgs && publish.imgs) publish.imgs.value = i.imgs.value
    if (i.race_level && publish.race_level)
      publish.race_level.value = i.race_level.value
    return publish
  }
  public static DescToPub(
    d: IDescription | undefined,
    post_type: string
  ): Publish {
    const publish = new Publish(post_type)
    if (!d) return publish
    publish.title.value = d.title
    publish.start_time.value = d.start_time
    publish.end_time.value = d.end_time
    publish.post_id = d.post_id
    publish.location.value = d.location
    publish.score_type.value = d.score_type
    publish.host.value = d.host
    publish.host_type.value = d.host_type
    publish.detail.value = d.detail
    publish.access.value = d.access
    if (d.imgs && publish.imgs) publish.imgs.value = d.imgs
    // 数字和字符需要注意一下，!0 === !'' === true
    if (d.race_level !== undefined && publish.race_level)
      publish.race_level.value = d.race_level
    return publish
  }

  public getWhatToFill(post_type: string): string {
    // 获取未填写字段
    // 可选项
    const optional = ['imgs']
    for (const [key, value] of Object.entries(this)) {
      // 只有比赛有race_level输入
      if (key === 'race_level' && post_type !== '比赛') continue
      if (value instanceof Object) {
        // 是对象类型，判断是否已填写
        const isOptional = optional.includes(value.type) ? true : false
        // 空字符串或者undefined为未填
        const notFilled = value.value === '' || value.value === undefined
        if (!isOptional && notFilled) {
          return value.title
        }
      }
    }
    return ''
  }
}

// 为对接后端产生的临时类型，后面和IPublish融合一下
export interface PostBody {
  zone_id: number
  event_type: number
  lecture_type: number
  start_time: string
  post_type: number
  sponsor_name: string
  detail: string
  location: string
  race_level: number
  end_time: string
  sponsor_type: number
  pic_count: number
  title: string
  race_type: number
  regist_info: string
}

export interface GetPublish {
  detail: string
  location: string
  state: number
  title: string
  post_id: number
  create_time: string
  last_change_time: string
  start_time: string
  end_time: string
  zone_id: number
  creator_id: string
  sponsor_type: number
  sponsor_name: string
  post_type: number
  second_type: number
  picture_urls: Array<string>
  regist_info: string
  race_level: number
  creator_name: null
  is_fav: null
  time_state: number
  lecture_type: number
  race_type: number
  event_type: number
}

export interface ChangeBody {
  zone_id: number
  sponsor_type: number
  sponsor_name: string
  detail: string
  end_time: string
  regist_info: string
  location: string
  pic_count: number
  race_level: number
  start_time: string
  title: string
  race_type: number
  lecture_type: number
  event_type: number
  post_type: number
}

export type BodyFilter = {
  sponsor_type?: string
  lecture_type?: string
  event_type?: string
  race_type?: string
  race_level?: string
}

export interface LabelItem {
  value: string
  isSelected?: boolean
}

export interface FilterPopupDataItem {
  title: string
  list: Array<LabelItem>
}

export interface FilterPopupData {
  resultKey: Array<string>
  result: {
    [key: string]: number
  }
  map: Array<FilterPopupDataItem>
}

export interface OSSPostPolicyResult {
  accessKeyId: string
  callback: string
  dir: string
  host: string
  policy: string
  postId: string
  signature: string
}
