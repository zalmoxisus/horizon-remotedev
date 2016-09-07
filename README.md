Remote debugging for Horizon with [Redux DevTools extension](https://github.com/zalmoxisus/redux-devtools-extension) and [remotedev](https://github.com/zalmoxisus/remotedev).

![Demo](https://cloud.githubusercontent.com/assets/7957859/18026426/9a1ae9d2-6c4e-11e6-8d52-8d3a3f981fa6.gif)

## Installation

#### 1. Get the extension
##### 1.1 For Chrome
 - from [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
 - or build it with `npm i & npm run build:extension` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./build/extension`
 - or run it in dev mode with `npm i & npm start` and [load the extension's folder](https://developer.chrome.com/extensions/getstarted#unpacked) `./dev`.

##### 1.2 For Firefox
 - from [AMO](https://addons.mozilla.org/en-US/firefox/addon/remotedev/)
 - or build it with `npm i & npm run build:firefox` and [load the extension's folder](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) `./build/firefox`.

##### 1.3 For Electron
  - just specify `REDUX_DEVTOOLS` in [`electron-devtools-installer`](https://github.com/GPMDP/electron-devtools-installer).

##### 1.4 For other browsers, for React Native, hybrid, desktop and server side apps
  - Use [remotedev.io](http://remotedev.io/local/) or if you have the extension select `Remote DevTools` from the context menu. Just specify `remote` parameter, and optionally `hostname` and `port`. [See the API](https://github.com/zalmoxisus/mobx-remotedev#remotedevstore-config) for details. 

#### 2. Install the library

##### NPM

```
npm install --save horizon-remotedev
```

##### CDN

```
<script src="https://unpkg.com/horizon-remotedev/dist/horizon-remotedev.js"></script>
```

## Usage

```js
// import hzRemotedev from 'horizon-remotedev';
// or import hzRemotedev from 'horizon-remotedev/lib/dev'
// in case you want to use it in production or don't have process.env.NODE_ENV === 'development'

//Setup Horizon connection
const horizon = Horizon();

// ...

// Specify the horizon instance to monitor 
hzRemotedev(horizon("react_messages"))
```

See [chat example](https://github.com/zalmoxisus/horizon-remotedev/blob/master/examples/chat-app/dist/app.jsx).

## API
#### `remotedev(store, [config])`
  - arguments
    - **store** *object* - horizon instance.  Example: `horizon("react_messages")`.
    - **config** *object* (optional as the parameters bellow)
      - **name** *string* - the instance name to be showed on the monitor page. Default value is table title.
      - **remote** *boolean* - set it to `true` to have remote monitoring via the local or `remotedev.io` server.
      - **hostname** *string* - use to specify host for [`remotedev-server`](https://github.com/zalmoxisus/remotedev-server). If `port` is specified, default value is `localhost`.
      - **port** *number* - use to specify host's port for [`remotedev-server`](https://github.com/zalmoxisus/remotedev-server).

Also see [the extension API](https://github.com/zalmoxisus/redux-devtools-extension#documentation) and [my presentation at React Europe](https://youtu.be/YU8jQ2HtqH4).

## Exclude / include DevTools in production builds

By default use
```js
import remotedev from 'horizon-remotedev';
```

It will work only when `process.env.NODE_ENV === 'development'`, otherwise the code will be stripped.

In case you want to use it in production or cannot set `process.env.NODE_ENV`, use
```js
import remotedev from 'horizon-remotedev/lib/dev';
```
So, the code will not be stripped from production bundle and you can use the extension even in production. It wouldn't affect the performance for end-users who don't have the extension installed. 

## LICENSE

[MIT](LICENSE)

## Created By

If you like this, follow [@mdiordiev](https://twitter.com/mdiordiev) on twitter.
