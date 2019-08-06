---
depth_order: 6
---

# NUGU 사용자 인터페이스

[SDK UX Guide](../../sdk-design-guide/voice-chrome) 을 준수하여 어플리케이션을 개발하는데 사용할 수 있는 레이아웃 객체와 UI 컨트롤 같은 UI 구성요소를 미리 빌드된 형태로 제공합니다.

## NuguVoiceChrome

NUGU 서비스의 핵심 기능인 음성 인식을 표현하기 위한 View 입니다. 음성 인식의 단계를 Animation 으로 표현하며, 인식된 음성을 문자로 출력하고, 눌러서 음성 인식을 대신하는 `NuguChipsButton` 들을 노출합니다.

| Methods                                                                                                                                                                                                                  |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **func changeState(state: NuguVoiceChrome.State)**<br/>NuguVoiceChrome 의 상태(단계)와 animation 을 변경합니다.                                                                                                                      |
| **func setChipsData(chipsData: \[NuguChipsButton.NuguChipsButtonType\], onChipsSelect: @escaping ((_ selectedChips: NuguChipsButton.NuguChipsButtonType) -\> Void))**<br/>NuguVoiceChrome 에 노출될 NuguChipsButton 을 설정합니다. |
| **func setRecognizedText(text: String?\)**<br/>NuguVoiceChrome 에 출력될 인식 문구를 설정합니다.                                                                                                                                       |

## VoiceChromePresenter

`NuguVoiceChrome` 은 `VoiceChromePresenter` 의 도움없이 생성, 노출, 관리, 제거될 수 있으나 `VoiceChromePresenter` 를 사용하면 복잡한 사용 로직을 사용자를 대신해 관리해줍니다.

1. `NuguVoiceChrome` `VoiceChromePresenter` 을 사용하기 위해 먼저 `NuguUIKit` 와 `NuguClientKit` 을 import 해줍니다.

{% code %}
```swift
import NuguClientKit
import NuguUIKit
```
{% endcode %}

1. 그리고 `NuguVoiceChrome` 를 노출할 owner 의 코드에 다음과 같이 `NuguVoiceChrome` `VoiceChromePresenter` variable 을 initialize 해줍니다.

{% code %}
```swift
    private lazy var voiceChromePresenter: VoiceChromePresenter = {
        VoiceChromePresenter(
            viewController: self,
            nuguVoiceChrome: nuguVoiceChrome,
            nuguClient: NuguCentralManager.shared.client
        )
    }()
```
{% endcode %}

* viewController : `NuguVoiceChrome` 을 add / insert 할 parentView 를 소유하고 있는 viewController 입니다. ViewController 대신에 view 를 인자로 직접 설정할 수도 있습니다.
* nuguClient : `NuguVoiceChrome` 을 대신 제어하기 위해 전달해야하는 `NuguClient` 객체입니다. SampleApp 코드에서는 `NuguCentralManager` 가 가지고 있습니다.
* `VoiceChromePresenter` 는 `NuguVoiceChrome` 을 노출하고 제거하는 함수를 제공하고 있습니다.

{% code %}
```swift
        do {
            // NuguVoiceChrome 노출
            try voiceChromePresenter.presentVoiceChrome()
            // 성공 시 음성 인식을 시작해주어야 합니다.
        } catch {
            switch error {
            // Network issue 로 정상적으로 VoiceChrome 을 작동할 수 없는 경우
            case VoiceChromePresenterError.networkUnreachable: break
            // 이미 VoiceChrome 이 노출되어 있을 경우
            case VoiceChromePresenterError.alreadyShown: break
            // VoiceChrome 을 add 할 superView 가 존재하지 않을 경우
            case VoiceChromePresenterError.superViewNotExsit: break
                log.error(error)
            }
        }
```
{% endcode %}

{% code %}
```swift
// NuguVoiceChrome 제거
voiceChromePresenter.dismissVoiceChrome()
```
{% endcode %}

1. `VoiceChromeDelegate` 를 설정해주고, 전달받은 delegate 상황을 핸들링하여야 합니다.

{% code %}
```swift
voiceChromePresenter.delegate = self

// MARK: - VoiceChromePresenterDelegate

extension MainViewController: VoiceChromePresenterDelegate {
    func voiceChromeWillShow() {
        // VoiceChrome 이 노출되기 전에 NuguButton 을 비활성화 시켜줍니다. 
        nuguButton.isActivated = false
    }

    func voiceChromeWillHide() {
        // VoiceChrome 이 제거되기 전에 NuguButton 을 활성화 시켜줍니다. 
        nuguButton.isActivated = true
    }

    func voiceChromeChipsDidClick(chips: NuguChipsButton.NuguChipsButtonType) {
        chipsDidSelect(selectedChips: chips)
    }
}
```
{% endcode %}

## NuguButton

`NuguButton`은 음성 인식을 시작하고, Wake up 감지 가능 상태를 표현하기 위해 제공되는 버튼입니다. `NuguButton`은 코드, IBOutlet 상관없이 생성하여 사용 가능합니다.

| **Attributes**                                                                       |
|:-------------------------------------------------------------------------------------|
| **public** **var** nuguButtonType: NuguButtonType<br/>(fab/button, blue/white 설정 가능) |
| **public** **var** isActivated: Bool                                                 |
| **public** **override** **var** isEnabled: Bool                                      |

{% code %}
```swift
    // Wake up detector 활성화 표현을 위한 flip animation 을 활성화합니다.
    public func startFlipAnimation() 
    // Wake up detector 활성화 표현을 위한 flip animation 을 활성화합니다.
    public func stopFlipAnimation() 
    // NuguButton 이 비활성화 되었을때 진행되는 NuguButton의 animation 을 pause 시킵니다.
    public func pauseDeactivateAnimation()
```
{% endcode %}

## NuguToast

NUGU 토스트 메시지는 작은 팝업으로 작업에 관한 간단한 피드백을 제공합니다. 메시지에 필요한 공간만 차지하며 진행 중인 활동은 그대로 표시되고 상호작용도 유지됩니다. 토스트 메시지는 시간이 초과하면 자동으로 사라집니다.

{% code %}
```swift
func showToast(message: String?, bottomMargin: CGFloat? = nil, duration: Duration = .short)
```
{% endcode %}

* message : `NuguToast` 에 표현될 텍스트입니다.
* bottomMargin : 노출될 `NuguToast` 의 bottom margin 값입니다. (default = 88.0)
* duration : `NuguToast` 를 노출할 시간 값이며, short = 4 / long = 7 으로 설정 가능합니다. (Default = .short)

