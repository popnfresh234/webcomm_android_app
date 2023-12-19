#import <Cordova/CDVPlugin.h>
#import <AuthSDKFramework/AuthSDKFramework.h>
#import <AuthSDKFramework/AuthenticatorInfoStatusCode.h>

@interface AuthSDKPlugin : CDVPlugin <AuthUIControllerDelegate>
@property(nonatomic, strong) NSString *callbackId;
- (void)getSupportedAuthenticator:(CDVInvokedUrlCommand *)command;
- (void)doRegistration:(CDVInvokedUrlCommand *)command;
- (void)doAuthentication:(CDVInvokedUrlCommand *)command;
- (void)doDeregistrationbyUserName:(CDVInvokedUrlCommand *)command;
- (void)doDeregistrationbyReq:(CDVInvokedUrlCommand *)command;
- (void)getTranslation:(CDVInvokedUrlCommand *)command;
- (void)syncServerData:(CDVInvokedUrlCommand *)command;
- (void)getDeviceModelName:(CDVInvokedUrlCommand *)command;
- (void)discover:(CDVInvokedUrlCommand *)command;
- (void)checkPolicy:(CDVInvokedUrlCommand *)command;
- (void)syncRegData:(CDVInvokedUrlCommand *)command;
- (void)getRunningSDKVersion:(CDVInvokedUrlCommand *)command;
- (void)setLanguage:(CDVInvokedUrlCommand *)command;

@end
