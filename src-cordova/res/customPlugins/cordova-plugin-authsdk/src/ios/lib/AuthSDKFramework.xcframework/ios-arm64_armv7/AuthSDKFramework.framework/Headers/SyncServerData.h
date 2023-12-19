//
//  SyncServerData.h
//  AuthSDKFramework
//
//  Created by FionYang on 2020/10/28.
//  Copyright © 2020 webcomm. All rights reserved.
//

#ifndef SyncServerData_h
#define SyncServerData_h


#endif /* SyncServerData_h */
#import "PushAuthenticatorVo.h"

@interface SyncServerData:NSObject

@property(nonatomic, strong) NSString* appID;
@property(nonatomic, strong) NSArray<PushAuthenticatorVo*> *authenticators;

@end
