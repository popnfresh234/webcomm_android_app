declare let navigator :any

export function appAlert (message:string, callback?:() => void, title = '', buttonName = '確定'):void {
  navigator.notification.alert(
    message, // message
    callback, // callback
    title, // title
    buttonName // buttonName
  )
}
