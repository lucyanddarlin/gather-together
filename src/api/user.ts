import { get, post } from './request'
import type {
  GetUserProfileResult,
  PostLoginResult,
  RawUserCv,
} from '@/typings/user'

export const reqUserLogin = (data: {
  iv: string
  code: string
  encryptedData: string
}) => post<PostLoginResult>('/auth/user', data)

export const reqGetUserProfile = () =>
  get<GetUserProfileResult>('/user/info/get')

export const reqGetUserCV = () =>
  get<{ code: number; message: string; body: RawUserCv }>('/user/vita/get')

export const reqCreateUserCV = (cv: RawUserCv) =>
  post<{ [key: string]: string }>('/user/vita/create', cv)

export const reqRemoveUserCV = () =>
  post<{ [key: string]: string }>('/user/allVita/remove')
