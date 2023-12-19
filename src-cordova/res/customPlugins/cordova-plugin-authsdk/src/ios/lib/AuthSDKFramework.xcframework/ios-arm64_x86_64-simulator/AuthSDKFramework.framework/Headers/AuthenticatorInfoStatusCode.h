//
//  AuthenticatorInfoStatusCode.h
//  AuthSDKFramework
//
//  Created by fiona on 21/09/2017.
//  Copyright © 2017 webcomm. All rights reserved.
//

typedef NS_ENUM(NSUInteger, AuthenticatorInfoStatusCode){
    AUTHENTICATORINFO_STATUS_DEVICE_NOT_SUPPORTED = 1,
    AUTHENTICATORINFO_STATUS_SUPPORTED_DEVICE = 2,
    AUTHENTICATORINFO_STATUS_PRECONDITION_FAILED = 3,
    AUTHENTICATORINFO_STATUS_USER_ENROLLED = 4,
    AUTHENTICATORINFO_STATUS_USER_LOCKOUT = 5,
    AUTHENTICATORINFO_STATUS_USER_NOT_ENROLLED = 6
};
@interface AuthenticatorInfoStatusCodeTranslator: NSObject

+(NSString*) convertToString:(AuthenticatorInfoStatusCode)statusCode;

@end

