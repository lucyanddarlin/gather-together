import { showMsg } from '@/utils/common'
import type { PostOSSResult } from '@/typings/user'

const enum UploadType {
  topic,
  user,
  post,
}
const uploadTimeout = 1200000
const types = [
  ['x:topicid', 'topicId'],
  ['x:userid', 'userId'],
  ['x:postid', 'postId'],
]
interface UploadQuery {
  key: string
  dir: string
  policy: string
  ossaccessKeyId: string
  signature: string
  callback: string
  [value: string]: any
}

const dispatchUpload = (filePath: string, query: UploadQuery, host: string) => {
  console.log('query', query)
  console.log('host', host)
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: host,
      filePath,
      formData: query,
      name: 'file',
      timeout: uploadTimeout,
      success: (res) => {
        console.log(res)
        if (res.statusCode !== 200) {
          reject(res)
          return
        }
        resolve(res)
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      },
    })
  })
}

const imageUpload = (
  image: Array<string>,
  data: PostOSSResult,
  type: number
) => {
  if (!types[type]) return
  uni.showLoading({
    title: '发布中....',
    mask: true,
  })
  const { accessKeyId, dir, host, callback, policy, signature } = data
  const imagePromise = []
  // eslint-disable-next-line no-restricted-syntax
  for (const index in image) {
    const filePath = image[index]
    const key = `${dir}_${index}${Date.now()}${Math.trunc(Math.random() * 150)}`
    const query: UploadQuery = {
      key,
      dir,
      policy,
      ossaccessKeyId: accessKeyId,
      signature,
      callback,
      [types[type][0]]: data[types[type][1] as keyof typeof data],
    }
    imagePromise.push(dispatchUpload(filePath, query, host))
  }
  return Promise.all(imagePromise).finally(() => {
    uni.hideLoading()
  })
}

const onResolve = () => {
  return { error: null }
}
const onReject = () => {
  showMsg('上传图片出现错误,请稍后再试')
  return { error: { message: '图片上传错误' } }
}

export const reqUploadTopicImage = (image: string[], data: PostOSSResult) => {
  return imageUpload(image, data, UploadType.topic)!.then(onResolve, onReject)
}

export const reqUploadUserAvatar = (image: string[], data: PostOSSResult) => {
  return imageUpload(image, data, UploadType.user)!.then(onResolve, onReject)
}

export const reqUploadPostImages = (image: string[], data: PostOSSResult) => {
  return imageUpload(image, data, UploadType.post)!.then(onResolve, onReject)
}
