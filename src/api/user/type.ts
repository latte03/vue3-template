/**
 * type example
 * @description: 用户信息
 */
export interface UserInfo {
  id: string
  createdTime: string
  createdBy: string
  updatedTime: string
  updatedBy: string
  echoMap: EchoMap
  username: string
  nickName: string
  email: null
  mobile: string
  idCard: null
  wxOpenId: null
  ddOpenId: null
  readonly: boolean
  sex: string
  nation: string
  education: string
  state: boolean
  avatarId: null
  workDescribe: string
  employeeId: null
  tenantId: null
  baseEmployee: null
  defApplication: null
  homePath: null
}

export interface EchoMap {}
