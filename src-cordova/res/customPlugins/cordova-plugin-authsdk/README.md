# WebComm AuthSDK plugin

## Version
請將 src/android/lib/authsdk.aar 置換為最新版本  
請將 src/ios/lib/AuthSDKFramework.framework 置換為最新版本  

## Android 特殊處理
AndroidManifest.xml 中application的 main class需要繼承tw.com.webcomm.authsdk.AuthSDKApplication並呼叫super.onCreate()完成初始化  

## cordova plugin 使用範例
getSupportedAuthenticator
```
cordova.plugins.AuthSDKPlugin.getSupportedAuthenticator((result)=>console.log('success '+ result),(error)=>console.log(error),'[      {        "header": {          "upv": {            "major": 1,            "minor": 1          },          "op": "Reg",          "appID": "https://xxx.xxx.xxx.webcomm.com.tw/facets",          "serverData": "e5P1zViTMDno0X0du7KfOCMzkFU62lhDe1KEOP5gqnE"        },        "challenge": "VJCHtDmSADzswbsZQTqhxk1wdaUPIb6HzypxZxfl5cc",        "username": "webcomm",        "policy": {          "accepted": [            [              {                "authenticationAlgorithms": [                  1,                  2,                  3,                  4,                  5,                  6,                  8,                  9                ],                "assertionSchemes": [                  "UAFV1TLV"                ]              }            ]          ],          "disallowed": [            {              "authenticationAlgorithms": [                7              ],              "assertionSchemes": [                "UAFV1TLV"              ]            },            {              "aaid": [                "006E#0002"              ],              "keyIDs": [                "ZGNiMmMyOTkxMmRhZTI5OGJiZWM0YjQyOTRhMjE0OTQzMjU3Njg2MDgzOWMwN2EwYjQ3OGVkOTU3MmQ3YzYyYw"              ]            },            {              "aaid": [                "006E#0002"              ],              "keyIDs": [                "OTIyODE2ZjdhY2QwYmM0NzI4ODBiNjFjZWI2MWJjZGYzNjA2NGEwODgyMGY0YTA5YTcwNGY1MmZiYmVjNjcwOA"              ]            },            {              "aaid": [                "006E#0001"              ],              "keyIDs": [                "K0-ibKwb4pn7Ze6AVsOFnNcVWmh8F8hG_-H4IN29Ymg"              ]            },            {              "aaid": [                "006E#0001"              ],              "keyIDs": [                "dsBmNZWU-4lfYv3WYpqOWGZ7NGNs1qbtfHRdiPsrvi4"              ]            }          ]        }      }    ]')
```

doRegistration
```
cordova.plugins.AuthSDKPlugin.doRegistration((result)=>console.log('success '+ result),(error)=>console.log(error),{req:'[      {        "header": {          "upv": {            "major": 1,            "minor": 1          },          "op": "Reg",          "appID": "https://fidossodev.apps.ocp.webcomm.com.tw/facets",          "serverData": "82ilpB2cF2mXo8aoNhJnJo2LukMolO1UCE2MYhS3NEg"        },        "challenge": "t3StLFZn37iesLQDSfASh58y_xJxO6tYzu6l0jLRDzg",        "username": "webcomm",        "policy": {          "accepted": [            [              {                "authenticationAlgorithms": [                  1,                  2,                  3,                  4,                  5,                  6,                  8,                  9                ],                "assertionSchemes": [                  "UAFV1TLV"                ]              }            ]          ],          "disallowed": [            {              "authenticationAlgorithms": [                7              ],              "assertionSchemes": [                "UAFV1TLV"              ]            },            {              "aaid": [                "006E#0002"              ],              "keyIDs": [                "ZGNiMmMyOTkxMmRhZTI5OGJiZWM0YjQyOTRhMjE0OTQzMjU3Njg2MDgzOWMwN2EwYjQ3OGVkOTU3MmQ3YzYyYw"              ]            },            {              "aaid": [                "006E#0002"              ],              "keyIDs": [                "OTIyODE2ZjdhY2QwYmM0NzI4ODBiNjFjZWI2MWJjZGYzNjA2NGEwODgyMGY0YTA5YTcwNGY1MmZiYmVjNjcwOA"              ]            },            {              "aaid": [                "006E#0001"              ],              "keyIDs": [                "K0-ibKwb4pn7Ze6AVsOFnNcVWmh8F8hG_-H4IN29Ymg"              ]            }          ]        }      }    ]',userVerification:'biometry',displayName:'A123456789'})
```

doAuthentication
```
cordova.plugins.AuthSDKPlugin.doAuthentication((result)=>console.log('success '+ result),(error)=>console.log(error),{req:'[      {        "header": {          "upv": {            "major": 1,            "minor": 1          },          "op": "Auth",          "appID": "https://fidossodev.apps.ocp.webcomm.com.tw/facets",          "serverData": "iSTKtUyHGOKNCqqyvJDzW93VNQE_u0wu_tr9iUZkcPQ"        },        "challenge": "zcgZKtDV94K1GFgDB64EBt-G12lFBAIVG7nEzAl0fRo",        "policy": {          "accepted": [            [              {                "aaid": [                  "006E#0002"                ],                "keyIDs": [                  "ZGNiMmMyOTkxMmRhZTI5OGJiZWM0YjQyOTRhMjE0OTQzMjU3Njg2MDgzOWMwN2EwYjQ3OGVkOTU3MmQ3YzYyYw"                ]              }            ],            [              {                "aaid": [                  "006E#0002"                ],                "keyIDs": [                  "OTIyODE2ZjdhY2QwYmM0NzI4ODBiNjFjZWI2MWJjZGYzNjA2NGEwODgyMGY0YTA5YTcwNGY1MmZiYmVjNjcwOA"                ]              }            ],            [              {                "aaid": [                  "006E#0001"                ],                "keyIDs": [                  "K0-ibKwb4pn7Ze6AVsOFnNcVWmh8F8hG_-H4IN29Ymg"                ]              }            ]          ],          "disallowed": [            {              "authenticationAlgorithms": [                7              ],              "assertionSchemes": [                "UAFV1TLV"              ]            }          ]        }      }    ]',username:'webcomm',extsData:{} ,displayName:'A123456789'})
```

doDeregistrationbyUserName
```
cordova.plugins.AuthSDKPlugin.doDeregistrationbyUserName((result)=>console.log('success '+ result),(error)=>console.log(error),'webcomm')
```

syncRegData
```
cordova.plugins.AuthSDKPlugin.syncRegData((result)=>console.log('success '+ result),(error)=>console.log(error),{username:'webcomm',regData1:{data1:'XXXXXXX',data2:'XXXXXXX'}})
```