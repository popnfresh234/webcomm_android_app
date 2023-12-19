import { IResponseFail } from "@/api/type";
// import { IDoAuthenticationOptions } from '@/utils/fido/authentication/type'
declare let cordova: any;

// Step 1 Access any function requires authentication
// 進入任何需要驗證的功能

// Step 2~6 requestAuth
// 取得驗證所需一次性的challenge data，以及此使用者名稱（username）在FIDO Server所儲存的註冊資料。
// TODO: 電文

// Step 7~16 doAuthentication
// 此段主要目的有二：

// 進行local authentication
// 通過local authentication之後，使用SDK註冊流程中所產生的 EC private key 對之前Step 3~5 取得的一次性資料做簽章，組成後續server authentication所需資料
// Step 7 Sample Code
/**
 * 進行local authentication
 * 通過local authentication之後，使用SDK註冊流程中所產生的 EC private key 對之前Step 3~5 取得的一次性資料做簽章，組成後續server authentication所需資料
 * 此次DEMO 使用在 登入 轉帳驗證 QR登入網銀
 * @param doAuthenticationOptions
 * @returns
 */
export function doAuthentication(doAuthenticationOptions: any): any {
  return new Promise((resolve, reject) => {
    console.log("doAuthnetication()");
    console.log(doAuthenticationOptions);
    cordova.plugins.AuthSDKPlugin.doAuthentication(
      (result: any) => {
        console.log("doAuthentication success " + JSON.stringify(result));
        resolve(result);
      },
      (error: IResponseFail) => {
        console.log("doAuthentication fail " + JSON.stringify(error));
        reject(error);
      },
      doAuthenticationOptions
    );
  });
}
// step 16 為step7的response

// step 12~13 如果有交易資料，顯示交易資料畫面給使用者進行確認。
// 交易確認畫面的實作方法與呈現設定參見 iOS | Android

// step 14 目前AuthSDK只支援圖形驗證與生物驗證（指紋、臉部）兩種辨識方式。

// 圖形驗證（Pattern Lock）：圖形驗證允許三次連續嘗試驗證，第三次錯誤後須等待30秒方可再嘗試驗證，第四次錯誤須等待60秒方可再嘗試驗證。若失敗達五次，裝置將刪除所有的key並註銷所有註冊回到預設狀態。
// 生物驗證（Biometry）：生物驗證依賴手機作業系統提供的安全機制。

// Step 17~21 doAuth
// 進行 server authentication，完成驗證。
// TODO: 電文

// Step 18~20 詳細規格可參見 FIDO Server API 完成驗證 FIDO UAF 功能
