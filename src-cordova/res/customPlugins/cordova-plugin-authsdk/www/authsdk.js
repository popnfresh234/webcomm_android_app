(function () {
	var AuthSDK = function () { };

	// req 為server回傳的字串
	// success為成功 {aaid:'',keyID:'',userVerifications:[],code:,message:''}，fail {code:,message:''}
	AuthSDK.prototype.getSupportedAuthenticator = function (success, fail, req) {
		cordova.exec(success, fail, "AuthSDKPlugin", "getSupportedAuthenticator", [req]);
	};

	// success為成功 參數為需回傳fido server的資料，fail {code:,message:''}
	AuthSDK.prototype.doRegistration = function (success, fail, options) {
		cordova.exec(success, fail, "AuthSDKPlugin", "doRegistration", [options.req, options.userVerification, options.displayName]);
	};

	AuthSDK.prototype.doAuthentication = function (success, fail, options) {
		cordova.exec(success, fail, "AuthSDKPlugin", "doAuthentication", [options.req, options.username, options.extsData, options.displayName]);
	};
	// success 無參數, fail 失敗
	AuthSDK.prototype.doDeregistrationbyUserName = function (success, fail, username) {
		cordova.exec(success, fail, "AuthSDKPlugin", "doDeregistrationbyUserName", [username]);
	};
	// success 無參數, fail 失敗
	AuthSDK.prototype.doDeregistrationbyReq = function (success, fail, req) {
		cordova.exec(success, fail, "AuthSDKPlugin", "doDeregistrationbyReq", [req]);
	};

	AuthSDK.prototype.getTranslation = function (success, fail, bioMethod) {
		cordova.exec(success, fail, "AuthSDKPlugin", "getTranslation", [bioMethod]);
	};
	// serverData = {appID:'',authenticators:[{username:'',aaid:'',keyID:''}]}
	AuthSDK.prototype.syncServerData = function (success, fail, serverData) {
		cordova.exec(success, fail, "AuthSDKPlugin", "syncServerData", [serverData]);
	};
	AuthSDK.prototype.getDeviceModelName = function (success, fail) {
		cordova.exec(success, fail, "AuthSDKPlugin", "getDeviceModelName", []);
	};
	AuthSDK.prototype.discover = function (success, fail) {
		cordova.exec(success, fail, "AuthSDKPlugin", "discover", []);
	};
	AuthSDK.prototype.checkPolicy = function (success, fail, options) {
		cordova.exec(success, fail, "AuthSDKPlugin", "checkPolicy", [options.req, options.userName, options.isReg]);
	};

	AuthSDK.prototype.getFacetId = function (success, fail, options) {9Goxofu1m3VdycViF+otAT3JDnQ
		cordova.exec(success, fail, "AuthSDKPlugin", "getFacetId", []);
	};
	// only Android, options = {dev:true}
	AuthSDK.prototype.setConfigMap = function (success, fail, options) {
		cordova.exec(success, fail, "AuthSDKPlugin", "setConfigMap", [options]);
	};

	// options = {username:'',regData1:{data1:'',data2:''}}
	AuthSDK.prototype.syncRegData = function (success, fail, options) {
		cordova.exec(success, fail, "AuthSDKPlugin", "syncRegData", [options.username, options.regData1]);
	};
	
	AuthSDK.prototype.getRunningSDKVersion = function (success, fail) {
		cordova.exec(success, fail, "AuthSDKPlugin", "getRunningSDKVersion", []);
	};

	AuthSDK.prototype.setLanguage = function (success, fail, options) {
        cordova.exec(success, fail, "AuthSDKPlugin", "setLanguage", [options.languageCode, options.scriptCode, options.regionCode]);
    };

	var authsdk = new AuthSDK();
	module.exports = authsdk;

	if (!cordova.plugins) {
		cordova.plugins = new Array();
	}
	cordova.plugins.AuthSDKPlugin = authsdk;

})();