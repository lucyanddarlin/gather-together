import { reactive } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const gatherProjectStore = defineStore('project', () => {
  // 项目库
  const gatherProject = reactive([
    {
      // 学院 id
      college_id: 1,
      // 学院名称
      college_name: '广州大学',
      // 创建项目时间
      create_time: '2022-10-11',
      //  创建者 id
      creator_id: 1111321312,
      // 团队介绍
      introduce:
        '依托于核心管弦乐课程搭建音乐教育产业链，建立音乐学习数据库，涵盖音乐后蒙、水平认证、研学、升学咨询等',
      // 团队人数
      member_num: 12321321312,
      // 团队成员信息
      members: [],
      // 招募需求
      needs: 'dasdas',
      imgList: ['', '', ''],
      // 项目唯一 id
      project_id: 321312321,
      // 项目名称
      project_name: '好旋律音乐教育大数据平台',
      // 比赛唯一 id
      race_id: 231312,
      // 姓名
      race_name: 'ldasdajsl',
      // tag 标签 todo(后期更换新接口的时候要替换，这里仅是测试用)
      tagList: ['互联网+', '创新创业', '广州大学'],
      // 招募状态
      state: 1,
    },
  ])

  return { gatherProject }
})
