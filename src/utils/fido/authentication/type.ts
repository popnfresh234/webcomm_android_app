import { IExtension, IDisplayPNGCharacteristicsDescriptor } from '@/utils/fido/type'
import { IRegistrationRequest } from '@/utils/fido/registration/type'

export interface IDoAuthenticationOptions {
    req: Array < IRegistrationRequest >
    username: string
    extsData: IExtension
    displayName: string
}

// 交易資料
export interface ITransaction {
    // Contains the base64-url encoded transaction content according to the contentType to be shown to the user.
    content:string

    // Contains the MIME Content-Type supported by the authenticator according its metadata statement.
    contentType?:string

    // Transaction content PNG characteristics.
    tcDisplayPNGCharacteristics?:IDisplayPNGCharacteristicsDescriptor[]
}
