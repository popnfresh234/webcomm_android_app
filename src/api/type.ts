import {
  IRegistrationRequest,
  IAuthenticatorRegistrationAssertion,
} from "@/utils/fido/registration/type";
import { ITransaction } from "@/utils/fido/authentication/type";
import { IOperationHeader } from "@/utils/fido/type";

export abstract class BaseRequsetHeader {}
export abstract class BaseRequestBody {}
export abstract class BaseResponseHeader {}
export abstract class BaseResponseBody {}
export abstract class BaseRequest {}
export abstract class BaseResponse {}

export interface IResponseHeader extends BaseResponseHeader {
  code: number | string;
  txTime: string;
}

export interface IResponseFail extends BaseResponseHeader {
  code: number | string;
  message: string;
}
export interface IResponse extends BaseResponse {
  message: string;
  accessToken: string;
}

export interface IFidoRequestHeader extends BaseRequsetHeader {
  appVersion: string;
  channelCode: string;
  deviceBrand: string;
  deviceType: string;
  deviceUuid: string;
  deviceVersion: string;
  userIp: string;
}

/** 登入 */
export interface ILoginRequestBody extends BaseRequestBody {
  account: string;
  password: string;
}
/** 帳戶資訊 */
export interface IAccountRequestBody extends BaseRequestBody {
  username: string;
}
// 註冊
// step 2 requestReg電文request
export interface IRequestRegRequestBody extends BaseRequestBody {
  username: string;
  rpServerData?: string;
  appID?: string;
  transaction?: ITransaction;
}

// step 5 requestReg電文response
export interface IRegRequests {
  regRequests: Array<IRegistrationRequest>;
}
export interface IRequestRegResp extends BaseResponse {
  header: IResponseHeader;
  body: IRegRequests;
}
// step 5 requestReg電文response

// step 21 doReg電文的request
export interface IRegResponses {
  // Response data for each Authenticator being registered.
  assertions: IAuthenticatorRegistrationAssertion[];

  // The base64url-encoded serialized FinalChallengeParams using UTF8 encoding which contains all parameters required for the server to verify the Final Challenge.
  fcParams: string;

  // Operation Header, Header的op欄位必須要設定為Reg
  header: IOperationHeader[];
}

export interface IDoReg {
  // 此為step 2 的回傳
  regResponses: IRegResponses[];
}

// step 25 doReg電文的response
export interface IDoRegResp extends BaseResponse {
  header: IResponseHeader;
  body: IRegistrationRequest;
}

// 以下未串通----------------------------------------------------------------
export interface IDoRegRequestBody extends BaseRequestBody {
  // APP ID
  appID: string;

  // 要使用的extension id列表
  extensionIdList: Array<string>;

  // 推播或掃碼功能驗證碼
  paircode: string;

  // 交易資料
  transaction: ITransaction[];

  // 使用者名稱
  username: string;
}

// 驗證流程--------
// step 2
export interface IRequestAuthRequestBody {
  // "username": "A123456789",
  // "appID": "https://sample.apps.webcomm.com.tw/facets"
  username: string;
  appID: string;
}
// step 6

export interface IAuthRequests {
  authRequests: Array<IRegistrationRequest>;
}
export interface IRequestAuthResp extends BaseResponse {
  header: IResponseHeader;
  body: IAuthRequests;
}

// step 17
export interface IDoAuthRequestBody {
  authResponses: any;
}
// step 21

export interface IDoAuthResp extends BaseResponse {
  header: IResponseHeader;
  body: any;
}

export interface IRequestPairAuthRequestBody extends BaseRequestBody {
  paircode: string;
  username: string;
  extensionIdList: any;
}

export interface IRequestPairAuthResp extends BaseResponse {
  header: IResponseHeader;
  body: any;
}

export interface IAccountResp extends BaseResponseBody {
  balance: number;
  email: string;
  name: string;
}
