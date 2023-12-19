
const LOCAL_STORAGE_NAME = 'fastLoginStatus'
const LOCAL_STORAGE_REMEMBER_ME = 'rememberMe'

export enum LoginStatus {
  login='login',
  logout='logout'
}

export enum UserVerifications {
  biometry='biometry',
  pattern='pattern'
}
export function setFastLoginStatus (status: string):void {
  localStorage.setItem(LOCAL_STORAGE_NAME, status)
}

export function getFastLoginStatus ():string |null{
  return localStorage.getItem(LOCAL_STORAGE_NAME)
}

export function removeFastLoginStatus ():void {
  localStorage.removeItem(LOCAL_STORAGE_NAME)
}

export function useFastLogin ():boolean {
  if (!getFastLoginStatus || getFastLoginStatus === null) {
    return false
  } else {
    return true
  }
}

export function setRememberMe (rememberMe: boolean):void {
  const rememberMeStr = rememberMe ? 'true' : 'false'
  localStorage.setItem(LOCAL_STORAGE_REMEMBER_ME, rememberMeStr)
}

export function getRememberMe ():boolean {
  const rememberMeStr = localStorage.getItem(LOCAL_STORAGE_REMEMBER_ME)
  if (!!rememberMeStr && rememberMeStr === 'true') {
    return true
  } else {
    return false
  }
}
