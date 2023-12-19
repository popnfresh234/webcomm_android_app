# fido-uaf-lab

## 執行順序

### 包app
```
yarn install
yarn run cordova-prepare
```

如果回沒有 ios 或 android platform
```
cd /src-cordova
cordova platform add ios
cordova platform add android
```

### 開web
```
yarn install
yarn serve
```



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 使用版本
nvm -> 14.15.1

###

cordova build.json內provisioningProfile須依情況調整
provisioningProfile位置 ：~/Library/MobileDevice/Provisioning Profiles



#### tailwind

##### 簡介
https://medium.com/coding-hot-pot/%E5%A6%82%E4%BD%95%E7%94%A8vue-cli-%E6%90%AD%E9%85%8Dtailwind-css%E9%96%8B%E7%99%BC-42c0f0dc3d3a

##### 官方文件
https://tailwindui.com/documentation#vue-installing-dependencies
##### 官方文件 UI
https://tailwindui.com/#product-application-ui

### cordova設置
https://cordova.apache.org/docs/en/2.8.0/guide/project-settings/ios/index.html


### fido sdk issues
```
duplicate output file '/Users/wayne/Library/Developer/Xcode/DerivedData/FidoUafApp-eydmuwyqezkolhffvhsotjckfogc/Build/Products/Debug-iphoneos/AuthSDKFramework.framework/Modules' on task: ProcessXCFramework /Users/wayne/webcomm/project/fido-uaf-lab/src-cordova/platforms/ios/FidoUafApp/Plugins/cordova-plugin-authsdk/lib/AuthSDKFramework.xcframework /Users/wayne/Library/Developer/Xcode/DerivedData/FidoUafApp-eydmuwyqezkolhffvhsotjckfogc/Build/Products/Debug-iphoneos/AuthSDKFramework.framework ios
```

開啟xcode 專案下的General 下拉到 Frameworks ,Lib... 區塊
將`AuthSDKFramework.xcframework`的狀態切成`Do Not Embed`再切回`Embed & Sign`