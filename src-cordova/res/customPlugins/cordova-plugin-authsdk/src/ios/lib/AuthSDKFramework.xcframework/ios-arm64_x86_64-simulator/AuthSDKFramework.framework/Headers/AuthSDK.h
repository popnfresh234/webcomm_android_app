//
//  AuthSDK.h
//  AuthSDKFramework
//
//  Created by fiona on 31/08/2017.
//  Copyright © 2017 webcomm. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import <AuthSDKFramework/PublicHeader.h>

#import "GetSupportedAuthenticatorResponse.h"
#import "SyncServerData.h"
#import "DoAuthReq.h"
#import "DoRegReq.h"
#import "SyncRegDataRequest.h"

@protocol AuthUIControllerDelegate <NSObject>

- (void) onRegistrationComplete:(NSString*)response
                          error:(NSError*)error;

- (void) onAuthenticationComplete:(NSString*)response
                            error:(NSError*)error;

@end





@interface AuthSDK : NSObject

-(instancetype) initWithDelegate:(id<AuthUIControllerDelegate>)delegate;

-(GetSupportedAuthenticatorResponse*) getSupportedAuthenticator:(NSString*) req error:(NSError**)error ;

-(void)doRegistration:(DoRegReq*)doRegReq;

-(BOOL)syncRegData:(SyncRegDataRequest*)syncRegDataRequest error:(NSError**)error;

-(void)doAuthentication:(DoAuthReq*)doAuthReq;

-(BOOL)doDeregistration:(NSError**)error req:(NSString*)req;

-(BOOL)doDeregistration:(NSError**)error username:(NSString*) username;

-(NSString*)getTranslation:(NSString*) string;

-(void)syncServerData:(SyncServerData*)serverData error:(NSError**)error;

-(NSString*) discover:(NSError**)error;

-(void) checkPolicy:(NSError**)error req:(NSString*)req userName:(NSString*)username isReg:(BOOL)isReg;

-(NSString*)getDeviceModelName;

-(NSString*)getRunningSDKVersion;

-(void)setLanguage:(NSString*)languageCode scriptCode:(NSString*)scriptCode regionCode:(NSString*)regionCode;

@end

