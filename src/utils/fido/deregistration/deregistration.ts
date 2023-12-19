import { IResponseFail } from '@/api/type'
// import { IDoAuthenticationOptions } from '@/utils/fido/authentication/type'
declare let cordova: any

/**
 * Step 7 ~ 8 SDK Dereg
 * server註銷後呼叫SDK doDeregistration  完成local註銷
 * Dereg by server request
 * @returns
 */
export function doDeregistrationbyReq (serverReq:any):Promise<any> {
  console.log('doDeregistrationbyReq ', JSON.stringify(serverReq))
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.doDeregistrationbyReq(
      (result:any) => {
        console.log('doDeregistrationbyReq success ' + JSON.stringify(result))
        resolve(result)
      },
      (error:IResponseFail) => {
        console.log('doDeregistrationbyReq fail ' + JSON.stringify(error))
        reject(error)
      },
      JSON.stringify(serverReq)

    )
  })
}

/**
 * Step 7 ~ 8 SDK Dereg
 * 當server無法完成註銷時(e.g. 連線異常)也可以使用username完成local註銷
 * Dereg by username
 * @returns
 */
export function doDeregistrationbyUserName (username: string):Promise<any> {
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.doDeregistrationbyUserName(
      (result:any) => {
        console.log('doDeregistrationbyUserName success ' + JSON.stringify(result))
        resolve(result)
      },
      (error:IResponseFail) => {
        console.log('doDeregistrationbyUserName fail ' + JSON.stringify(error))
        reject(error)
      },
      username

    )
  })
}
