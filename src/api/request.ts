/* eslint-disable no-unused-vars */
import BaseRequestConfig from '@/config/config'
import { showLoading } from '@/utils/common'
type RequestData<T> = {
  /** 请求方式 */
  methodType?: 'GET' | 'POST'
  /** 传递的数据 */
  data?: T
  /** 路径 */
  url: string
}
//请求设置
type RequestConfig = {
  port?: string
  baseUrl?: string
  prefix?: string
  header?: any
  /** 是否加载 */
  loading?: boolean
  dataType?: string
}
//返回数据类型
type RequestReturnData<T> = {
  code: 200 | 500 | number
  data: T
}
/**
 * request请求
 */
type request = <R = AnyObject, T extends AnyObject = AnyObject>(
  data: RequestData<T>,
  config?: RequestConfig
) => Promise<RequestReturnData<R>>
/**
 * 根据访问路径和data生成key
 * @param path 路径
 * @param data 请求数据
 */
const createKey = (path: string, data: any) => `${JSON.stringify(data)}${path}`

//储存request请求map
const requestList: Map<string, UniApp.RequestTask> = new Map()

//是否正在加载中
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
  //加载动画
  if (loading && loadingBox === null) {
    console.log('开启加载')
    //开启加载动画
    loadingBox = showLoading()
  }
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMDQzMTI5MTUzMzMyMjI0MDAiLCJpYXQiOjE2NzY1NTU4MTQsInJvbGUiOiJbe1wiYXV0aG9yaXR5XCI6XCJST0xFX1VTRVJcIn0se1wiYXV0aG9yaXR5XCI6XCJST0xFX0FETUlOXCJ9XSIsImV4cCI6MTY3NzE2MDYxNH0.aTHxAcRpQnTgubN9CdvVwZCvHwpx5CrN47d3AwDqFeBaBbrdqVkuLvYGGnXmfUEHWm4t_VEaUYTq-8KmeafX7Q'
  if (token) {
    header.Authorization = token
  }
  console.log('request', {
    methodType,
    data,
    url: `${baseUrl}:${port}${prefix}${url}`,
  })
  return new Promise((resolve, reject) => {
    //生成key
    const requestKey = createKey(url, data)
    // 加载动画
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
        if (resultCode > 400) {
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
        // 移除request请求
        requestList.delete(requestKey)
        // 如果加载
        if (loadingBox !== null && requestList.size === 0) {
          // 关闭提示
          loadingBox = loadingBox()
        }
      },
    })
    //先关闭上一个同路径同参数请求
    requestList.get(requestKey)?.abort()
    //存储请求
    requestList.set(requestKey, requestClose)
  })
}

//get请求
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

//post请求
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
