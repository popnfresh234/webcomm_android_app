import { IResponseFail } from "@/api/type";
import {
  IRegistrationRequest,
  IDoRegistrationOptions,
  ISyncRegDataOptions,
} from "@/utils/fido/registration/type";

// 第一次登入 並註冊
// 1. login app
// 2. requestReg(username) ,app->middleware
// 3. middleware
// 4. middleware
// 5. return requestRegResp ,middleware -> app
// 6. getSupportedAuthenticator ,app -> fido sdk
// 7. return supported authenticator list ,fido sdk -> app
// 8. getTranslation ,app -> fido sdk
// 9. return  authenticator translation ,fido sdk -> app
// 10. app display authenticators in its manner

// 登入後 第二次可快登
declare let cordova: any;

// 這邊處理 app <-> fido sdk

// Step 6~7 getSupportedAuthenticator
// 註冊前先檢查驗證器狀態，像是目前此裝置有支援哪些驗證方式，該username在本裝置是否已註冊。
// cordova.plugins.AuthSDKPlugin.getSupportedAuthenticator(success, fail, req)
export function getSupportedAuthenticator(
  registrationRequest: IRegistrationRequest
): Promise<any> {
  console.log("wyn test getSupportedAuthenticator start -------");
  console.log(JSON.stringify(registrationRequest));
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.getSupportedAuthenticator(
      (result: any) => {
        console.log(
          "getSupportedAuthenticator success " + JSON.stringify(result)
        );
        resolve(result);
      },
      (error: IResponseFail) => {
        console.log("getSupportedAuthenticator fail " + JSON.stringify(error));
        reject(error);
      },
      JSON.stringify([registrationRequest])
    );
  });
}
// {"keyID":null,"aaid":"006E#0002","userVerifications":["biometry","pattern"],"code":2,"message":"AUTHENTICATORINFO_STATUS_SUPPORTED_DEVICE"}

// Step 8~9 getTranslation
// 可由此取得驗證方式的中文名稱。
// cordova.plugins.AuthSDKPlugin.getTranslation(success, fail, bioMethod)
export function getTranslation(userVerifications = "pattern"): any {
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.getTranslation(
      (result: any) => {
        console.log("getTranslation success " + JSON.stringify(result));
        resolve(result);
      },
      (error: IResponseFail) => {
        console.log("getTranslation fail " + JSON.stringify(error));
        reject(error);
      },
      userVerifications
    );
  });
}

// const doRegistration_options = [
//   options.req,
//   options.userVerification,
//   options.displayName
// ]

// Step 11~20 doRegistration
// 此段主要目的有二：
// 1. 進行local authentication
// 2. 通過local authentication之後，SDK根據所支援的演算法產生key pair。
//    使用SDK預載的attestation key對之前Step 3~5 取得的一次性資料與SDK所產生的public key簽章，組成後續server authentication所需資料
// cordova.plugins.AuthSDKPlugin.doRegistration(success, fail, options)
export function doRegistration(options: IDoRegistrationOptions): any {
  console.log("REGISTRATION: doRegistration()");
  console.log(options);
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.doRegistration(
      (result: any) => {
        console.log("doRegistration success " + JSON.stringify(result));
        resolve(result);
      },
      (error: IResponseFail) => {
        console.log("doRegistration fail " + JSON.stringify(error));
        reject(error);
      },
      options
    );
  });
}
// step 21的req 為 doRegistration的result

// Step 26 ~ 27 Sample Code
// 當server成功回傳resp且為成功的resp才需呼叫該api
// cordova.plugins.AuthSDKPlugin.syncRegData(success, fail, options)
export function syncRegData(options: ISyncRegDataOptions): any {
  return new Promise((resolve, reject) => {
    cordova.plugins.AuthSDKPlugin.syncRegData(
      (result: any) => {
        console.log("syncRegData success " + JSON.stringify(result));
        resolve(result);
      },
      (error: IResponseFail) => {
        console.log("syncRegData fail " + JSON.stringify(error));
        reject(error);
      },
      options
      // {
      //   username: 'webcomm',
      //   regData1:
      //       {
      //         data1: 'mockdata1',
      //         data2: 'mockdata2'
      //       }
      // }
    );
  });
}
