export interface PostLoginResult {
  code: string
  message: string
  body: {
    accessToken: string
    expiredAt: string
  }
}

export interface GetUserProfileResult {
  code: string
  message: string
  body: UserProfile
}

export interface UserProfile {
  user_id: string
  open_id: string
  is_admin: boolean
  name: string
  signature: string
  head_url: string
  is_black_list: number
  has_avatar_modify: boolean
  has_nick_modify: boolean
}

export interface CVProject {
  user_id?: string
  project_id?: string
  project_name: string
  project_exp: string
}

export interface CVCert {
  user_id?: string
  cert_id?: string
  cert_name: string
  date: Date
}

export interface RawUserCv {
  user_id?: string
  name: string
  sex: number
  school: string
  college_id?: number
  college?: string
  profession: string
  grade?: number
  profile: string
  contact: string
  direction: any
  skill_id: any
  skill_des: any
  zone_id?: any
  year: any
  certs?: Array<CVCert>
  projects?: Array<CVProject>
}

export interface CreateCV {
  name: string
  sex: number
  school: string
  profession: string
  profile: string
  contact: string
  direction: any
  skill_id: any
  skill_des: any
  zone_id: any
  year: any
}

export enum MODIFY_PROFILE {
  username,
  avatar,
}

export interface ModifyUserProfile {
  nickname: string
}

export interface PostOSSResult {
  accessKeyId: string
  policy: string
  signature: string
  dir: string
  host: string
  callback: string
  userId?: string
  topicId?: string
  postId?: string
}
