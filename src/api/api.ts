import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LOCAL_STORAGE_TOKEN } from "@/utils/fastLoginUtil";
// import qs from 'qs'
import { showMessage } from "./status";
// import { ElMessage } from 'element-plus'
import {
  ILoginRequestBody,
  IAccountRequestBody,
  IResponse,
  IRequestRegRequestBody,
  IRequestRegResp,
  IDoRegResp,
  IRequestAuthResp,
  IRequestPairAuthRequestBody,
  IRequestPairAuthResp,
  IAccountResp,
} from "./type";

// {
//     "header": {
//       "channelCode": "CCA",
//       "appVersion": "1.4",
//       "deviceUuid": "deviceId",
//       "deviceVersion": "android 7.0",
//       "deviceBrand": "samsung note7",
//       "deviceType": "android",
//       "userIp": "192.168.0.1"
//     },
//     "body": {
//       "username": "TestSingcounter",
//       "rpServerData": "testdata",
//       "appID": "https://sample.apps.webcomm.com.tw/facets"
//     }
//   }

const mockHeader = {
  appVersion: "v8",
  channelCode:
    "https://demo-frontend-alex-demo.apps.oc.webcomm.com.tw/api/uaf/facets",
  deviceBrand: "google",
  deviceType: "chrome",
  deviceUuid: "550e8400-e29b-41d4-a716-446655440000",
  deviceVersion: "92.0.4515.107",
  userIp: "127.0.0.1",
};
const https = require("https");

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: process.env.VUE_APP_BASE_URL,
//   headers: {
//     Accept: "*/*",
//     "Content-Type": "application/json",
//     // channelCode: 'CCA',
//     // appVersion: '1.4',
//     // deviceUuid: 'deviceId',
//     // deviceVersion: 'android 7.0',
//     // deviceBrand: 'samsung note7',
//     // deviceType: 'android',
//     // userIp: '192.168.0.1'
//   },
//   transformRequest: [
//     function (data) {
//       // console.log(data)
//       // 由于使用的 form-data传数据所以要格式化
//       // delete data.Authorization
//       // data = qs.stringify(data)
//       data = JSON.stringify(data);
//       return data;
//     },
//   ],
// });

const axiosInstanceDemo: AxiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    // channelCode: 'CCA',
    // appVersion: '1.4',
    // deviceUuid: 'deviceId',
    // deviceVersion: 'android 7.0',
    // deviceBrand: 'samsung note7',
    // deviceType: 'android',
    // userIp: '192.168.0.1'
  },
  transformRequest: [
    function (data) {
      // console.log(data)
      // 由于使用的 form-data传数据所以要格式化
      // delete data.Authorization
      // data = qs.stringify(data)
      data = JSON.stringify(data);
      return data;
    },
  ],
});

// // axios实例拦截响应
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // if (response.headers.authorization) {
//     //   localStorage.setItem('app_token', response.headers.authorization)
//     // } else {
//     //   if (response.data && response.data.token) {
//     //     localStorage.setItem('app_token', response.data.token)
//     //   }
//     // }
//     // console.log(response)
//     if (response.status === 200) {
//       return response;
//     } else {
//       showMessage(response.status);
//       return response;
//     }
//   },
//   // 请求失败
//   (error: any) => {
//     const { response } = error;
//     if (response) {
//       // 请求已发出，但是不在2xx的范围
//       showMessage(response.status);
//       return Promise.reject(response.data);
//     } else {
//       console.error("GGGGGG");
//     }
//   }
// );

axiosInstanceDemo.interceptors.response.use(
  (response: AxiosResponse) => {
    // if (response.headers.authorization) {
    //   localStorage.setItem('app_token', response.headers.authorization)
    // } else {
    //   if (response.data && response.data.token) {
    //     localStorage.setItem('app_token', response.data.token)
    //   }
    // }
    // console.log(response)
    if (response.status === 200) {
      return response;
    } else {
      showMessage(response.status);
      return response;
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      console.error("GGGGGG");
    }
  }
);

