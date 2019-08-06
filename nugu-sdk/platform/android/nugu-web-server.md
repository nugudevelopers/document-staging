---
depth_order: 4
---

# NUGU 서비스 관리 web server 연동

## WebView 설정하기

### Cookie 설정

NUGU 서비스 관리 웹에서 사용할 cookie 를 설정합니다.

* authorization: OAuth bearer 토큰
* pocId: [https://developers.nugu.co.kr/\#/sdk/pocList](https://developers.nugu.co.kr/#/sdk/pocList) 에서 확인 가능
* redirectUri: NUGU 서비스 관리 웹 내에서 Play 에 로그인 하고 나면 호출되는 url (ex> nugu.user.sample://oauth_refresh)
* appVersion: Application 버전 정보
* theme: LIGHT 또는 DARK

{% code title="SettingsServiceActivity.kt" %}
```kotlin
private val webView: NuguWebView by lazy { findViewById<NuguWebView>(R.id.webView) }

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    with(webView) {
        authorization = NuguOAuth.getClient().getAuthorization()
        pocId = nuguPocId
        redirectUri = OAUTH_REDIRECT_URI
        appVersion = BuildConfig.VERSION_NAME
        theme = NuguWebView.THEME.LIGHT
        loadUrl(Const.SERVICE_SETTING_URL)
    }
}
```
{% endcode %}

### WindowListener 연동

* `onCloseWindow` : `Activity` 종료 요청. `reason` 이 `WITHDRAWN_USER` 인 경우 회원탈퇴 요청으로 인한 종료이기 때문에, 인증정보 등을 파기해야 합니다.

{% code title="SettingsServiceActivity.kt" %}
```swift
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

     webView.windowListener = object: {
        override fun onCloseWindow(reason: String?) {
            if reason == "WITHDRAWN_USER" {
                // 인증 정보 파기
            }
            finish()
        }
     }       
}
```
{% endcode %}

## NUGU 서비스 관리 웹 호출

* `Const.SERVICE_SETTING_URL`: NUGU 서비스 관리 웹 사이트
* `Const.AGREEMENT_URL`: NUGU 이용약관 웹 사이트

{% code title="SettingsServiceActivity.kt" %}
```swift
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    webView.loadUrl(Const.SERVICE_SETTING_URL)
}
```
{% endcode %}

## Play 로그인 결과 전달

NUGU 서비스 관리 웹 내에서 Play 에 로그인 하고 나면 `redirectUri` 가 호출되며, `WebView` 를 갱신하면 로그인 결과가 웹 페이지에 반영됩니다.

* `redirectUri` 를 받기 위한 `Intent-Filter` 를 등록합니다. (ex> nugu.user.sample://oauth_refresh)

{% code title="AndroidManifest.xml" %}
```xml
<activity
    android:name="com.skt.nugu.sampleapp.activity.SettingsServiceActivity"
    android:launchMode="singleTop" >
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:host="oauth_refresh"
            android:scheme="nugu.user.sample" />
    </intent-filter>
</activity>
```
{% endcode %}

* `Activity` 에서 `Intent`  받으면 `WebView` 를 갱신합니다.

{% code title="SettingsServiceActivity.kt" %}
```swift
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    webView.onNewIntent(intent)
}
```
{% endcode %}

