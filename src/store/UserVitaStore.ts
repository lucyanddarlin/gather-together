import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

// 使用setup模式定义
export const currentUserVitaStore = defineStore('vita', () => {
  const currentUserVitaId = ref<Number>(0)
  // 人才库 简历
  const UserVita = reactive([
    {
      //todo 类别，tag，后续需要针对后端进行更改
      tags: ['软件/硬件', '理工类'],
      certs: [
        {
          cert_id: 123,
          cert_name: '大学英语四级',
          date: '2022-10',
          user_id: 123321,
        },
        {
          cert_id: 123,
          cert_name: '计算机二级',
          date: '2022-10',
          user_id: 123321,
        },
      ],
      college: 'dasdas',
      college_id: 3213123,
      contact: '193291321',
      good_at: '能迅速准确的完成领导布置的工作，工作认真负责，经验丰富',
      grade: 2020,
      head_url: 'dsaljdla',
      name: '用户名称',
      profession: '软件工程专业',
      profile: '能迅速准确的完成领导布置的工作，工作认真负责，经验丰富',
      races: [
        {
          award: 'dsadas',
          description: 'dsadas',
          race_id: 123321,
          race_name: 'cjlkasd',
          user_id: 123321,
        },
      ],
      school: '广州大学',
      sex: 0,
      skills: [
        {
          description: '全栈型,前端VUE2/3后端JAVA SpringBoot',
          skill_id: 12321,
          skill_name: '软件/硬件',
          user_id: 123321,
        },
      ],
      user_id: 123321,
    },
  ])
  const currentPerson = ref()
  return { currentUserVitaId, UserVita, currentPerson }
})