// // axios实例拦截请求
// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     // const { user } = store.state
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`
//     // }
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

axiosInstanceDemo.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const { user } = store.state
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
/**
 * @description: 登入
 * @params {ILoginRequestBody} params
 * @return {Promise}
 */
export const login = (params: ILoginRequestBody): Promise<IResponse> => {
  console.log("excute login");
  console.log(JSON.stringify(params));
  return axiosInstanceDemo.post("/auth/login", params).then((res) => {
    console.log("/auth/login -->" + JSON.stringify(res));
    return res.data;
  });
};

// export const login = (params: ILoginRequestBody): Promise<IResponse> => {
//   console.log("excute login");
//   console.log(JSON.stringify(params));
//   return axiosInstanceDemo.post("/mobile/auth", params).then((res) => {
//     console.log("/auth/login -->" + JSON.stringify(res));
//     return res.data;
//   });
// };

/**
 * @description: 取得帳號資訊，包含顯示名稱、帳號、餘額
 * @params {ILoginRequestBody} params
 * @return {Promise}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getBalance = (
  params: IAccountRequestBody
): Promise<IAccountResp> => {
  console.log("excute getBalance");

  return axiosInstanceDemo
    .post("/mobile/account", params)
    .then((res) => res.data);
};

export const getNews = (): Promise<any> => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
    },
  };
  return axiosInstanceDemo.get("/news/all", config).then((res) => res.data);
};

// fido 註冊流程
// step 2 5
export const requestReg = (
  params: IRequestRegRequestBody
): Promise<IRequestRegResp> => {
  console.log("excute requestReg");
  const req = {
    header: mockHeader,
    body: params,
  };

  return axiosInstanceDemo
    .post("/uaf/requestReg", req)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        console.log(error.request.status);
        console.log(error.request.statusText);
        console.log(error.request.responseXML);
        console.log(error.request.response);

        console.log(error.request.responseText);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

// step 21 25
export const doReg = (params: string): Promise<IDoRegResp> => {
  console.log("excute doReg");
  const regResponses = JSON.parse(params);
  const req = {
    header: mockHeader,
    body: {
      regResponses,
    },
  };
  return axiosInstanceDemo.post("/uaf/doReg", req).then((res) => {
    console.log("API: doReg()");
    console.log("doReg() Request", req);
    console.log("doReg() Response", res);

    return res.data; // 實作
  });
};

// fido 驗證流程
// step 2 6
/**
 * 登入 或 轉帳驗證 的發起電文
 * @param params
 * @returns
 */
export const requestAuth = (
  params: IRequestRegRequestBody
): Promise<IRequestAuthResp> => {
  console.log("excute requestAuth");
  const req = {
    header: mockHeader,
    body: params,
  };
  return axiosInstanceDemo.post("/uaf/requestAuth", req).then((res) => {
    return res.data; // 實作
  });
};

/**
 * 在auth SDK 的doAuthentication 後發動 向FIDO Server 做確認
 * @param params
 * @returns
 */
export const doAuth = (params: string): Promise<IRequestAuthResp> => {
  console.log("excute doAuth");
  const authResponses = JSON.parse(params);
  const req = {
    header: mockHeader,
    body: { authResponses },
  };
  console.log("doAuthReq:");
  return axiosInstanceDemo.post("/uaf/doAuth", req).then((res) => {
    console.log("/uaf/doAuth = ", JSON.stringify(res.data));
    return res.data; // 實作
  });
};

// qrcode doAuth
/**
 * QR登入網銀 的發起電文
 * @param params
 * @returns
 */
export const requestPairAuth = (
  params: IRequestPairAuthRequestBody
): Promise<IRequestPairAuthResp> => {
  console.log("excute requestPairAuth");
  const req = {
    header: mockHeader,
    body: params,
  };
  return axiosInstanceDemo
    .post("/uaf/requestPairAuth", req)
    .then((res) => res.data); // 實作
};

export const doDereg = (params: any): Promise<any> => {
  console.log("excute doDereg");
  const req = {
    header: mockHeader,
    body: params,
  };
  console.log("doDereg() REQ");
  console.log(req);
  return axiosInstanceDemo.post("/uaf/doDereg", req).then((res) => {
    console.log("/uaf/doDereg = ", JSON.stringify(res.data));
    return res.data; // 實作
  });
};
