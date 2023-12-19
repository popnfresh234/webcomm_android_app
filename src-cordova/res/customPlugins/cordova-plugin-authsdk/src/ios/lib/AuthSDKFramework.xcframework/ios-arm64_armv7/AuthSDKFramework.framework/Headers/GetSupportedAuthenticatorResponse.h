//
//  GetSupportedAuthenticatorResponse.h
//  AuthSDKFramework
//
//  Created by FionYang on 2019/6/14.
//  Copyright © 2019 webcomm. All rights reserved.
//

#ifndef GetSupportedAuthenticatorResponse_h
#define GetSupportedAuthenticatorResponse_h


#endif /* GetSupportedAuthenticatorResponse_h */
#import "AuthenticatorInfoStatusCode.h"

@interface GetSupportedAuthenticatorResponse : NSObject

@property(nonatomic, strong) NSString* aaid;
@property(nonatomic, strong) NSString *keyID;
@property(nonatomic, strong) NSArray<NSString*> *userVerifications;
@property(nonatomic, assign) AuthenticatorInfoStatusCode status;

@end
