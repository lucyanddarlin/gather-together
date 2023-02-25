export const TOKEN_KEY = 'USER-TOKEN'
export const PROFILE_KEY = 'USER-PROFILE'
export const HOME = 0
export const RACE = 1
export const LECTURE = 2
export const ACTIVITY = 3
export const GATHER = 4

export const SHOW_TOP = 300
export const TITLE = 0
export const CONTENT = 1

export const enum PROFILE {
  CV,
  FOLLOW,
  FAVOUR,
  SETTING,
}

export const enum SETTING {
  avatar,
  username,
  bind,
  id,
  contact,
  about,
  admin,
  publish,
}

export const enum GENDER {
  woman,
  man,
  unknown,
}

export const enum PROFESSION_TYPE {
  STEM = 1,
  ECONOMY,
  LAW,
  ART,
  EDU,
  HISTORY,
  AGRICULTURE,
  MEDICINE,
  SPECIAL,
}
export const PROFESSION_LIST = [
  { index: PROFESSION_TYPE.STEM, value: '理工类', isSelected: false },
  { index: PROFESSION_TYPE.ECONOMY, value: '经管类', isSelected: false },
  { index: PROFESSION_TYPE.LAW, value: '法学类', isSelected: false },
  { index: PROFESSION_TYPE.ART, value: '艺术/人文', isSelected: false },
  { index: PROFESSION_TYPE.EDU, value: '教育类', isSelected: false },
  { index: PROFESSION_TYPE.HISTORY, value: '历史/哲学', isSelected: false },
  { index: PROFESSION_TYPE.AGRICULTURE, value: '农业类', isSelected: false },
  { index: PROFESSION_TYPE.MEDICINE, value: '医学类', isSelected: false },
  { index: PROFESSION_TYPE.SPECIAL, value: '特殊类', isSelected: false },
]
