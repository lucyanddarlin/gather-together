export const TOKEN_KEY = 'USER-TOKEN'
export const PROFILE_KEY = 'USER-PROFILE'
export const DEFAULT_PAGE = 0
export const DEFAULT_SIZE = 8
export const HOME = 0
export const RACE = 1
export const LECTURE = 2
export const ACTIVITY = 3
export const GATHER = 4
export const PROJECT = 0
export const PEOPLE = 1
export const OWN_TOPIC = 0
export const OWN_PROJECT = 1

export const tabBarArr = [
  'pages/index/index',
  'page/gather/gather',
  'pages/profile/profile',
]

export const INDEX_LIST_KEY: Array<string> = [
  'home',
  'race',
  'lecture',
  'activity',
]

export enum INDEX_LIST {
  RACE,
  LECTURE,
  ACTIVITY,
}
export const GATHER_LIST_KEY: Array<string> = ['project', 'people']
export enum GATHER_LIST {
  PROJECT,
  PEOPLE,
}
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
  policy,
  admin,
  publish,
}

export const enum GENDER {
  woman,
  man,
  unknown,
}
export const enum PROJECT_MODE {
  IT,
  ELEC,
  NET,
  UNDERLINE,
  RESULT,
  DISCOVER,
}
export const enum PROJECT_TYPE {
  CREATE,
  TECH,
  SOCIAL,
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

export const enum ABILITY_TYPE {
  BUSINESS = 1,
  TECHNOLOGY,
  LAW,
  DESIGN,
  AD,
  LEARNING,
}
export const ABILITY_LIST = [
  { index: ABILITY_TYPE.BUSINESS, value: '运营/规划', isSelected: false },
  { index: ABILITY_TYPE.TECHNOLOGY, value: '软件/硬件', isSelected: false },
  { index: ABILITY_TYPE.LAW, value: '财务/法律', isSelected: false },
  { index: ABILITY_TYPE.DESIGN, value: '美工/设计', isSelected: false },
  { index: ABILITY_TYPE.AD, value: '宣传/推广', isSelected: false },
  { index: ABILITY_TYPE.LEARNING, value: '科研/学术', isSelected: false },
]

export const enum ADD {
  PROJECTS,
  CERTS,
}

export const PROJECT_MODE_LIST = [
  { index: PROJECT_MODE.IT, value: 'IT/软件', isSelected: false },
  { index: PROJECT_MODE.ELEC, value: '硬件/电子', isSelected: false },
  { index: PROJECT_MODE.NET, value: '互联网+', isSelected: false },
  { index: PROJECT_MODE.UNDERLINE, value: '线下运营', isSelected: false },
  { index: PROJECT_MODE.RESULT, value: '成果转化', isSelected: false },
  { index: PROJECT_MODE.DISCOVER, value: '调研/探究', isSelected: false },
]

export const PROJECT_TYPE_LIST = [
  { index: PROJECT_TYPE.CREATE, value: '创新创业', isSelected: false },
  { index: PROJECT_TYPE.TECH, value: '科技学术', isSelected: false },
  { index: PROJECT_TYPE.SOCIAL, value: '人文社科', isSelected: false },
]

export const enum MANNER_TYPE {
  OPERATION,
  APP,
  MONEY,
  ART,
  PUSH,
  SCIENCE,
}

export const MANNERp_TYPE_LIST = [
  { index: MANNER_TYPE.OPERATION, value: '运营/规划', isSelected: false },
  { index: MANNER_TYPE.APP, value: '软件/硬件', isSelected: false },
  { index: MANNER_TYPE.MONEY, value: '财务/法律', isSelected: false },
  { index: MANNER_TYPE.ART, value: '美术/设计', isSelected: false },
  { index: MANNER_TYPE.PUSH, value: '宣传/推广', isSelected: false },
  { index: MANNER_TYPE.SCIENCE, value: '科研/学术', isSelected: false },
]

export const enum LEARNING_DIRECTION {
  TECHNOLOGY,
  MANAGEMENT,
  LAW,
  CRAFT,
  TEACH,
  HISTORY,
  AGRICULTURE,
  MEDICINE,
  SPECIAL,
}

export const LEARNING_DIRECTION_LIST = [
  { index: LEARNING_DIRECTION.TECHNOLOGY, value: '理工类' },
  { index: LEARNING_DIRECTION.MANAGEMENT, value: '经管类' },
  { index: LEARNING_DIRECTION.LAW, value: '法学类' },
  { index: LEARNING_DIRECTION.CRAFT, value: '艺术/人文' },
  { index: LEARNING_DIRECTION.TEACH, value: '教育类' },
  { index: LEARNING_DIRECTION.HISTORY, value: '历史/哲学' },
  { index: LEARNING_DIRECTION.AGRICULTURE, value: '农业类' },
  { index: LEARNING_DIRECTION.MEDICINE, value: '医学类' },
  { index: LEARNING_DIRECTION.SPECIAL, value: '特殊类' },
]

export const enum SPONSOR_TYPE {
  GOVERNMENT,
  ORGANIZATION,
  SCHOOL,
}
export const SPONSOR_LIST = [
  { index: SPONSOR_TYPE.GOVERNMENT, value: '政府' },
  { index: SPONSOR_TYPE.ORGANIZATION, value: '组织机构' },
  { index: SPONSOR_TYPE.SCHOOL, value: '学校' },
]

export const enum RACE_TYPE_KEY {
  INNOVATE,
  TECHNOLOGY,
  SOCIAL,
}
export const RACE_TYPE_LIST = [
  { index: RACE_TYPE_KEY.INNOVATE, value: '创新创业' },
  { index: RACE_TYPE_KEY.TECHNOLOGY, value: '学术科技' },
  { index: RACE_TYPE_KEY.SOCIAL, value: '人文社会' },
]

export const enum RACE_LEVEL_KEY {
  SCHOOL,
  LOCAL,
  COUNTRY,
}
export const RACE_LEVEL_LIST = [
  { index: RACE_LEVEL_KEY.SCHOOL, value: '院/校级' },
  { index: RACE_LEVEL_KEY.LOCAL, value: '地方级' },
  { index: RACE_LEVEL_KEY.COUNTRY, value: '国家级' },
]

export const enum LECTURE_TYPE_KEY {
  INNOVATE,
  ART,
  TECHNOLOGY,
}
export const LECTURE_TYPE_LIST = [
  { index: LECTURE_TYPE_KEY.INNOVATE, value: '创新创业' },
  { index: LECTURE_TYPE_KEY.ART, value: '艺术人文' },
  { index: LECTURE_TYPE_KEY.TECHNOLOGY, value: '科技学术' },
]

export const enum ACTIVITY_TYPE_KEY {
  INNOVATE,
  COMMONWEAL,
  TECHNOLOGY,
  ATHLETICS,
  POLITICS,
  SYNTHESIZE,
}
export const ACTIVITY_TYPE_LIST = [
  { index: ACTIVITY_TYPE_KEY.INNOVATE, value: '创新创业类' },
  { index: ACTIVITY_TYPE_KEY.COMMONWEAL, value: '公益类' },
  { index: ACTIVITY_TYPE_KEY.TECHNOLOGY, value: '科技类' },
  { index: ACTIVITY_TYPE_KEY.ATHLETICS, value: '文体类' },
  { index: ACTIVITY_TYPE_KEY.POLITICS, value: '思政教育类' },
  { index: ACTIVITY_TYPE_KEY.SYNTHESIZE, value: '综合类' },
]
