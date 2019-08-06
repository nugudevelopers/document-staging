---
depth_order: 5
---

# NUGU Display의 노출과 제어

NUGU 서비스에서 UI Display 를 담당하는 `DisplayAgent` 는 Display 의 동작, life cycle 을 `DisplayAgentDelegate` 를 통해 전달하고 있습니다. 사용자는 `DisplayAgentDelegate` 를 받아, 직접 DisplayView 를 그려줄 수도 있으나, `NuguUIKit` 은 사용자의 편의성을 위해 간단히 생성, 설정, 노출 가능한 `NuguDisplayWebView` 를 제공하고 있습니다. Template server 에 접속하여 Display 웹뷰를 내려받아 노출하는 `NuguDisplayWebView` 를 사용하는 방법은 크게 두가지가 있습니다.

## DisplayWebViewPresenter 를 사용하기

`NuguClientKit` 은 사용자가 더 쉽게, 편리하게 Display 를 노출하기 위해 `DisplayWebViewPresenter` 를 제공하고 있습니다. `DisplayWebViewPresenter` 는 사용자가 `DisplayAgentDelegate` 를 구현할 필요없이 내부적으로 `DisplayAgent` 동작 핸들링을 하고 있으며, 간단한 delegate 메소드만 사용자에게 제공합니다. `DisplayWebViewPresenter` 를 사용하기 위해선 제일 먼저 `NuguClientKit` 을 import 하도록 합니다.

{% code %}
```swift
import NuguClientKit
```
{% endcode %}

그리고 `DisplayWebView` 를 노출할 owner 의 코드에 다음과 같이 `DisplayWebViewPresenter` variable 을 initialize 해줍니다.

{% code %}
```swift
    private lazy var displayWebViewPresenter: DisplayWebViewPresenter = {
        DisplayWebViewPresenter(
            viewController: self,
            nuguClient: NuguCentralManager.shared.client,
            clientInfo: ["buttonColor": "white"]
        )
    }()
```
{% endcode %}

* viewController : `DisplayWebView` 를 add / insert 할 parentView 를 소유하고 있는 viewController 입니다. ViewController 대신에 view 를 인자로 직접 설정할 수도 있습니다.
* nuguClient : `DisplayAgentDelegate` 를 대신 핸들링하기 위해 전달해야하는 `NuguClient` 객체입니다. SampleApp 코드에서는 `NuguCentralManager` 가 가지고 있습니다.
* clientInfo : `clientInfo` 인자에는 template server 와의 협의하에 custom dictionary injection 이 가능하며, 현재는 `["buttonColor": "white/blue"]`을 지원하고 있습니다.

그 다음으로 `DisplayWebViewPresenterDelegate` 를 구현해주면 간단하게 끝납니다.

* `onDisplayWebViewBuguButtonClick()` : `DisplayWebView` 의 NUGU 버튼이 선택되었을때 호출됨.

{% code %}
```swift
extension MainViewController: DisplayWebViewPresenterDelegate {    
    func onDisplayWebViewNuguButtonClick() {
        presentVoiceChrome(initiator: .user)
    }
}
```
{% endcode %}

## NuguDisplayWebView 를 직접 사용하기

`DisplayWebViewPresenter` 의 도움없이, 직접 `NuguDisplayWebView` 를 생성하고 사용할 수 있습니다. `NuguDisplayWebView` 를 사용하기 위해, 먼저 `DisplayAgentDelegate` 를 구현하는 객체에 NuguUIKit 을 import합니다.

{% code %}
```swift
import NuguUIKit
```
{% endcode %}

NuguDisplayWebView 의 노출, 갱신, 제거 타이밍은 분명합니다. DisplayAgent 의 delegate 메소드에 맞게 NuguDisplayWebView 를 제어해주어야 합니다.

{% code %}
```swift
    func displayAgentShouldRender(template: DisplayTemplate, completion: @escaping (AnyObject?) -> Void) {
        DispatchQueue.main.async {  [weak self] in
            self?.addDisplayView(displayTemplate: template, completion: completion)
        }
    }

    func displayAgentShouldUpdate(templateId: String, template: DisplayTemplate) {
        DispatchQueue.main.async { [weak self] in
            self?.updateDisplayView(displayTemplate: template)
        }
    }

    func displayAgentDidClear(templateId: String) {
        DispatchQueue.main.async { [weak self] in
            self?.dismissDisplayView()
        }
    }
```
{% endcode %}

`displayAgentShouldRender()` delegate 가 호출되었을때는, NuguDisplayWebView 를 노출해야하는 시점이므로 `addDisplayView()` 함수를 작성하여야 합니다.

`addDisplayView()` 에서는 넘겨받은 `DisplayTemplate` 인자를 사용하여`NuguDisplayWebView` 의 `load()` 함수를 먼저 호출해주도록 합니다. `load()` 함수의 `clientInfo` 인자에는 template server 와의 협의하에 dictionary injection 이 가능하며, 현재는 `["buttonColor": "white/blue"]`을 지원하고 있습니다.

