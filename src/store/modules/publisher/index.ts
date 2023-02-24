import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  type IDescription,
  type IPublish,
  PubToDesc,
  Publish,
  Type,
} from '@/typings/publisher'
import { activities, lectures, matches } from './data'
export const usePublisherStore = defineStore('publisher', () => {
  const current_desc = ref<IDescription>()
  const cur_type = ref<'' | keyof typeof Type>('')
  const types = [
    {
      id: '0',
      type: '比赛',
    },
    {
      id: '1',
      type: '讲座',
    },
    {
      id: '2',
      type: '活动',
    },
  ]

  // GET请求得到的信息
  // const descriptions: Record<string, Array<IDescription>> = {}
  // 根据GET请求处理成发布页面的具体信息
  const publish: Record<Type, Array<IPublish>> = reactive({
    0: [],
    1: [],
    2: [],
  })
  const descriptions: Record<Type, Array<IDescription>> = reactive({
    0: [],
    1: [],
    2: [],
  })

  // type PostType = keyof typeof Type
  // 测试部分

  loadDesc(matches)
  loadDesc(lectures)
  loadDesc(activities)

  function getPubFromDesc(
    description: IDescription | undefined,
    post_type: string
  ) {
    if (!description) return new Publish(post_type)
    const type = Type[description.post_type]
    const ipublish: IPublish = {
      post_id: description.post_id,
      title: {
        title: '标题',
        value: description.title,
        type: 'text',
        placeholder: `请输入${type}标题`,
        limit: 20,
      },
      start_time: {
        title: type === '比赛' ? '报名开始' : type,
        value: description.start_time,
        type: 'time',
        placeholder: `请输入${type === '比赛' ? '报名开始' : type}时间`,
      },
      end_time: {
        title: type === '比赛' ? '报名结束' : type,
        value: description.end_time,
        type: 'time',
        placeholder: `请输入${type === '比赛' ? '报名结束' : type}时间`,
      },
      // location: '各学校分会场',
      host: {
        title: '主办方',
        value: description.host,
        type: 'text',
        placeholder: `请输入主办方名称，多个主办方请以顿号隔开`,
        limit: 50,
      },
      host_type: {
        title: '主办方类型',
        value: description.host_type,
        type: 'text_option',
      },
      location: {
        title: `${type}地点`,
        value: description.location,
        type: 'text',
        placeholder: `请输入${type}举办地点`,
        limit: 30,
      },
      score_type: {
        title: `${type}类型`,
        value: description.score_type,
        type: 'option',
        placeholder: `请选择${type}类型`,
      },
      access: {
        title: '报名方式',
        value: description.access,
        type: 'text',
        placeholder: `请输入报名途径指引或者报名链接`,
        limit: 50,
      },
      description: {
        title: `${type}详情`,
        value: description.description,
        type: 'textarea',
        placeholder: `请输入${type}介绍内容`,
      },
      state: description.state,
      imgs: {
        title: '上传图片（可选）',
        value: description.imgs,
        type: 'img',
      },
    }
    const p: Publish = Publish.createPublish(ipublish, post_type)
    if (description.post_type === Type.比赛) {
      p['race_level'] = {
        title: '比赛级别',
        type: 'option',
        placeholder: '请选择比赛级别',
        value: description.race_level,
      }
    }
    return p
  }

  function loadDesc(desc: Array<IDescription>) {
    desc.forEach((d) => {
      const type: Type = d.post_type
      descriptions[type].push(d)
      const p: Publish = getPubFromDesc(
        d,
        types.find((t) => t.id === Type[type])?.type || ''
      )
      if (p) {
        publish[type].push(p)
      }
    })
  }

  function update(p: Publish, post_type: string) {
    const description = PubToDesc(p, post_type)
    const index = descriptions[description.post_type].findIndex(
      (d) => d.post_id === p.post_id
    )
    console.log(index)
    // 不存在
    if (index === -1) {
      descriptions[description.post_type].push(description)
      publish[description.post_type].push(p)
      console.log('新添')
      console.log('publish', publish[description.post_type])
      console.log('description', descriptions[description.post_type])
    } else {
      descriptions[description.post_type].splice(index, 1, description)
      publish[description.post_type].splice(index, 1, p)
      console.log('旧有')
      console.log('publish', publish[description.post_type])
      console.log('description', descriptions[description.post_type])
    }

    uni.navigateBack()
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })
  }

  return {
    types,
    cur_type,
    publish,
    descriptions,
    current_desc,
    getPubFromDesc,
    loadDesc,
    update,
  }
})
