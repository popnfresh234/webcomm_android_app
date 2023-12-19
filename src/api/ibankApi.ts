import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ITransactionsPageRequestBody, ITransactionsPageResp, ITransferRequestBody, ITransferResp } from './ibankType'
import { showMessage } from './status'

// const mockHeader = {
//   appVersion: 'v8',
//   channelCode: 'channel-webcomm',
//   deviceBrand: 'google',
//   deviceType: 'chrome',
//   deviceUuid: '550e8400-e29b-41d4-a716-446655440000',
//   deviceVersion: '92.0.4515.107',
//   userIp: '127.0.0.1'
// }

const axiosInstance:AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_IBANK_URL,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json'
  },
  transformRequest: [
    function (data) {
      // console.log(data)
      // 由于使用的 form-data传数据所以要格式化
      // delete data.Authorization
      // data = qs.stringify(data)
      data = JSON.stringify(data)
      return data
    }
  ]
})

// axios实例拦截响应
axiosInstance.interceptors.response.use(
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
      return response
    } else {
      showMessage(response.status)
      return response
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status)
      return Promise.reject(response.data)
    } else {
      console.error('GGGGGG')
    }
  }
)

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // const { user } = store.state
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error:any) => {
    return Promise.reject(error)
  }
)

/**
 * @description: 轉帳
 * @params {ILoginRequestBody} params
 * @return {Promise}
 */
export const transfer = (params: ITransferRequestBody): Promise<ITransferResp> => {
  console.log('excute transfer')
  // const req = {
  //   header: mockHeader,
  //   body: params
  // }

  return axiosInstance.post('/mobile/transfer', params).then(res => {
    console.log('/mobile/transfer -->' + JSON.stringify(res))
    return res.data
  })
}

/**
 * @description: 取得使用者交易紀錄
 * @params {ILoginRequestBody} params
 * @return {Promise}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getTransactionsPage = (params: ITransactionsPageRequestBody): Promise<ITransactionsPageResp> => {
  console.log('excute getTransactionsPage')

  return axiosInstance.post('/mobile/transactionsPage', params).then(res => res.data)
}
