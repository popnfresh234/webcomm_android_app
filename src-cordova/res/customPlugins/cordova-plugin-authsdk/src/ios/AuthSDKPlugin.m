#import "AuthSDKPlugin.h"

@implementation AuthSDKPlugin
@synthesize callbackId;
static id ObjectOrNull(id object)
{
    return object ?: [NSNull null];
}

#pragma AuthUIControllerDelegate protocol
- (void) onRegistrationComplete:(NSString*)response
                          error:(NSError*)error{
    if(error.code == 0 ) {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:response];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    }else{
        NSString* message = [AuthSDKStatusCodeTranslator convertToString:error.code];
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:error.code], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    }
}

- (void) onAuthenticationComplete:(NSString*)response
                            error:(NSError*)error{
    if(error.code == 0) {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:response];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    }else{
        NSString* message = [AuthSDKStatusCodeTranslator convertToString:error.code];
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:error.code], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
    }
}


#pragma cordova plugin function
- (void) getSupportedAuthenticator:(CDVInvokedUrlCommand*)command
{
    
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSError *error = nil;
    NSString* req = [command.arguments objectAtIndex:0];
    CDVPluginResult* result;
    
    if([req isKindOfClass:[NSNull class]] || ![req isKindOfClass:[NSString class]]){
        NSString* message = @" req type must be string";
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             message, @"message", nil];
        
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }else{
        
        GetSupportedAuthenticatorResponse *supportedAuthenticator = [sdk getSupportedAuthenticator:req error:&error ];
        
        if(error){
            NSString* message = [AuthSDKStatusCodeTranslator convertToString:error.code];
            NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                                 [NSNumber numberWithInteger:error.code], @"code",
                                 message, @"message", nil];
            
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            
        }else {
            
            NSString* statusReason = [AuthenticatorInfoStatusCodeTranslator convertToString:supportedAuthenticator.status];
            NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                                 ObjectOrNull(supportedAuthenticator.aaid),@"aaid",
                                 ObjectOrNull(supportedAuthenticator.keyID), @"keyID",
                                 ObjectOrNull(supportedAuthenticator.userVerifications), @"userVerifications",
                                 [NSNumber numberWithInteger:supportedAuthenticator.status], @"code",
                                 ObjectOrNull(statusReason), @"message", nil];
            
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:dic];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}


