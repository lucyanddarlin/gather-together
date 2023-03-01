import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  type BodyFilter,
  DescToChangePublish,
  DescToPostPublish,
  type GetPublish,
  GetPublishToDesc,
  type IDescription,
  type IPublish,
  PubToDesc,
  Publish,
  type Selector,
  State,
  Type,
  TypeMap,
} from '@/typings/publisher'
import {
  reqDeletePublish,
  reqGetPublish,
  reqPostChange,
  reqPostPublish,
} from '@/api/publisher'
import { showMsg } from '@/utils/common'
// import { activities, lectures, matches } from './data'
export const usePublisherStore = defineStore('publisher', () => {
  const LOAD_PAGES_SIZE = 5
  const current_desc = ref<IDescription>()
  const cur_type = ref<'' | keyof typeof Type>('')
  const types = [
    {
      id: '0',
      type: '比赛',
      pages: 0,
    },
    {
      id: '1',
      type: '讲座',
      pages: 0,
    },
    {
      id: '2',
      type: '活动',
      pages: 0,
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

  // 加载页面
  async function loadPage(post_type: string, selections: Selector) {
    const t = types.find((item) => item.type === post_type)
    if (!t) return
    const nextPage = t.pages // 当前需要请求的页
    const id = Number.parseInt(t.id)
    const body: BodyFilter = getBodyFilter(post_type, selections)
    const page = await reqGetPublish(nextPage, LOAD_PAGES_SIZE, id, body)
    console.log('page', page)
    const result: Array<GetPublish> = page.data.body.result
    if (result.length === 0) return
    t.pages++

    const arr_desc: Array<IDescription> = result
      .map((item) => GetPublishToDesc(item))
      .filter((item) => item.state !== State.Delete)
    // 因为State.Delete被过滤，能显示的不一定是LOAD_PAGES_SIZE个
    // 这时，若下一页还有，且本页数量不够LOAD_PAGES_SIZE，则继续请求，保证onReachBottom能够正常触发
    // while (arr_desc.length < LOAD_PAGES_SIZE) {
    //   // 请求下一页
    //   const page = await reqGetPublish(t.pages, LOAD_PAGES_SIZE, id, {})
    //   // 没有下一页了
    //   if (page.data.body.length === 0) break
    //   // 有下一页，把请求到的push到数组
    //   arr_desc.push(
    //     ...page.data.body
    //       .map((item) => GetPublishToDesc(item))
    //       .filter((item) => item.state !== State.Delete)
    //   )
    //   t.pages++
    // }
    descriptions[TypeMap[post_type as keyof typeof Type]].push(...arr_desc)
    publish[TypeMap[post_type as keyof typeof Type]] = descriptions[
      TypeMap[post_type as keyof typeof Type]
    ].map((item) => getPubFromDesc(item, post_type))
  }

  // 创建发布
  async function reqCreatePublish(p: Publish) {
    const desc = PubToDesc(p, cur_type.value)
    const response = await reqPostPublish(DescToPostPublish(desc))
    console.log('response', response)
    if (response.code === 200) return response.data.body.postId
    return 0
  }

  // 修改发布
  async function reqUpdatePublish(p: Publish) {
    const desc = PubToDesc(p, cur_type.value)
    const response = await reqPostChange(DescToChangePublish(desc), p.post_id)
    console.log('response', response)
    if (response.code === 200) return true
    return false
  }

  // 删除帖子
  function deletePost(d: IDescription) {
    // 询问

    uni.showModal({
      title: '删除',
      content: '确认删除该帖子吗？',
      confirmColor: '#FF6969',
      success: async (result) => {
        if (result.confirm) {
          // const p: ChangePublish = DescToChangePublish(d)
          const response = await reqDeletePublish(d.post_id)
          if (response.code !== 200) {
            showMsg('删除失败', 'error')
            return
          }
          showMsg('删除成功', 'success')
          d.state = State.Delete
          uni.navigateBack()
        }
      },
    })
  }

  function getPubFromDesc(
    description: IDescription | undefined,
    post_type: string
  ) {
    if (!description) return new Publish(post_type)
    const type = Type[description.post_type]
    // 后续提取到配置文件
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
        type: 'text_no_enter',
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
        type: 'text_no_enter',
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
        type: 'text_elastic',
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
        type: 'imgs',
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
      reqCreatePublish(p)
        .then((post_id) => {
          if (post_id === 0) {
            showMsg('发布失败', 'error')
            uni.navigateBack()
            return
          }
          description.post_id = post_id
          descriptions[description.post_type].push(description)
          publish[description.post_type].push(p)
          console.log('publish', publish[description.post_type])
          console.log('description', descriptions[description.post_type])
          uni.navigateBack()
          showMsg('发布成功', 'success')
        })
        .catch((e) => {
          console.log(e)
          showMsg('发布失败', 'error')
          uni.navigateBack()
        })
    } else {
      reqUpdatePublish(p).then((success) => {
        if (!success) {
          showMsg('修改失败', 'error')
          uni.navigateBack()
          return
        }
        descriptions[description.post_type].splice(index, 1, description)
        publish[description.post_type].splice(index, 1, p)
        console.log('publish', publish[description.post_type])
        console.log('description', descriptions[description.post_type])
        uni.navigateBack()
        showMsg('发布成功', 'success')
      })
    }
  }

  function resetPage(post_type: string) {
    const t = types.find((item) => item.type === post_type)
    if (!t) {
      console.log('未知类型：', post_type)
      return
    }
    // 重置页数
    t.pages = 0
    // 清空描述页面和发布页面
    const type: Type = TypeMap[post_type as keyof typeof Type]
    descriptions[type].splice(0)
    publish[type].splice(0)
  }

  function getBodyFilter(post_type: string, selections: Selector): BodyFilter {
    // 收集已经被选中的筛选项
    console.log('selections', selections)
    // 空字符串即未选
    const body: BodyFilter = {}
    Object.values(selections).forEach((key: string) => {
      // 公有
      if (key === 'host_type') {
        body.sponsor_type = selections[key]
      }
      // 公有，但是类型不同使用不同命名
      if (key === 'score_type') {
        if (post_type === '比赛') body.race_type = selections[key]
        else if (post_type === '活动') body.event_type = selections[key]
        else if (post_type === '讲座') body.lecture_type = selections[key]
      }
      // 专有
      if (key === 'race_level') {
        body[key as keyof BodyFilter] = selections[key]
      }
    })
    console.log('body', body)
    return body
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
    loadPage,
    reqCreatePublish,
    deletePost,
    resetPage,
  }
})
