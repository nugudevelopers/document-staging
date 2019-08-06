---
depth_order: 1
---

# 시작하기

## Step 1: 최소 요구사항 확인하기

* Xcode 11.0 or later
* Swift 5.1
* iOS 12.0+ (v1.3.0 or more) iOS 10.0+ (less than v1.3.0)
* macOS 10.15.0+ (v1.4.0 or more\) including mac catalyst
* tvOS 13.0+ (v1.4.0 or more)

{% alerts style="warning" %}
iOS Nugu SDK 는 1.2.8 이상에서 다양한 인터페이스와 안정성을 보장합니다.   
iOS12 이상에서는 최신 버전을, iOS11 미만에서는 1.2.8 사용을 권장합니다.
{% endalerts %}

## Step 2: NUGU SDK 설치하기

{% tabs %}
{% tabs::content title="Cocoapods" %}
`Podfile`에 다음과 같이 의존성을 추가합니다.

{% code %}
```ruby
target '{Your_Application}' do
  pod 'NuguClientKit'
end
```
{% endcode %}

터미널을 열어 Podfile이 있는 프로젝트 경로에서 아래 Script를 실행합니다.

{% code %}
```bash
$ pod install
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Carthage" %}
`Cartfile`에 다음과 같이 의존성을 추가합니다.

{% code %}
```swift
github "nugu-developers/nugu-ios"
```
{% endcode %}

터미널을 열어 Podfile이 있는 프로젝트 경로에서 아래 Script를 실행합니다.

{% code %}
```swift
carthage update 
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Step 3: 프로젝트 설정하기

### PoC 정보 입력하기

