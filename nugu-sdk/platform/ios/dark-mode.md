---
depth_order: 7
description: NUGU SDK 의 UI Component 들은 Dark / Light 모드를 지원합니다.
---

# Dark Mode 지원

NUGU SDK 의 `NuguVoiceChrome`, `AudioDisplayView` 등과 같은 UI Component 들은 각자 theme 이라는 변수를 통해 Dark / Light 모드 테마를 지원하고 있습니다. theme 변수를 직접 변경해주면 해당 UI Component 의 테마는 동적으로 변경됩니다.

{% code %}
```swift
public class NuguVoiceChrome: UIView {
    public var theme: NuguVoiceChromeTheme
}

public class AudioDisplayView: UIView { 
    public var theme: AudioDisplayTheme
}

ex> nuguVoiceChrome.theme = .dark
```
{% endcode %}

고객의 편의를 위해 `NuguClientKit` 에서는 `NuguThemeController` 라는 컨트롤러 모델을 제공하고 있습니다. `NuguThemeController` 를 생성하여, `VoiceChromePresenter`, `DisplayWebViewPresenter`, `AudioDisplayViewPresenter` 의 생성자로 추가하면 해당 UI Component 들의 theme 가 `NuguThemeController` 와 연동됩니다.

{% code %}
```swift
    lazy var themeController = NuguThemeController()
    
    private lazy var voiceChromePresenter = VoiceChromePresenter(
        viewController: self,
        nuguClient: NuguCentralManager.shared.client,
        themeController: themeController
    )
    private lazy var displayWebViewPresenter = DisplayWebViewPresenter(
        viewController: self,
        nuguClient: NuguCentralManager.shared.client,
        clientInfo: ["buttonColor": "white"],
        themeController: themeController
    )
    private lazy var audioDisplayViewPresenter = AudioDisplayViewPresenter(
        viewController: self,
        nuguClient: NuguCentralManager.shared.client,
        themeController: themeController
    )
    
    ex> themeController.theme = .dark
```
{% endcode %}
