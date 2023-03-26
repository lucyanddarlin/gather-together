/* eslint-disable no-unused-vars */
import BaseRequestConfig from '@/config/config'
import { useUserStore } from '@/store/modules/user'
// import { showLoading } from '@/utils/common'
import { TOKEN_KEY } from '@/utils/constant'

type RequestData<T> = {
  methodType?: 'GET' | 'POST'
  data?: T
  url: string
}
type RequestConfig = {
  port?: string
  baseUrl?: string
  prefix?: string
  header?: any
  loading?: boolean
  dataType?: string
}
type RequestReturnData<T> = {
  code: 200 | 500 | number
  data: T
}
type request = <R = AnyObject, T extends AnyObject = AnyObject>(
  data: RequestData<T>,
  config?: RequestConfig
) => Promise<RequestReturnData<R>>
/**
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`

const requestList: Map<string, UniApp.RequestTask> = new Map()

let loadingBox: null | (() => null) = null
/**
 * request请求
 * @param param0 必要参数
 * @param param1 配置
 */
const RequestMethod: request = (
  { methodType = 'GET', data = {}, url = '' },
  {
    baseUrl = BaseRequestConfig.baseUrl,
    port = BaseRequestConfig.port,
    prefix = BaseRequestConfig.prefix,
    header = {},
    loading = true,
    dataType = 'json',
  } = {}
) => {
  const userStore = useUserStore()
  if (loading && loadingBox === null) {
    // loadingBox = showLoading()
  }
  const token = uni.getStorageSync(TOKEN_KEY)
  // const token =
  //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDQzMTI5MTUzMzMyMjI0MDAiLCJpYXQiOjE2Nzg0NDA0OTAsInJvbGUiOiJbe1wiYXV0aG9yaXR5XCI6XCJST0xFX1VTRVJcIn0se1wiYXV0aG9yaXR5XCI6XCJST0xFX0FETUlOXCJ9XSIsImV4cCI6MTY3OTA0NTI5MH0.18VB636z6LJ4mgUeZR30n19Pxi3YjIospw8Ymj706o6UdvKxcQ5WwOIkWt5hlrrSf9uaXspUbZWT90wej2Xk1w'
  if (token) {
    header.Authorization = token
  }
  console.log('request', {
    methodType,
    data,
    url: `${baseUrl}:${port}${prefix}${url}`,
  })
  return new Promise((resolve, reject) => {
    const requestKey = createKey(url, data)
    const requestClose = uni.request({
      url: `${baseUrl}:${port}${prefix}${url}`,
      data,
      header,
      method: methodType,
      timeout: 3000,
      dataType,
      success: (res) => {
        const resultData: any = res.data
        console.log('response', { resultData, url })
        const resultCode = Number.parseInt(resultData!.code)
        if (resultCode > 300) {
          if (resultCode === 403) {
            getApp().globalData!.failPageRoutes.add(
              getCurrentPages().at(-1)?.route
            )
            userStore.userLogout()
            uni.switchTab({ url: '/pages/profile/profile' })
          }
          console.log('error request', res)
          resolve({ code: resultCode, data: null as any })
        }
        resolve({
          code: resultCode,
          data: res.data as any,
        })
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        requestList.delete(requestKey)
        if (loadingBox !== null && requestList.size === 0) {
          loadingBox = loadingBox()
        }
      },
    })
    requestList.get(requestKey)?.abort()
    requestList.set(requestKey, requestClose)
  })
}

export const get = <R = AnyObject, T extends AnyObject = AnyObject>(
  url: string,
  data?: T,
  config?: RequestConfig
) =>
  RequestMethod<R, T>(
    {
      methodType: 'GET',
      url,
      data,
    },
    config
  )

export const post = <R = AnyObject, T extends AnyObject = AnyObject>(
  url: string,
  data?: T,
  config?: RequestConfig
) =>
  RequestMethod<R, T>(
    {
      methodType: 'POST',
      url,
      data,
    },
    config
  )
