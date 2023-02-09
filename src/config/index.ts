/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
/*
 * @Author: cui
 * @Date: 2021-03-05 11:56:23
 * @LastEditors: 最后编辑时间
 * @LastEditTime: 2021-03-05 14:07:58
 * @Description: request说明
 */

export {}

namespace RequestFunc {
  //request请求
  type RequestData<T> = {
    /** 请求方式 */
    methodType?: 'GET' | 'POST'
    /** 传递的数据 */
    data?: T
    /** 路径 */
    url: string
  }
  //请求设置
  export type RequestConfig = {
    /** 父路径 */
    baseUrl?: string
    /** 请求头 */
    header?: any
    /** 是否加载 */
    loading?: boolean
    /** 传递的data数据类型 */
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
  export type request = <R = AnyObject, T = AnyObject>(
    data: RequestData<T>,
    config?: RequestConfig
  ) => Promise<RequestReturnData<R>>
}
