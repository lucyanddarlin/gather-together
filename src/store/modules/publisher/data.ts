import { HostType, Level, ScoreType, State, Type } from '@/typings/publisher'

export const matches = [
  {
    post_id: 114514,
    title: '全国科技竞赛',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Publish,
    host: '工信部、教育部、财政部',
    host_type: HostType.学校,
    location: '广州大学文科教学楼',
    race_level: Level.国家级,
    post_type: Type.比赛,
    score_type: ScoreType.科技学术,
    access: '报名链接',
    description:
      '我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人',
  },
  {
    post_id: 114515,
    title: '全国科技竞赛',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Uncensore,
    host: '工信部、教育部、财政部',
    host_type: HostType.政府,
    location: '广州大学文科教学楼',
    race_level: Level.国家级,
    post_type: Type.比赛,
    score_type: ScoreType.科技学术,
    access: '报名链接',
    description: '短描述',
  },
]

export const lectures = [
  {
    post_id: 114516,
    title: '考研讲座',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Publish,
    host: '工信部、教育部、财政部',
    host_type: HostType.学校,
    location: '广州大学文新楼107',
    post_type: Type.讲座,
    score_type: ScoreType.综合类,
    access: '报名链接',
    description:
      '我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人',
  },
  {
    post_id: 114517,
    title: '考研讲座线上',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Delete,
    host: '工信部、教育部、财政部',
    host_type: HostType.学校,
    location: '广州大学文新楼107',
    post_type: Type.讲座,
    score_type: ScoreType.科技学术,
    access: '报名链接',
    description:
      '我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人',
  },
]

export const activities = [
  {
    post_id: 114518,
    title: '月度阅读活动',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Publish,
    host: '工信部、教育部、财政部',
    host_type: HostType.学校,
    location: '广州大学文科教学楼',
    post_type: Type.活动,
    score_type: ScoreType.综合类,
    access: '报名链接',
    description:
      '我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人',
  },
  {
    post_id: 114519,
    title: '月度阅读活动',
    start_time: new Date(2022, 11, 20, 10, 0),
    end_time: new Date(2023, 0, 6, 10, 0),
    state: State.Repulse,
    host: '工信部、教育部、财政部',
    host_type: HostType.学校,
    location: '广州大学文科教学楼',
    race_level: Level.国家级,
    post_type: Type.活动,
    score_type: ScoreType.科技类,
    access: '报名链接',
    description:
      '我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人我们致力于帮助每个人',
  },
]
