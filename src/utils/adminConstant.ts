// 举报类型
export enum ReportType {
  FORUM_POST = 2,
  FORUM_COMMENT,
  FORUM_REPLY,
  RESUME,
  PROJECT,
  USER, // 举报用户对应的枚举是未知的，可能和简历一样是5
}

export enum PublishType {
  ANNOUNCEMENT = 1,
}

export enum ReportState {
  PENDING,
  PASS,
  DENY,
}

// 由举报类型和事务id导向源链接
interface Src {
  readonly [key: string]: any
}
export const ReportSrc: Src = {
  [ReportType.PROJECT]: `/pagesSub/gatherSub/gatherSub-project?project_id=`,
  [ReportType.FORUM_POST]: `/pagesSub/paperDetail/index?topic_id=`,
  [ReportType.RESUME]: `/pagesSub/gatherSub/gatherSub-person?user_id=`,
}
