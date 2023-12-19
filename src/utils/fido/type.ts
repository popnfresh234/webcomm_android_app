// UAF版本號
export interface IVersion {
    // major integer (int32)
    // 主要版本號
    major: number
    // minor integer (int32)
    // 次要版本號
    minor: number
    }

export interface IExtension {
    // FIDO Server 與 FIDO Client自行約定好的額外資料內容
    data: string
    // 若有未知的資料內容是否忽略或拋出錯誤
    // eslint-disable-next-line camelcase
    fail_if_unknown: boolean
    // ID
    id: string
}

export interface IOperationHeader {
    // APP ID
    appID: string
    // List of UAF Message Extensions.
    exts: IExtension[]
    // 執行功能
    op: string
    // A session identifier created by the relying party.
    serverData: string
    // UAF版本號
    upv: IVersion[]
}
// 不合法的驗證器條件
export interface IMatchCriteria {
    aaid ? : Array < string | number >
    keyIDs ? : Array < string | number >
    authenticationAlgorithms ? : Array < string | number >
    assertionSchemes ? : Array < string | number >
}

// 驗證流程合法與不合法的驗證器條件描述
export interface IPolicyVo {
    // 合法的驗證器條件
    accepted: IMatchCriteria[]
    // 不合法的驗證器條件
    disallowed: IMatchCriteria[]
}

export interface IRGBPaletteEntry{
    // b	integer (int32)
    // Blue channel sample value
    b:number
    // g	integer (int32)
    // Green channel sample value
    g:number
    // r	integer (int32)
    // Red channel sample value
    r:number
}

// Supported transaction PNG type.
export interface IDisplayPNGCharacteristicsDescriptor {
    // bitDepth	integer (int32)
    // Bit depth - bits per sample or per palette index.
    bitDepth:number
    // colorType	integer (int32)
    // Color type defines the PNG image type.
    color:number
    // compression	integer (int32)
    // Compression method used to compress the image data.
    compression:number
    // filter	integer (int32)
    // Filter method is the preprocessing method applied to the image data before compression.
    filter:number
    // height	integer (int64)
    // Image height
    height:number
    // interlace	integer (int32)
    // Interlace method is the transmission order of the image data.
    interlace:number
    // plte	RGBPaletteEntry[]
    // 1 to 256 palette entries
    plte:IRGBPaletteEntry[]
    // width	integer (int64)
    // Image width
    width:number
}
