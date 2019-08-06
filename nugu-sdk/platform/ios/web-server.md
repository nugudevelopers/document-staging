---
depth_order: 4
---

# NUGU 서비스 관리 web server 연동

## WebView 설정하기

### Cookie 설정

NUGU 서비스 관리 웹에서 사용할 cookie 를 설정합니다.

* authToken: OAuth bearer 토큰
* appVersion: Application 버전 정보
* pocId: [https://developers.nugu.co.kr/#/sdk/pocList](https://developers.nugu.co.kr/#/sdk/pocList) 에서 확인 가능
* theme: LIGHT 또는 DARK
* oauthRedirectUri: NUGU 서비스 관리 웹 내에서 Play 에 로그인 하고 나면 호출되는 url (ex&gt; nugu.public.sample://oauth_refresh)
* deviceUniqueId: NuguOauthClient 의 인증을 통해 관리되는 device unique id

`NuguClientKit` 에서는 사용자의 편의를 위해 `NuguServiceWebView` 의 cookie 값을 default 로 설정해주고 있습니다. 이를 위해선 `addCookie` 함수를 사용하시고, 직접 cookie 를 설정해주시고 싶다면 `setCookie` 를 사용합니다.

`NuguClientKit` 은 사용자의 편의를 위해서 cookie 를 default 로 제공하고 있습니다. Default cookie 를 사용하려면 `addCooklie` 함수를, 직접 cookie 를 세팅하려면 `setCookie` 함수를 사용하면 됩니다.

{% code title="NuguServiceWebViewController.swift" %}
```swift
@IBOutlet private weak var nuguServiceWebView: NuguServiceWebView!

override func viewDidLoad() {
    super.viewDidLoad()
    nuguServiceWebView.addCookie(nil)
}
```
{% endcode %}

### Javascript interface 연동

* `openExternalApp(openExternalAppItem:)` : 외부 앱 실행 요청
* `openInAppBrowser(url:)` : 인 앱 브라우저 실행 요청
* `closeWindow(reason:)` : `ViewController` 종료 요청. `reason` 이 `WITHDRAWN_USER` 인 경우 회원탈퇴 요청으로 인한 종료이기 때문에, 인증정보 등을 파기해야 합니다.
* `requestActiveRoutine` : Routine 설정, 조회를 위해 필요한 정보를 전달해줍니다. Routine 을 지원하지 않을 경우 비워두시면 됩니다.

{% code title="NuguServiceWebViewController.swift" %}
```swift
override func viewDidLoad() {
    super.viewDidLoad()

    nuguServiceWebView.javascriptDelegate = self
}

extension NuguServiceWebViewController: NuguServiceWebJavascriptDelegate {
    func openExternalApp(openExternalAppItem: WebOpenExternalApp) {
        if let appSchemeUrl = URL(string: openExternalAppItem.scheme ?? ""),
            UIApplication.shared.canOpenURL(appSchemeUrl) == true {
            UIApplication.shared.open(appSchemeUrl, options: [:], completionHandler: nil)
            return
        }
        if let appId = openExternalAppItem.appId,
            let appStoreUrl = URL(string: "https://itunes.apple.com/app/" + appId + "?mt=8"),
            UIApplication.shared.canOpenURL(appStoreUrl) == true {
            UIApplication.shared.open(appStoreUrl, options: [:], completionHandler: nil)
        }
    }

    func openInAppBrowser(url: String) {
        present(SFSafariViewController(url: URL(string: url)!), animated: true, completion: nil)
    }

    func closeWindow(reason: String) {
        if reason == "WITHDRAWN_USER" {
            navigationController?.dismiss(animated: true, completion: {
                // 인증 정보 파기
            })
        } else {
            navigationController?.popViewController(animated: true)
        }
    }
    
    func requestActiveRoutine() {
        guard let routineItem = NuguCentralManager.shared.client.routineAgent.routineItem,
              NuguCentralManager.shared.client.routineAgent.state == .playing else {
            return
        }
        nuguServiceWebView.onRoutineStatusChanged(token: routineItem.payload.token, status: RoutineState.playing.routineActivity)
    }
}
```
{% endcode %}

## NUGU 서비스 관리 웹 호출

* `serviceSettingUrl`: NUGU 서비스 관리 웹 사이트
* `agreementUrl`: NUGU 이용약관 웹 사이트

NuguServiceWebView 가 가지고 있던 `serviceSettingUrl` 과 `agreementUrl` 은 deprecate 되었습니다.

{% code %}
```swift
final public class NuguServiceWebView: WKWebView {

    /// Url for service setting web page (deprecated)
    @available(*, deprecated, message: "Use `ConfigurationStore`")
    public static var serviceSettingUrl: String {
        return domain + "/3pp/main.html?screenCode=setting_webview"
    }
    
    /// Url for agreement web page (deprecated)
    @available(*, deprecated, message: "Use `ConfigurationStore`")
    public static var agreementUrl: String {
        return domain + "/3pp/agreement/list.html"
    }
}
```
{% endcode %}

대신 ConfigurationStore 에서 `serviceSettingUrl` 과 `agreementUrl` 을 제공합니다.

{% code %}
```swift
public class ConfigurationStore {
    /// Get the web page url to configure play settings for the user device.
    ///
    /// - Parameter completion: The closure to receive result.
    func serviceSettingUrl(completion: @escaping (Result<String, Error>) -> Void) {
        configurationMetadata { result in
            switch result {
            case .success(let configurationMetadata):
                if let urlString = configurationMetadata.serviceSetting {
                    completion(.success(urlString))
                } else {
                    completion(.failure(ConfigurationError.invalidUrl))
                }
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
    
    /// Get the web page url for the terms of service.
    ///
    /// - Parameter completion: The closure to receive result.
    func agreementUrl(completion: @escaping (Result<String, Error>) -> Void) {
        configurationMetadata { result in
            switch result {
            case .success(let configurationMetadata):
                if let urlString = configurationMetadata.termOfServiceUri {
                    completion(.success(urlString))
                } else {
                    completion(.failure(ConfigurationError.invalidUrl))
                }
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}
```
{% endcode %}

## Play 로그인 결과 전달

NUGU 서비스 관리 웹 내에서 Play 에 로그인 하고 나면 `oauthRedirectUri` 가 호출되며, `WebView` 를 갱신하면 로그인 결과가 웹 페이지에 반영됩니다.

* 로그인 결과를 전달하기 위한 `Notification` 을 정의합니다.

{% code %}
```swift
static let oauthRefresh = Notification.Name("com.skt.Romaine.oauth_refresh")
```
{% endcode %}

* `application(_:open:options)` 에서 `url` 이 `oauthRedirectUri` 인 경우 `Notification` 을 전송합니다. 

{% code title="AppDelegate.swift" %}
```swift
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    if ConfigurationStore.shared.isServiceWebRedirectUrl(url: url) {
            NotificationCenter.default.post(name: .oauthRefresh, object: nil, userInfo: nil)
            return true
        }
}
```
{% endcode %}

* `ViewController` 에서 `Notification` 을 받으면 `WebView` 를 갱신합니다.

{% code title="NuguServiceWebViewController.swift" %}
```swift
override func viewDidLoad() {
    super.viewDidLoad()

    NotificationCenter.default.addObserver(
        self,
        selector: #selector(refreshAfterOauth),
        name: .oauthRefresh,
        object: nil
    )
}

@objc func refreshAfterOauth() {
    presentedViewController?.dismiss(animated: true, completion: nil)
    nuguServiceWebView.reload()
}
```
{% endcode %}