그리고 `NuguDisplayWebView` 의 각 이벤트에 맞는 call back block 코드를 작성해주어야 합니다.

* `onClose` : 닫기 버튼이 눌러졌을때
* `onItemSelect` : 리스트의 항목이 선택되었을때
* `onUserInteraction` : 스크롤, 터치와 같은 userInteraction 이 발생하였을때
* `onTapForStopRecognition` : VoiceChrome 노출되었을때, 이를 닫기 위한 외부 영역 터치가 발생했을때
* `onChipsSelect` : `NuguDisplayWebView` 하단의 명령어 (chips) 버튼이 선택되었을때
* `onNuguButtonClick` : `NuguDisplayWebView` 하단의 NuguButton 이 선택되었을때

{% code %}
```swift
    func addDisplayView(displayTemplate: DisplayTemplate, completion: @escaping (AnyObject?) -> Void) {
        // 이미 NuguDisplayWebView 가 노출중일땐, 재활용해주도록 합니다.
        if let displayView = self.displayView,
           view.subviews.contains(displayView) {
            replaceDisplayView(displayTemplate: displayTemplate, completion: completion)
            return
        }
        let displayView = NuguDisplayWebView(frame: view.frame)
        displayView.load(
            displayPayload: displayTemplate.payload,
            displayType: displayTemplate.type,
            clientInfo: ["buttonColor": "white"]
        )
        displayView.onClose = { [weak self] in
            guard let self = self else { return }
            NuguCentralManager.shared.client.ttsAgent.stopTTS()
            self.dismissDisplayView()
        }
        displayView.onItemSelect = { (token, postback) in
            NuguCentralManager.shared.client.displayAgent.elementDidSelect(templateId: displayTemplate.templateId, token: token, postback: postback)
        }
        displayView.onUserInteraction = {
            NuguCentralManager.shared.client.displayAgent.notifyUserInteraction()
        }
        displayView.onTapForStopRecognition = { [weak self] in
            self?.didTapForStopRecognition()
        }
        displayView.onChipsSelect = { (selectedChips) in
            NuguCentralManager.shared.requestTextInput(text: selectedChips, requestType: .dialog)
        }
        displayView.onNuguButtonClick = { [weak self] in
            self?.presentVoiceChrome(initiator: .user)
        }
        displayView.alpha = 0
        view.insertSubview(displayView, belowSubview: nuguVoiceChrome)
        completion(displayView)
        UIView.animate(withDuration: 0.3, animations: {
            displayView.alpha = 1.0
        }, completion: { [weak self] (_) in
            self?.displayView = displayView
        })
    }
```
{% endcode %}

이미 `NuguDisplayWebView` 가 노출중일땐, 뷰의 재생성 없이 기존 뷰를 재활용하는 것을 추천합니다.

{% code %}
```swift
      func replaceDisplayView(displayTemplate: DisplayTemplate, completion: @escaping (AnyObject?) -> Void) {
        guard let displayView = self.displayView else {
            completion(nil)
            return
        }
        displayView.load(
            displayPayload: displayTemplate.payload,
            displayType: displayTemplate.type,
            clientInfo: ["buttonColor": "white"]
        )
        displayView.onItemSelect = { (token, postback) in
            NuguCentralManager.shared.client.displayAgent.elementDidSelect(templateId: displayTemplate.templateId, token: token, postback: postback)
        }
        completion(displayView)
    }
```
{% endcode %}

`displayAgentShouldUpdate()` delegate 가 호출되었을때엔 단순히 `NuguDisplayWebView` 의 `update(updatePayload: Data)` 만 불러주시면 됩니다.

{% code %}
```swift
func updateDisplayView(displayTemplate: DisplayTemplate) {
        displayView?.update(updatePayload: displayTemplate.payload)
    }
```
{% endcode %}

`displayAgentDidClear()` delegate 의 핸들링도 매우 간단합니다. 노출되었던 `NuguDisplayWebView` 를 내려주기만 하면 됩니다.

{% code %}
```swift
    func dismissDisplayView() {
        guard let view = displayView else { return }
        UIView.animate(
            withDuration: 0.3,
            animations: {
                view.alpha = 0
            },
            completion: { _ in
                view.removeFromSuperview()
            }
        )
    }
```
{% endcode %}

`displayAgentShoudScroll()` delegate 호출 시에도, 단순히 `NuguDisplayWebView` 의 `scroll()` 함수만 불러주면 됩니다.

{% code %}
```swift
    func displayAgentShouldScroll(templateId: String, direction: DisplayControlPayload.Direction, header: Downstream.Header, completion: @escaping (Bool) -> Void) {
        DispatchQueue.main.async { [weak self] in
            self?.displayView?.scroll(direction: direction, completion: completion)
        }
    }
```
{% endcode %}
