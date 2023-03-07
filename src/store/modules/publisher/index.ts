import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  type BodyFilter,
  type GetPublish,
  type IDescription,
  type IPublish,
  Publish,
  State,
  Type,
} from '@/typings/publisher'
import {
  DescToChangeBody,
  DescToPostBody,
  GetPublishToDesc,
  PubToDesc,
} from '@/typings/publisher/resolve'
import {
  reqDeletePublish,
  reqGetPublish,
  reqPostChange,
  reqPostPublish,
} from '@/api/publisher'
import { isNull, showMsg } from '@/utils/common'
import { TYPE_LIST } from '@/utils/publishConstant'
import { reqUploadPostImages } from '@/api/imageUpload'
import type { PostOSSResult } from '@/typings/user'
export const usePublisherStore = defineStore('publisher', () => {
  const LOAD_PAGES_SIZE = 8
  const current_desc = ref<IDescription>()
  const cur_type = ref<Type>(0)
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
  async function loadPage(body: BodyFilter) {
    const t = types.find((item) => item.type === TYPE_LIST[cur_type.value])
    if (!t) return
    console.log('body', body)
    const nextPage = t.pages // 当前需要请求的页
    const id = Number.parseInt(t.id)
    const page = await reqGetPublish(nextPage, LOAD_PAGES_SIZE, id, body)
    console.log('page', page)
    const result: Array<GetPublish> = page.data.body.result
    if (result.length === 0) return
    t.pages++

    const arr_desc: Array<IDescription> = result
      .map((item) => GetPublishToDesc(item))
      .filter((item) => item.state !== State.Delete)
    descriptions[cur_type.value].push(...arr_desc)
    publish[cur_type.value] = descriptions[cur_type.value].map((item) =>
      Publish.DescToPub(item, TYPE_LIST[cur_type.value])
    )
  }

  // 创建发布
  async function reqCreatePublish(p: Publish) {
    const desc = PubToDesc(p, cur_type.value)
    const { data } = await reqPostPublish(DescToPostBody(desc))
    if (!isNull(data)) {
      if (!isNull(p.imgs?.value)) {
        const { error } = await reqUploadPostImages(
          p.imgs?.value as Array<string>,
          data.body as PostOSSResult
        )
        if (error) return 0
      }
      return Number(data.body.postId)
    }
    return 0
  }

  // 修改发布
  async function reqUpdatePublish(p: Publish) {
    console.log('reqUpdatePublish', p)
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
          uni.redirectTo({ url: './publisher-manage' })
        }
      },
    })
  }

  function loadDesc(desc: Array<IDescription>) {
    desc.forEach((d) => {
      const type: Type = d.post_type
      descriptions[type].push(d)
      const p: Publish = Publish.DescToPub(
        d,
        types.find((t) => t.id === Type[type])?.type || ''
      )
      if (p) {
        publish[type].push(p)
      }
    })
  }

  function update(p: Publish) {
    const description = PubToDesc(p, cur_type.value)
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
          description.post_id = Number(post_id)
          // // TODO: 更新帖子的时间状态，建议丢给后端计算后随post_id一并返回
          // if (description.start_time > new Date()) {
          //   description.time_state = TimeState.NotStarted
          // } else if (description.end_time < new Date()) {
          //   description.time_state = TimeState.Ended
          // } else {
          //   description.time_state = TimeState.Ongoing
          // }
          // p.time_state = description.time_state
          descriptions[description.post_type].unshift(description)
          publish[description.post_type].unshift(p)
          console.log('publish', publish[description.post_type])
          console.log('description', descriptions[description.post_type])
          uni.navigateBack()
          uni.redirectTo({ url: './publisher-manage' })
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
        uni.redirectTo({ url: './publisher-manage' })
        showMsg('修改成功', 'success')
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
    descriptions[cur_type.value].splice(0)
    publish[cur_type.value].splice(0)
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
