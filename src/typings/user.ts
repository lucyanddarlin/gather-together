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