- (void) doRegistration:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSString* req = [command.arguments objectAtIndex:0];
    NSString* userVerification = [command.arguments objectAtIndex:1];
    NSString* displayName = [command.arguments objectAtIndex:2];
    
    BOOL isParamValid = YES;
    NSString *errMsg = @"";
    if([req isKindOfClass:[NSNull class]] || ![req isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" req type must be string";
    }else if([userVerification isKindOfClass:[NSNull class]] || ![userVerification isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" userVerification type must be string";
    }else if([displayName isKindOfClass:[NSNull class]]){
        displayName = @"";
    }
    
    if(!isParamValid){
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             errMsg, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
        
    }else{
        DoRegReq *doRegReq = [[DoRegReq alloc] init];
        [doRegReq setReq:req];
        [doRegReq setDisplayName:displayName];
        [doRegReq setUserVerification:userVerification];
        [sdk doRegistration:doRegReq];
    }
}

- (void) doAuthentication:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSString* req = [command.arguments objectAtIndex:0];
    NSString* username = [command.arguments objectAtIndex:1];
    NSDictionary* extsData = [command.arguments objectAtIndex:2];
    NSString* displayName = [command.arguments objectAtIndex:3];
    
    BOOL isParamValid = YES;
    NSString *errMsg = @"";
    if([req isKindOfClass:[NSNull class]] || ![req isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" req type must be string";
    }else if([username isKindOfClass:[NSNull class]] || ![username isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" username type must be string";
    }else if([displayName isKindOfClass:[NSNull class]]){
        displayName = @"";
    }
    
    if(!isParamValid){
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             errMsg, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
        
    }else{
        DoAuthReq *doAuthReq = [[DoAuthReq alloc] init];
        [doAuthReq setReq:req];
        [doAuthReq setUsername:username];
        [doAuthReq setExtsData:extsData];
        [doAuthReq setDisplayName:displayName];
        [sdk doAuthentication:doAuthReq];
    }
}

- (void) doDeregistrationbyUserName:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSString* username = [command.arguments objectAtIndex:0];
    
    if([username isKindOfClass:[NSNull class]] || ![username isKindOfClass:[NSString class]]){
        NSString* message = @" username type must be string";
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }else{
        NSError *error = nil;
        [sdk doDeregistration:&error username:username];
        if(!error){
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else{
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}

- (void) doDeregistrationbyReq:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSString* req = [command.arguments objectAtIndex:0];
    
    if([req isKindOfClass:[NSNull class]] || ![req isKindOfClass:[NSString class]]){
        NSString* message = @" req type must be string";
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }else{
        NSError *error = nil;
        [sdk doDeregistration:&error req:req];
        
        if(!error){
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else{
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}

- (void) getTranslation:(CDVInvokedUrlCommand*)command
{
    NSString* bioMethod = [command.arguments objectAtIndex:0];
    
    if([bioMethod isKindOfClass:[NSNull class]] || ![bioMethod isKindOfClass:[NSString class]]){
        NSString* message = @" bioMethod type must be string";
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }else{
        AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
        
        NSString* retString = [sdk getTranslation:bioMethod];
        
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:retString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void) syncServerData:(CDVInvokedUrlCommand*)command
{
    NSDictionary* serverData = [command.arguments objectAtIndex:0];
    
    if([serverData isKindOfClass:[NSNull class]] || ![serverData isKindOfClass:[NSDictionary class]]){
        NSString* message = @" serverData type must be object";
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             message, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        
    }else{
        AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
        NSError *error = nil;
        
        SyncServerData* syncServerData = [[SyncServerData alloc] init];
        [syncServerData setAppID:[serverData valueForKey:@"appID"]];
        
        NSMutableArray *authenticators = [NSMutableArray array];
        NSArray *auths = [serverData valueForKey:@"authenticators"];
        
        for(int i=0;i<auths.count;i++){
            NSDictionary* data = [auths objectAtIndex:i];
            PushAuthenticatorVo* vo = [[PushAuthenticatorVo alloc] init];
            [vo setUsername: [data valueForKey:@"username"]];
            [vo setAaid: [data valueForKey:@"aaid"]];
            [vo setKeyID: [data valueForKey:@"keyID"]];
            [authenticators addObject:vo];
        }
        [syncServerData setAuthenticators:authenticators];
        
        [sdk syncServerData:syncServerData error:&error ];
        
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK ];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
    
    
}
- (void) getDeviceModelName:(CDVInvokedUrlCommand*)command
{
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    
    NSString* retString = [sdk getDeviceModelName];
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:retString];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}
- (void) discover:(CDVInvokedUrlCommand*)command
{
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    NSError *error = nil;
    NSString* retString = [sdk discover:&error];
    
    if(!error){
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:retString];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }else{
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}
- (void) checkPolicy:(CDVInvokedUrlCommand*)command
{
    NSString* req = [command.arguments objectAtIndex:0];
    NSString* userName = [command.arguments objectAtIndex:1];
    BOOL isReg = [command.arguments objectAtIndex:2];
    
    BOOL isParamValid = YES;
    NSString *errMsg = @"";
    if([req isKindOfClass:[NSNull class]] || ![req isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" req type must be string";
    }else if([userName isKindOfClass:[NSNull class]] || ![userName isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" userName type must be string";
    }
    
    if(!isParamValid){
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             errMsg, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
        
    }else{
        AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
        NSError *error = nil;
        
        [sdk checkPolicy:&error req:req userName:userName isReg:isReg];
        
        if(!error){
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else{
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}
- (void) syncRegData:(CDVInvokedUrlCommand*)command
{
    NSString* userName = [command.arguments objectAtIndex:0];
    NSDictionary* regData1 = [command.arguments objectAtIndex:1];
    NSString* data1 = [regData1 objectForKey:@"data1"];
    NSString* data2 = [regData1 objectForKey:@"data2"];
    
    BOOL isParamValid = YES;
    NSString *errMsg = @"";
    if([userName isKindOfClass:[NSNull class]] || ![userName isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" username type must be string";
    }else if([data1 isKindOfClass:[NSNull class]] || ![data1 isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" data1 type must be string";
    }else if([data2 isKindOfClass:[NSNull class]] || ![data2 isKindOfClass:[NSString class]]){
        isParamValid = NO;
        errMsg = @" data2 type must be string";
    }
    
    if(!isParamValid){
        NSDictionary *dic = [NSDictionary dictionaryWithObjectsAndKeys:
                             [NSNumber numberWithInteger:-1], @"code",
                             errMsg, @"message", nil];
        
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:dic];
        [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
        
    }else{
        AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
        NSError *error = nil;
        SyncRegDataRequest *syncRegDataRequest = [[SyncRegDataRequest alloc] init];
        RegData1 *regData1 = [[RegData1 alloc] init];
        [regData1 setData1:data1];
        [regData1 setData2:data2];
        [syncRegDataRequest setUsername:userName];
        [syncRegDataRequest setRegData1:regData1];
        BOOL rslt = [sdk syncRegData:syncRegDataRequest error:&error];
        
        if(!error){
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:rslt];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }else{
            CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        }
    }
}

- (void) getRunningSDKVersion:(CDVInvokedUrlCommand*)command
{
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    
    NSString* retString = [sdk getRunningSDKVersion];
    
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:retString];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void) setLanguage:(CDVInvokedUrlCommand*)command
{
    self.callbackId = command.callbackId;
    NSString* languageCode = [command.arguments objectAtIndex:0];
    NSString* scriptCode = [command.arguments objectAtIndex:1];
    NSString* regionCdoe = [command.arguments objectAtIndex:2];
    
    AuthSDK *sdk = [[AuthSDK alloc] initWithDelegate:self];
    [sdk setLanguage:languageCode scriptCode:scriptCode regionCode:regionCdoe];
        
    CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}
@end


