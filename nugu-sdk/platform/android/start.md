---
depth_order: 1
---

# 시작하기

## Step 1:최소 요구사항

* Android 5.0(API level 21) 이상에서 지원합니다.

{% alerts style="info" %}
Android 4.4(API level 19)에서도 동작하지만, TLS v1.2로 설정이 필요합니다.
{% endalerts %}

## Step 2: NUGU  SDK 설치하기

### 레포지토리 추가하기

프로젝트의 build.gradle에 레포지토리를 추가합니다.

{% code %}
```groovy
repositories {
    maven {
        url "https://nexus.nugu.co.kr/repository/maven-public/"
    }
}
```
{% endcode %}

### 의존성 추가하기

어플리케이션 모듈의 build.gradle에, 전체 라이브러리를 사용하기 위해 아래 의존성을 추가합니다.\
(전체 라이브러리에 대한 의존성은 [여기](https://github.com/nugu-developers/nugu-android)를 참조)

{% code %}
```groovy
dependencies {
    // Nugu Android Helper
    implementation "com.skt.nugu.sdk:nugu-android-helper:${latestVersion}"
    // Nugu Android UX Kit
    implementation "com.skt.nugu.sdk:nugu-ux-kit:${latestVersion}"
    // Nugu Android Login Kit
    implementation "com.skt.nugu.sdk:nugu-login-kit:${latestVersion}"
}
```
{% endcode %}

## Step 3: 프로젝트 설정하기

### PoC 정보 입력하기

{% alerts style="warning" %}
NUGU PoC를 생성하기 위해서는 NUGU Developers를 통해 제휴가 필요합니다.\
더 자세한 내용은 [NUGU SDK 소개](https://developers.nugu.co.kr/#/sdk/nuguSdkInfo)에서 확인이 가능합니다.

* 체험판은 [체험판 신청](https://developers.nugu.co.kr/#/sdk/sdkTrial)을 통해 발급 가능합니다.
{% endalerts %}

발급받은 PoC 정보를 확인하기 위해서 [NUGU SDK PoC목록](https://developers.nugu.co.kr/#/sdk/pocList)으로 이동해서 Client ID, Client Secret, Redirect URI 정보를 확인하세요.

* 체험판은 [체험판 신청 내역](https://developers.nugu.co.kr/#/sdk/sdkTrial)에서 확인 가능합니다.

{% alerts style="success" %}
NUGU SDK를 사용하는 앱 간에 URL Scheme 충돌을 방지하기 위해,\
Redirect URI는 `nugu.user.{client-id}://auth`로 설정하는 것을 권고합니다.

* 체험판은 Redirect URI가 필요하지 않습니다.
{% endalerts %}

#### 리소스에 정보 추가하기

strings.xml 파일에 nugu_redirect_scheme, nugu_redirect_host를 추가합니다. 예를들어 redirectUri가 **"example://sample"** 라면 아래와 같이 추가합니다.

{% code %}
```xml
<string name="nugu_redirect_scheme">example</string>
<string name="nugu_redirect_host">sample</string>
```
{% endcode %}

### 음성 인식 모델 파일 설정하기

#### 다운로드 받기 <a id="1"></a>

[NUGU SDK PoC목록](https://developers.nugu.co.kr/#/sdk/pocList)에서 음성인식 모델 파일을 다운로드 받습니다.

* 체험판은 [체험판 신청 내역](https://developers.nugu.co.kr/#/sdk/sdkTrial)에서 음성인식 모델파일을 다운로드 받습니다.

음성인식 파일 리소스에 대해서 압축되지 않도록 build.gradle 설정이 필요합니다.

{% code %}
```groovy
android {
   ...
   aaptOptions {
       noCompress "raw"
   }
}
```
{% endcode %}

### Configuration 파일 설정하기

#### 다운로드 받기

[NUGU SDK PoC목록](https://developers.nugu.co.kr/#/sdk/pocList)에서 nugu-config.json 파일을 다운로드 받습니다.

* 체험판은 [체험판 신청 내역](https://developers.nugu.co.kr/#/sdk/sdkTrial)에서  nugu-config.json 파일을 다운로드 받습니다.

#### 설정하기

다운로드 받은 파일을 Asset 폴더에 파일을 복사하고, ConfigurationStore을 초기화합니다.

{% code %}
```kotlin
ConfigurationStore.configure(context = context,
                             filename = "nugu-config.json")
```
{% endcode %}

### 앱 권한 설정하기

AndroidManifest.xml에 아래 필수 권한을 추가합니다.

{% code %}
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.INTERNET"/>
```
{% endcode %}

{% alerts style="info" %}
Manifest에 추가한 android.permission.RECORD_AUDIO 권한은 런타임에 추가로 요청하여 획득해야 합니다.
{% endalerts %}

## Step 4: NUGU 로그인 추가

NUGU 로그인은 **NUGU 회원 연동 방식**과 **NUGU 회원 미사용 방식** 두 가지로 제공됩니다.

* 체험판은 NUGU 회원 미사용 방식만 가능합니다.

{% alerts style="info" %}
NUGU 서비스를 이용하기 위해서는 OAuth 2.0 인증이 필요합니다.\
OAuth 2.0 API 는 [Authentication](../../authentication) 에서 확인이 가능합니다.
{% endalerts %}

### **NUGU 회원 연동 방식**으로 로그인

{% alerts style="info" %}
NUGU 회원 연동 방식을 사용하기 위해서는 T아이디 연동이 필요합니다.
{% endalerts %}

#### 로그인 정보 설정

기기별 고유식별자(`deviceUniqueId`)를 변경 가능합니다. (이미 NuguOAuth.create 에서 설정 되어있다면 생략)

{% code %}
```kotlin
val newOptions = NuguOAuthOptions.Builder()
            .deviceUniqueId("{your-device-uniqueId}")
            .build()
NuguOAuth.getClient().setOptions(newOptions)
```
{% endcode %}

#### Tid 로그인

`loginWithTid()`를 호출 후에 `NuguOAuthInterface.OnLoginListener`를 통해 인증 결과를 받습니다.

{% code %}
```kotlin
authClient.loginWithTid( activity = this, listener = object : NuguOAuthInterface.OnLoginListener {
            override fun onSuccess(credentials: Credentials) {
                // Save Credentials
            }

            override fun onError(error: NuguOAuthError) {
                // Called when the request failed.
            }
        })
```
{% endcode %}

#### 로그인 정보 갱신

발급 받은 refresh-token이 이미 있다면, 이 후에는 인 앱 브라우저 없이 로그인 정보를 갱신할 수 있습니다.

{% code %}
```kotlin
authClient.loginSilentlyWithTid("{refresh-token}", object : NuguOAuthInterface.OnLoginListener {
            override fun onSuccess(credentials: Credentials) {
                // Save Credentials 
            }

            override fun onError(error: NuguOAuthError) {
                // Called when the request failed.
            }
        })
```
{% endcode %}

### **NUGU 회원 미사용 방식**으로 로그인

#### 로그인 정보 설정

기기별 고유식별자(`deviceUniqueId`)를 변경 가능합니다. (이미 NuguOAuth.create 에서 설정 되어있다면 생략)

{% code %}
```kotlin
val newOptions = NuguOAuthOptions.Builder()
            .deviceUniqueId("{your-device-uniqueId}")
            .build()
NuguOAuth.getClient().setOptions(newOptions)
```
{% endcode %}

#### 로그인

`loginAnonymously()`를 호출 후에 `NuguOAuthInterface.OnLoginListener`를 통해 인증 결과를 받습니다.

{% code %}
```kotlin
authClient.loginAnonymously(object : NuguOAuthInterface.OnLoginListener {
            override fun onSuccess(credentials: Credentials) {
                // Save credentials
            }

            override fun onError(error: NuguOAuthError) {
                // Called when the request failed.
            }
        })
```
{% endcode %}

## Step5. NUGU 음성인식 사용하기

로그인 후, 우리는 NUGU의 모든 기능을 사용할 수 있습니다. 여기서는 NUGU의 모든 기능을 손쉽게 이용할 수 있도록 SDK에서 제공하는 `NuguAndroidClient` 클래스를 이용하여 음성인식을 시작하는 간단한 방법을 소개합니다.

1. 인증 정보 처리를 위임할 `AuthDelegate`를 정의합니다.

{% code %}
   ```kotlin
   // Parameter로 OAuth 옵션을 설정해야 합니다.
   // 설정된 옵션은 이후 NuguOAuth.setOptions을 사용하여 변경 가능합니다.
   val authDelegate = NuguOAuth.create(
                   options = NuguOAuthOptions.Builder()
                       .deviceUniqueId(deviceUniqueId(context))
                       .build()
               )
   ```
{% endcode %}

2. 음성인식에 사용할 기본 `AudioProvider`를 생성합니다.

{% code %}
   ```kotlin
   // AudioSourceManager : AudioProvider에 대한 기본 구현 클래스
   // AudioRecordSourceFactory : Android의 AudioRecord를 소스로 사용하는 SDK에서 제공
   val audioProvider = AudioSourceManager(AudioRecordSourceFactory())
   ```
{% endcode %}

3. 음성인식에 사용할 `EndPointDetector`를 생성합니다. [위에서 받은 모델 파일](https://app.gitbook.com/@nugu-developers-docs/s/dev/~/drafts/-Lr8g3yFEBnv_ExIqmYR/primary/nugu-sdk/platform/android/start#1)의 경로를 인자로 넣어줍니다.

{% code %}
   ```kotlin
   val endPointDetector = EndPointDetector(EPD_MODEL_FILE_PATH)
   ```
{% endcode %}

4. 마지막으로 `NuguAndroidClient`를 생성하고, 음성인식을 시작합니다. 음성인식에 대한 결과는 각각의 리스너를 통해 받을 수 있습니다.

{% code %}
   ```kotlin
   val client = NuguAndroidClient.Builder(
      context,    // Android Context
      authDelegate,
      audioProvider
   ).endPointDetector(endPointDetector).build()

   client.asrAgent?.addOnResultListener(...)
   client.asrAgent?.addOnStateChangeListener(...)
   // 음성인식 시작
   client.asrAgent?.startRecognition(initiator = ASRAgentInterface.Initiator.TAP)

   ```
{% endcode %}

## 더 알아보기

### Download the SDK source code

아래 Github 주소를 통해 NUGU SDK for Android 소스 코드를 다운로드 받을 수 있습니다.

{% link url="https://github.com/nugu-developers/nugu-android" caption="" %}

