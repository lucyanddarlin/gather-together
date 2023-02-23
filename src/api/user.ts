import { get, post } from './request'
import type { GetUserProfileResult, PostLoginResult } from '@/typings/user'

export const reqUserLogin = (data: {
  iv: string
  code: string
  encryptedData: string
}) => post<PostLoginResult>('/auth/user', data)

export const reqGetUserProfile = () =>
  get<GetUserProfileResult>('/user/info/get')
