import { BaseRequestBody, BaseResponseBody } from './type'

export interface ITransferRequestBody extends BaseRequestBody{
    userEmail: string
    remoteEmail: string
    amount: number
}

export interface ITransferResp extends BaseResponseBody{
    transferResult:string
    exception?: string
}

export interface ITransactionsPageRequestBody extends BaseRequestBody{
    email:string
    page: string
    size: number
}

export interface ITransactionRecord {
    accountEmail:string
    type:string
    amount:number
    date:string
    remoteEmail:string|null
    active:boolean
    balance:number
}

export interface ITransactionsPageResp extends BaseResponseBody{
    content:ITransactionRecord[]
}
