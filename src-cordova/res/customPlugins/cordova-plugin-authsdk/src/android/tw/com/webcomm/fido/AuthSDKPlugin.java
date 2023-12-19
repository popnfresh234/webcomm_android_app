package tw.com.webcomm.fido;

import com.google.gson.Gson;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import tw.com.webcomm.authsdk.AuthSDK;
import tw.com.webcomm.authsdk.constants.AuthSDKStatusCode;
import tw.com.webcomm.authsdk.to.AuthSDKCallback;
import tw.com.webcomm.authsdk.to.DiscoverResponse;
import tw.com.webcomm.authsdk.to.DoAuthReq;
import tw.com.webcomm.authsdk.to.DoRegReq;
import tw.com.webcomm.authsdk.to.GetFacetIdResponse;
import tw.com.webcomm.authsdk.to.GetSupportedAuthenticatorResponse;
import tw.com.webcomm.authsdk.to.PushAuthenticatorVo;
import tw.com.webcomm.authsdk.to.RegData1;
import tw.com.webcomm.authsdk.to.SyncRegDataRequest;
import tw.com.webcomm.authsdk.to.SyncServerData;

/**
 * This class echoes a string called from JavaScript.
 */
public class AuthSDKPlugin extends CordovaPlugin {
    private Gson gson = new Gson();
    private static final int CORDOVA_PLUGIN_ERROR_CODE = -1;
    private static final String ARG_ERROR_MESSAGE_FORMAT = "%s type must be string";

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        AuthSDK.initialize(cordova.getActivity().getApplicationContext());
    }

    @Override
    public void onDestroy() {
        AuthSDK.close();
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        final CallbackContext _callbackContext = callbackContext; // only used for onActivityResult

        if ("getSupportedAuthenticator".equals(action)) {
            return doGetSupportedAuthenticator(args, callbackContext);
        } else if ("doRegistration".equals(action)) {
            return doRegistration(args, callbackContext);
        } else if ("doAuthentication".equals(action)) {
            return doAuthentication(args, callbackContext);
        } else if ("doDeregistrationbyUserName".equals(action)) {
            return doDeregistrationbyUserName(args, callbackContext);
        } else if ("doDeregistrationbyReq".equals(action)) {
            return doDeregistrationbyReq(args, callbackContext);
        } else if ("getTranslation".equals(action)) {
            return getTranslation(args, callbackContext);
        } else if ("syncServerData".equals(action)) {
            return syncServerData(args, callbackContext);
        } else if ("getDeviceModelName".equals(action)) {
            return getDeviceModelName(args, callbackContext);
        } else if ("discover".equals(action)) {
            return discover(args, callbackContext);
        } else if ("checkPolicy".equals(action)) {
            return checkPolicy(args, callbackContext);
        } else if ("getFacetId".equals(action)) {
            return getFacetId(args, callbackContext);
        } else if ("setConfigMap".equals(action)) {
            return setConfigMap(args, callbackContext);
        } else if ("getRunningSDKVersion".equals(action)) {
            return getRunningSDKVersion(args, callbackContext);
        } else if ("syncRegData".equals(action)) {
            return  syncRegData(args, callbackContext);
        } else if ("setLanguage".equals(action)) {
            return  setLanguage(args, callbackContext);
        }

        callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject("action not available")));
        return false;
    }

    private boolean doRegistration(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "req"))));
                return false;
            }

            if (!(args.get(1) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "userVerification"))));
                return false;
            }

            DoRegReq req = new DoRegReq();
            req.setReq(args.getString(0));
            req.setUserVerification(args.getString(1));
            req.setDisplayName(args.getString(2));
            AuthSDK.doRegistration(req, new AuthSDKCallback<String>() {
                @Override
                public void onSuccess(String s) {
                    PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, s);
                    callbackContext.sendPluginResult(resultWithKeepCb);
                }

                @Override
                public void onError(AuthSDKStatusCode authSDKStatusCode) {
                    PluginResult resultWithKeepCb;
                    try {
                        resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(authSDKStatusCode));
                    } catch (JSONException e) {
                        resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR);
                    }
                    callbackContext.sendPluginResult(resultWithKeepCb);
                }
            });

            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean doAuthentication(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "req"))));
                return false;
            }

            if (!(args.get(1) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "username"))));
                return false;
            }

            DoAuthReq req = new DoAuthReq();
            req.setReq(args.getString(0));
            req.setUserName(args.getString(1));
            req.setExtsData(toMap(args.getJSONObject(2)));
            req.setDisplayName(args.getString(3));
            AuthSDK.doAuthentication(req, new AuthSDKCallback<String>() {
                @Override
                public void onSuccess(String s) {
                    PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, s);
                    callbackContext.sendPluginResult(resultWithKeepCb);
                }

                @Override
                public void onError(AuthSDKStatusCode authSDKStatusCode) {
                    PluginResult resultWithKeepCb;
                    try {
                        resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(authSDKStatusCode));
                    } catch (JSONException e) {
                        resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR);
                    }
                    callbackContext.sendPluginResult(resultWithKeepCb);
                }
            });

            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean doDeregistrationbyReq(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "req"))));
                return false;
            }

            String req = args.getString(0);
            AuthSDKStatusCode statusCode = AuthSDK.doDeregistration(req);

            if (statusCode.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(statusCode));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean doDeregistrationbyUserName(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "username"))));
                return false;
            }

            String username = args.getString(0);
            AuthSDKStatusCode statusCode = AuthSDK.doDeregistrationByUserName(username);

            if (statusCode.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(statusCode));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean setConfigMap(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            JSONObject config = args.getJSONObject(0);
            HashMap<String, Object> configMap = new HashMap<>();
            Iterator<String> keyIterator = config.keys();
            while (keyIterator.hasNext()) {
                String key = keyIterator.next();
                Object value = config.get(key);

                configMap.put(key, value);
            }

            AuthSDK.setConfigMap(configMap);
            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean doGetSupportedAuthenticator(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "req"))));
                return false;
            }

            String req = args.getString(0);
            GetSupportedAuthenticatorResponse response = AuthSDK.getSupportedAuthenticator(req);


            if (response.getStatusCode().equals(AuthSDKStatusCode.NO_ERROR)) {
                GetSupportedAuthenticatorResponseVo vo = new GetSupportedAuthenticatorResponseVo();
                vo.setAaid(response.getAaid());
                vo.setCode(response.getAuthenticatorStatusCode().getValue());
                vo.setKeyID(response.getKeyID());
                vo.setMessage(response.getAuthenticatorStatusCode().name());
                vo.setUserVerifications(response.getUserVerifications());
                JSONObject result = new JSONObject(gson.toJson(vo));
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(response.getStatusCode()));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }

        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean getTranslation(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (!(args.get(0) instanceof String)) {
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(String.format(ARG_ERROR_MESSAGE_FORMAT, "bioMethod"))));
                return false;
            }

            String bioMethod = args.getString(0);
            String result = AuthSDK.getTranslation(bioMethod);

            PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result);
            callbackContext.sendPluginResult(resultWithKeepCb);
            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean syncServerData(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            JSONObject serverData = args.getJSONObject(0);

            SyncServerData data = new SyncServerData();
            data.setAppID(serverData.getString("appID"));
            ArrayList<PushAuthenticatorVo> list = new ArrayList<>();

            JSONArray authenticators = serverData.getJSONArray("authenticators");
            for (int i = 0; i < authenticators.length(); i++) {
                PushAuthenticatorVo vo = new PushAuthenticatorVo();
                JSONObject authenticatorData = authenticators.getJSONObject(i);
                vo.setAaid(authenticatorData.getString("aaid"));
                vo.setKeyID(authenticatorData.getString("keyID"));
                vo.setUsername(authenticatorData.getString("username"));
                list.add(vo);
            }
            data.setAuthenticators(list);

            AuthSDKStatusCode statusCode = AuthSDK.syncServerData(data);

            if (statusCode.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(statusCode));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean getDeviceModelName(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            String result = AuthSDK.getDeviceModelName();

            PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result);
            callbackContext.sendPluginResult(resultWithKeepCb);
            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean discover(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            DiscoverResponse result = AuthSDK.discover();

            if (result.getStatusCode().equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result.getDiscoverData());
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(result.getStatusCode()));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean checkPolicy(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            String req = args.getString(0);
            String userName = args.getString(1);
            boolean isReg = args.getBoolean(2);

            AuthSDKStatusCode result = AuthSDK.checkPolicy(req, userName, isReg);

            if (result.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(result));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean getFacetId(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            GetFacetIdResponse result = AuthSDK.getFacetId();

            if (result.getStatusCode().equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result.getFacetId());
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(result.getStatusCode()));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }

        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean getRunningSDKVersion(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            String result = AuthSDK.getRunningSDKVersion();
            PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK, result);
            callbackContext.sendPluginResult(resultWithKeepCb);
            return true;
        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private HashMap<String, String> toMap(JSONObject object) throws JSONException {
        HashMap<String, String> map = new HashMap<>();

        Iterator<String> keysItr = object.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            String value = object.getString(key);
            map.put(key, value);
        }
        return map;
    }

    private JSONObject convert2JSONObject(AuthSDKStatusCode statusCode) throws JSONException {

        AuthSDKErrorCode error = new AuthSDKErrorCode();
        error.setCode(statusCode.getValue());
        error.setMessage(statusCode.getDescription());

        return new JSONObject(gson.toJson(error));
    }

    private JSONObject createCordovaErrorJsonObject(String message) throws JSONException {

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", CORDOVA_PLUGIN_ERROR_CODE);
        jsonObject.put("message", message);
        return jsonObject;
    }

    private boolean syncRegData(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            SyncRegDataRequest syncRegDataRequest = new SyncRegDataRequest();
            syncRegDataRequest.setUsername(args.getString(0));
            JSONObject jsonObject = args.getJSONObject(1);
            RegData1 regData1 = new RegData1();
            regData1.setData1(jsonObject.getString("data1"));
            regData1.setData2(jsonObject.getString("data2"));
            syncRegDataRequest.setRegData1(regData1);


            AuthSDKStatusCode result = AuthSDK.syncRegData(syncRegDataRequest);

            if (result.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(result));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }

        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

    private boolean setLanguage(JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            String language = args.getString(0);
            String script = args.getString(1);
            String region = args.getString(2);

            AuthSDKStatusCode result = AuthSDK.setLanguage(language, script, region);

            if (result.equals(AuthSDKStatusCode.NO_ERROR)) {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.OK);
                callbackContext.sendPluginResult(resultWithKeepCb);
                return true;
            } else {
                PluginResult resultWithKeepCb = new PluginResult(PluginResult.Status.ERROR, convert2JSONObject(result));
                callbackContext.sendPluginResult(resultWithKeepCb);
                return false;
            }

        } catch (Exception e) {
            callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.ERROR, createCordovaErrorJsonObject(e.getMessage())));
            return false;
        }
    }

}