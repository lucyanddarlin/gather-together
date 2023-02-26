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

export interface RawUserCv {
  user_id?: string
  name: string
  sex: string
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
  certs?: any[]
  projects?: any[]
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
