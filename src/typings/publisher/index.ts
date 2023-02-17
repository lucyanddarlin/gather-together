export enum State {
  Create = '0',
  Uncensore = '1',
  Publish = '2',
  Repulse = '3',
  Delete = '4',
  Banned = '5',
}

export const StateMap = {
  [State.Create]: '创建中',
  [State.Uncensore]: '待审核',
  [State.Publish]: '进行中',
  [State.Repulse]: '已驳回',
  [State.Delete]: '已删除',
  [State.Banned]: '已封禁',
}

export enum Type {
  比赛 = 0,
  讲座 = 1,
  活动 = 2,
}

export const TypeMap = {
  比赛: Type.比赛,
  讲座: Type.讲座,
  活动: Type.活动,
}

export enum Level {
  院校级 = 0,
  地方级 = 1,
  国家级 = 2,
}

export const LevelMap = {
  [Level.院校级]: '院校级',
  [Level.地方级]: '地方级',
  [Level.国家级]: '国家级',
}

export enum ScoreType {
  // TODO: 使用了api的得分类型作为代替，发送int32，接口升级后需要更改
  创新创业 = 0,
  人文社科 = 1,
  科技学术 = 2,
  艺术人文 = 3,
  创新创业类 = 4,
  公益类 = 5,
  科技类 = 6,
  文体类 = 7,
  思政教育类 = 8,
  综合类 = 9,
}
export enum MatchType {
  创新创业 = 0,
  人文社科 = 1,
  科技学术 = 2,
}

export const MatchTypeMap = {
  [MatchType.创新创业]: '创新创业',
  [MatchType.人文社科]: '人文社科',
  [MatchType.科技学术]: '科技学术',
}

export enum LectureType {
  创新创业 = 0,
  科技学术 = 1,
  艺术人文 = 2,
}

export const LectureTypeMap = {
  [LectureType.创新创业]: '创新创业',
  [LectureType.科技学术]: '科技学术',
  [LectureType.艺术人文]: '艺术人文',
}
export enum ActivityType {
  创新创业类 = 0,
  公益类 = 1,
  科技类 = 2,
  文体类 = 3,
  思政教育类 = 4,
  综合类 = 5,
}

export const ActivityTypeMap = {
  [ActivityType.创新创业类]: '创新创业类',
  [ActivityType.公益类]: '公益类',
  [ActivityType.科技类]: '科技类',
  [ActivityType.文体类]: '文体类',
  [ActivityType.思政教育类]: '思政教育类',
  [ActivityType.综合类]: '综合类',
}

export const ScoreTypeMap = {
  [ScoreType.创新创业]: '创新创业',
  [ScoreType.人文社科]: '人文社科',
  [ScoreType.科技学术]: '科技学术',
  [ScoreType.艺术人文]: '艺术人文',
  [ScoreType.创新创业类]: '创新创业类',
  [ScoreType.公益类]: '公益类',
  [ScoreType.科技类]: '科技类',
  [ScoreType.文体类]: '文体类',
  [ScoreType.思政教育类]: '思政教育类',
  [ScoreType.综合类]: '综合类',
}

export function getEnum(post_type: keyof typeof Type) {
  switch (post_type) {
    case '比赛':
      return MatchType
    case '讲座':
      return LectureType
    case '活动':
      return ActivityType
    default:
      return MatchType
  }
}

export function getMap(post_type: keyof typeof Type) {
  switch (post_type) {
    case '比赛':
      return MatchTypeMap
    case '讲座':
      return LectureTypeMap
    case '活动':
      return ActivityTypeMap
    default:
      return MatchTypeMap
  }
}

export function getScoreConstant(post_type: keyof typeof Type) {
  switch (post_type) {
    case '比赛':
      return {
        [ScoreType.创新创业]: '创新创业',
        [ScoreType.科技学术]: '科技学术',
        [ScoreType.人文社科]: '人文社科',
      }
    case '活动':
      return {
        [ScoreType.创新创业类]: '创新创业类',
        [ScoreType.公益类]: '公益类',
        [ScoreType.科技类]: '科技类',
        [ScoreType.文体类]: '文体类',
        [ScoreType.思政教育类]: '思政教育类',
        [ScoreType.综合类]: '综合类',
      }
    case '讲座':
      return {
        [ScoreType.创新创业]: '创新创业',
        [ScoreType.艺术人文]: '艺术人文',
        [ScoreType.科技学术]: '科技学术',
      }
  }
}