{% alerts style="warning" %}
NUGU PoC를 생성하기 위해서는 NUGU Developers를 통해 제휴가 필요합니다.  
더 자세한 내용은 [NUGU SDK 소개](https://developers.nugu.co.kr/#/sdk/nuguSdkInfo)에서 확인이 가능합니다.

* 체험판은 [체험판 신청](https://developers.nugu.co.kr/#/sdk/sdkTrial)을 통해 발급 가능합니다.
{% endalerts %}

발급받은 PoC 정보를 확인하기 위해서 [NUGU SDK PoC목록](https://developers.nugu.co.kr/#/sdk/pocList)으로 이동해서 Client ID, Client Secret, Redirect URI 정보를 확인하세요.

* 체험판은 [체험판 신청 내역](https://developers.nugu.co.kr/#/sdk/sdkTrial)에서 확인 가능합니다.

{% alerts style="success" %}
NUGU SDK를 사용하는 앱 간에 URL Scheme 충돌을 방지하기 위해,  
Redirect URI는 `nugu.user.{client-id}://auth`로 설정하는 것을 권고합니다.

* 체험판은 Redirect URI가 필요하지 않습니다.
{% endalerts %}

#### info.plist 파일에 URL Scheme 추가

`info.plist` 파일에 다음과 같이 URL Scheme을 추가합니다.

{% tabs %}
{% tabs::content title="info.plist" %}
{% code %}
```xml
<dict>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>nugu.user.{client-id}</string>
    </array>
    </dict>
  </array>
</dict>
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Configuration 파일 설정하기

#### 다운로드 받기

[NUGU SDK PoC목록](https://developers.nugu.co.kr/#/sdk/pocList)에서 nugu-config.plist 파일을 다운로드 받습니다.

* 체험판은 [체험판 신청 내역](https://developers.nugu.co.kr/#/sdk/sdkTrial)에서 nugu-config.plist 파일을 다운로드 받습니다.

#### 설정하기

다운로드 받은 파일을 Application 에 복사하고 target 으로 추가합니다.

* Example : `{application path}/Supporting Files/nugu-config.plist`

`ConfigurationStore`을 초기화 합니다.

{% tabs %}
{% tabs::content title="AppDelegate.swift" %}
{% code %}
```swift
import NuguClientKit

func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey:
Any]?) -> Bool {
    ConfigurationStore.shared.configure()
    return true
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 어플리케이션 권한 설정하기

NUGU 서비스는 음성인식을 위하여 마이크 권한 문구를 Info.plist 파일에 추가합니다.

{% tabs %}
{% tabs::content title="info.plist" %}
{% code %}
```xml
<key>NSMicrophoneUsageDescription</key>
<string>For speech recognition</string>
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Step 4: NUGU 로그인 추가

NUGU 로그인은 **NUGU 회원 연동 방식**과 **NUGU 회원 미사용 방식** 두 가지로 제공됩니다.

* 체험판은 NUGU 회원 미사용 방식만 가능합니다.

{% alerts style="info" %}
NUGU 서비스를 이용하기 위해서는 OAuth 2.0 인증이 필요합니다.  
OAuth 2.0 API 는 [Authentication](../../authentication) 에서 확인이 가능합니다.
{% endalerts %}

### **NUGU 회원 연동 방식**으로 로그인

{% alerts style="info" %}
NUGU 회원 연동 방식을 사용하기 위해서는 T아이디 연동이 필요합니다.
{% endalerts %}

#### 앱 델리게이트 연결

인 앱 브라우저를 통한 인증 결과를 `NuguLoginKit`에서 처리하기 위해 다음과 같이 `AppDelegate` 클래스에 추가해야 합니다.

{% tabs %}
{% tabs::content title="AppDelegate.swift" %}
{% code %}
```swift
import NuguLoginKit
import NuguClientKit

func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    if ConfigurationStore.shared.isAuthorizationRedirectUrl(url: url) {
        NuguOAuthClient.handle(url: url)
        return true
    }
    return false
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

#### 인 앱 브라우저를 통해 로그인

PoC 정보를 이용하여 다음과 같이 `OAuthManager`를 통해 값을 설정한 후에 인 앱 브라우저(`SFSafariViewController`)를 이용한 T아이 로그인을 시도합니다. 인증 절차가 모두 완료되면 결과를 Closure를 통해 받을 수 있습니다.

{% tabs %}
{% tabs::content title="ViewController.swift" %}
{% code %}
```swift
import NuguLoginKit
import NuguClientKit

lazy private(set) var oauthClient: NuguOAuthClient = {
    do {
        return try NuguOAuthClient(serviceName: Bundle.main.bundleIdentifier ?? "NuguSample")
    } catch {
        return NuguOAuthClient(deviceUniqueId: "{device-unique-id}")
    }
}()

func login() {
    oauthClient.loginWithTid(parentViewController: viewController) { (result) in
        switch result {
        case .success(let authInfo):
            // Save authInfo
        case .failure(let error):
            // Occured error
        }
    }
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

#### 로그인 정보 갱신

발급 받은 `refresh-token`이 이미 있다면, 이 후에는 인 앱 브라우저 없이 로그인 정보를 갱신할 수 있습니다.

{% tabs %}
{% tabs::content title="ViewController.swift" %}
{% code %}
```swift
func refresh() {
    oauthClient.loginSilentlyWithTid(refreshToken: refreshToken) { (result) in
        switch result {
        case .success(let authInfo):
            // Save authInfo
        case .failure(let error):
            // Occured error
        }
    }
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### **NUGU 회원 미사용 방식**으로 로그인

#### 로그인

PoC 정보를 이용하여 다음과 같이 `OAuthManager`를 통해 값을 설정한 후 로그인을 시도합니다. 인증 절차가 모두 완료되면 결과를 Closure를 통해 받을 수 있습니다.

{% tabs %}
{% tabs::content title="ViewController.swift" %}
{% code %}
```swift
import NuguLoginKit
import NuguClientKit

lazy private(set) var oauthClient: NuguOAuthClient = {
    do {
        return try NuguOAuthClient(serviceName: Bundle.main.bundleIdentifier ?? "NuguSample")
    } catch {
        return NuguOAuthClient(deviceUniqueId: "{device-unique-id}")
    }
}()

func login() {
    oauthClient.loginAnonymously { (result) in
        switch result {
        case .success(let authInfo):
            // Save authInfo
        case .failure(let error):
            // Occured error
        }
    }
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Step5. NUGU 음성인식 사용하기

#### 마이크 권한 획득

음성인식을 요청 하기 전에 마이크 권한을 요청해 획득합니다.

{% tabs %}
{% tabs::content title="ViewController.swift" %}
{% code %}
```swift
AVAudioSession.sharedInstance().requestRecordPermission { hasPermission in }
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

#### AVAudioSession 설정

NUGU 서비스를 이용하기 위해서는 `AVAudioSession`의 `Category`를 `.playAndRecord`로 설정이 필요합니다.

{% tabs %}
{% tabs::content title="ViewController.swift" %}
{% code %}
```swift
func setAudioSession() throws {
    try AVAudioSession.sharedInstance().setCategory(
        .playAndRecord,
        mode: .default,
        options: [.defaultToSpeaker, .allowBluetoothA2DP]
    )
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

#### NUGU 음성인식 요청

음성인식을 요청하기 위해서는 아래와 같은 코드를 작성해야 합니다.

\1. `NuguClientKit`을 불러옵니다.

{% code %}
```swift
import NuguClientKit
```
{% endcode %}

\2. `NuguClient` 인스턴스를 생성합니다.

{% code %}
```swift
let nuguBuilder = NuguClient.Builder()
let client = nuguBuilder.build()
```
{% endcode %}

\3. 로그인 결과로 받은 Access-token을 `NuguClientDelegate` 로 전달해야 합니다.

{% code %}
```swift
func nuguClientRequestAccessToken() -> String? {
   return "{access-token}"
}
```
{% endcode %}

\4. NUGU 서버와의 연결 이후 음성인식을 요청합니다.
{% code %}
```swift
client.asrAgent.startRecognition(initiator: .user)
```
{% endcode %}

## 더 알아보기

### Sample Application

NUGU SDK for iOS의 Github Repository에 있는 샘플 앱을 통해서도 NUGU SDK의 주요 사용 방법을 확인하실 수 있습니다.

{% link url="https://github.com/nugu-developers/nugu-ios" caption="" %}

