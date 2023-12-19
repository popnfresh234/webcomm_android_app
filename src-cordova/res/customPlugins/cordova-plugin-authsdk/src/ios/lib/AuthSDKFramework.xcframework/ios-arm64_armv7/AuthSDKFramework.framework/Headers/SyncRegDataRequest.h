//
//  SyncRegDataRequest.h
//  AuthSDKFramework
//
//  Created by FionYang on 2021/3/5.
//  Copyright © 2021 webcomm. All rights reserved.
//

#ifndef SyncRegDataRequest_h
#define SyncRegDataRequest_h


#endif /* SyncRegDataRequest_h */
#import "RegData1.h"

@interface SyncRegDataRequest : NSObject

@property(nonatomic, strong) NSString* username;
@property(nonatomic, strong) RegData1 *regData1;

@end
