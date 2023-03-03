import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  type BodyFilter,
  type GetPublish,
  type IDescription,
  type IPublish,
  type Publish,
  type Selector,
  State,
  Type,
  TypeMap,
} from '@/typings/publisher'
import {
  DescToChangeBody,
  DescToPostBody,
  DescToPub,
  GetPublishToDesc,
  PubToDesc,
} from '@/typings/publisher/resolve'
import {
  reqDeletePublish,
  reqGetPublish,
  reqPostChange,
  reqPostPublish,
} from '@/api/publisher'
import { showMsg } from '@/utils/common'
export const usePublisherStore = defineStore('publisher', () => {
  const LOAD_PAGES_SIZE = 8
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
    descriptions[TypeMap[post_type as keyof typeof Type]].push(...arr_desc)
    publish[TypeMap[post_type as keyof typeof Type]] = descriptions[
      TypeMap[post_type as keyof typeof Type]
    ].map((item) => DescToPub(item, post_type))
  }

  // 创建发布
  async function reqCreatePublish(p: Publish) {
    const desc = PubToDesc(p, cur_type.value)
    const response = await reqPostPublish(DescToPostBody(desc))
    console.log('response', response)
    if (response.code === 200) return response.data.body.postId
    return 0
  }

  // 修改发布
  async function reqUpdatePublish(p: Publish) {
    const desc = PubToDesc(p, cur_type.value)
    const response = await reqPostChange(DescToChangeBody(desc), p.post_id)
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

  function loadDesc(desc: Array<IDescription>) {
    desc.forEach((d) => {
      const type: Type = d.post_type
      descriptions[type].push(d)
      const p: Publish = DescToPub(
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
          // 更新收到的post_id
          description.post_id = post_id
          // 更新帖子的状态，后面可根据返回信息定义帖子状态，如有图片则进入审核状态等等
          description.state = State.Publish
          descriptions[description.post_type].unshift(description)
          publish[description.post_type].unshift(p)
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

    for (const [key, value] of Object.entries(selections)) {
      if (value === '') continue
      if (key === 'host_type') {
        console.log('key', key)
        body.sponsor_type = selections[key]
        console.log('赋值后', body)
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
    }
    console.log('body', body)
    return body
  }

  return {
    types,
    cur_type,
    publish,
    descriptions,
    current_desc,
    loadDesc,
    update,
    loadPage,
    reqCreatePublish,
    deletePost,
    resetPage,
  }
})
