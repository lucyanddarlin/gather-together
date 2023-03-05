import { reactive } from 'vue'

export const publishProjectList = reactive([
  {
    id: 0,
    title: '标题',
    placeholder: '请输入项目标题',
    value: '',
    isSelect: false,
  },
  {
    id: 1,
    title: '项目模式',
    placeholder: '请选择项目模式',
    value: '',
    isSelect: true,
  },
  {
    id: 2,
    title: '项目类型',
    placeholder: '请选择项目类型',
    value: '',
    isSelect: true,
  },
  {
    id: 3,
    title: '联系方式',
    placeholder: '请输入联系方式，如微信等...',
    value: '',
    isSelect: false,
  },
  {
    id: 4,
    title: '项目需求',
    placeholder: '请输入项目需求',
    value: '',
    isSelect: false,
  },
])
//   能力筛选
export const mannerFilterList = reactive([
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
export const directionFilterList = reactive([
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

export const projectModeFilterList = reactive([
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

export const projectTypeFilterList = reactive([
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
// 顶部栏 列表
export const topNavList = reactive([
  { title: '项目库', index: 0 },
  { title: '人才库', index: 1 },
])
// 筛选列表
export const filterNavList = reactive([
  { title: '本校', index: 0 },
  { title: '综合', index: 1 },
])
