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
  user_id: string
  name: string
  sex: number
  school: string
  college_id: number
  college: string
  profession: string
  grade: number
  good_at: string
  profile: string
  contact: string
  skills: any[]
  races: any[]
  certs: any[]
  head_url: any
}
