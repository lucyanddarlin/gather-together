export interface TopSection {
  title: string
  index: number
}

export interface ListMap<T = any> {
  dataList: Array<T>
  dataMap: any
  key: string
  page: number
  size: number
  status: 'loading' | 'more' | 'noMore'
}

export interface IPaperItem {
  topic_id: string
  creator_id: string
  title: string
  content: string
  created_at: Date
  last_reply_time: Date
  picture_urls: string[]
  creator_name: string
  creator_head_url: string
  like_count: number
  reply_count: number
  forward_count: number
  like: boolean
}

export interface HomeTopicInfo {
  topic_id: string
  creator_id: string
  title: string
  content: string
  created_at: Date
  last_reply_time: Date
  picture_urls: string[]
  creator_name: string
  creator_head_url: string
  like_count: number
  reply_count: number
  forward_count: number
  like: boolean
}

export interface ICommentItem {
  comment_id: string
  topic_id: string
  user_id: string
  content: string
  create_at: Date
  last_reply_time: Date
  head_url: string
  username: string
  reply_head?: Array<any>
  reply_id?: string
  to_reply_username?: string
  to_reply_id: string
}

export interface PostTopicResult {
  accessKeyId: string
  policy: string
  signature: string
  dir: string
  host: string
  callback: string
  topicId: string
}