export enum HostType {
  政府 = 0,
  组织机构 = 1,
  学校 = 2,
}

export const HostTypeMap = {
  [HostType.政府]: '政府',
  [HostType.组织机构]: '组织机构',
  [HostType.学校]: '学校',
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
  type: 'text' | 'textarea' | 'option' | 'text_option' | 'img' | 'time'
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
  post_id: string
  location: string
  host: string
  host_type: HostType
  race_level?: Level
  post_type: Type
  score_type: ScoreType
  access: string
  description: string
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
  post_id: string
  location: IField
  host: IField
  host_type: IField
  race_level?: IField
  // TODO: 比赛类型，后期需更改
  score_type: IField
  access: IField
  description: IField
  imgs?: IField
}

export class Publish implements IPublish {
  title: IField
  start_time: IField
  end_time: IField
  state: State
  post_id: string
  location: IField
  host: IField
  host_type: IField
  race_level?: IField
  score_type: IField
  access: IField
  description: IField
  imgs?: IField
  constructor(type: string) {
    this.title = {
      title: `${type}名称`,
      value: '',
      type: 'text',
      placeholder: '请输入比赛名称',
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
      value: new Date(),
      type: 'time',
      placeholder: `请输入${type === '比赛' ? '报名结束' : type}时间`,
    }
    this.state = State.Create
    this.post_id = ''
    this.location = {
      title: `${type}地点`,
      value: '',
      type: 'text',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}地点`,
      limit: 30,
    }
    this.host = {
      title: `主办方`,
      value: '',
      type: 'text',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}主办方`,
      limit: 50,
    }
    this.host_type = {
      title: `主办方类型`,
      value: HostType.学校,
      type: 'text_option',
    }
    this.race_level = {
      title: `${type}级别`,
      value: Level.地方级,
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
      type: 'text',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}报名方式`,
      limit: 50,
    }
    this.description = {
      title: `${type}简介`,
      value: '',
      type: 'textarea',
      placeholder: `请输入${type === '比赛' ? '比赛' : type}简介`,
      limit: 2000,
    }
    this.imgs = {
      title: `上传图片（可选）`,
      value: [],
      type: 'img',
    }
  }

  public static createPublish(ipublish: IPublish, post_type: string) {
    const publish = new Publish(post_type)
    publish.title = ipublish.title
    publish.start_time = ipublish.start_time
    publish.end_time = ipublish.end_time
    publish.state = ipublish.state
    publish.post_id = ipublish.post_id
    publish.location = ipublish.location
    publish.score_type = ipublish.score_type
    publish.post_id = ipublish.post_id
    publish.host = ipublish.host
    publish.host_type = ipublish.host_type
    publish.description = ipublish.description
    if (ipublish.access) publish.access = ipublish.access
    if (ipublish.imgs) publish.imgs = ipublish.imgs
    if (ipublish.race_level) publish.race_level = ipublish.race_level
    return publish
  }

  public isAllFilled() {
    // 判断是否所有字段都已填写
    const values = Object.values(this)
    for (const value of values) {
      if (value.type in ['text', 'textarea']) {
        continue
      }
      if (value instanceof Object && value.value === '') {
        return false
      }
    }
    return true
  }
}

export function PubToDesc(publish: Publish, post_type: string): IDescription {
  // 将发布的信息转换为描述信息
  const description: IDescription = {
    title: publish.title.value as string,
    start_time: publish.start_time.value as Date,
    end_time: publish.end_time.value as Date,
    state: publish.state,
    post_id: publish.post_id,
    post_type: TypeMap[post_type as keyof typeof Type],
    location: publish.location.value as string,
    host: publish.host.value as string,
    host_type: publish.host_type.value as HostType,
    race_level: publish.race_level?.value as Level,
    score_type: publish.score_type.value as ScoreType,
    access: publish.access.value as string,
    description: publish.description.value as string,
    imgs: publish.imgs?.value as Array<string>,
  }
  return description
}
