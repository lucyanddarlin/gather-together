import { reactive } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const gatherFilterStore = defineStore('manner', () => {
  //筛选菜单

  //   能力筛选
  const mannerFilterList = reactive([
    {
      mainName: '能力类型',
      singSelect: true,
      selectList: [
        { id: 0, value: '运营/策划' },
        { id: 1, value: '软件/硬件' },
        { id: 2, value: '财务/法律' },
        { id: 3, value: '美工/设计' },
        { id: 4, value: '宣传/推广' },
        { id: 5, value: '科研/学术' },
      ],
    },
  ])
  //   方向筛选
  const directionFilterList = reactive([
    {
      mainName: '学习方向',
      singSelect: true,
      selectList: [
        { id: 0, value: '理工类' },
        { id: 1, value: '经管类' },
        { id: 2, value: '法学类' },
        { id: 3, value: '艺术/人文' },
        { id: 4, value: '教育类' },
        { id: 5, value: '历史/哲学' },
        { id: 6, value: '农业类' },
        { id: 7, value: '医学类' },
        { id: 8, value: '特殊类' },
      ],
    },
  ])

  // 项目模式 筛选

  const projectModeFilterList = reactive([
    {
      mainName: '项目模式',
      singSelect: true,
      selectList: [
        { id: 0, value: 'IT/软件' },
        { id: 1, value: '硬件/电子' },
        { id: 2, value: '互联网+' },
        { id: 3, value: '线下运营' },
        { id: 4, value: '成果转化' },
        { id: 5, value: '调研/探究' },
      ],
    },
  ])
  // 项目类型 筛选

  const projectTypeFilterList = reactive([
    {
      mainName: '项目类型',
      singSelect: true,
      selectList: [
        { id: 0, value: '创新创业' },
        { id: 1, value: '科技学术' },
        { id: 2, value: '人文社科' },
      ],
    },
  ])
  return {
    mannerFilterList,
    directionFilterList,
    projectModeFilterList,
    projectTypeFilterList,
  }
})
