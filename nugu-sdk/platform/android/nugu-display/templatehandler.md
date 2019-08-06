---
depth_order: 2
description: 'Template, 응용레벨 사이의 상호작용 커스텀'
---

# TemplateHandler

`TemplateRenderer`는 `TemplateView`를 사용하여 화면을 구성합니다.

TemplateView 에서 버튼클릭이나 상태 변경이 일어나면 이를 응용레벨에 알려 처리되도록 해야 합니다. 마찬가지로 응용레벨에서 display에 필요한 상태변경이나 명령이 발생하면 TemplateView에 알려 갱신 처리를 해야 합니다. 이와 같은 TemplateView와 응용레벨에서의 상호작용은 `TemplateHandler`인터페이스를 통해 이루어집니다.

TemplateHandler는 `TemplateHandlerFactory`에서 생성합니다.

특정 상호작용을 제한하거나 동작 변경이 필요하다면 SDK의 기본 Handler인 `BasicTemplateHandler`를 상속 후 필요한 메서드를 override 하여 커스텀 TemplateHandler를 작성하고, 이를 TemplateHandlerFactory에 의해 생성되도록 적용하면 됩니다.

## TemplateHandler

TemplateView (이하 View로 표기) 는 버튼이 클릭되거나, 보여지는 item list에 변화가 생길때 이를 응용레벨로 알려 처리되도록 합니다. 또한 Toast나 Activity의 노출을 요청할 수도 있습니다.  
각 상황에 호출되는 메서드들은 아래와 같습니다.

| Methods                                                                                                                     |
|:----------------------------------------------------------------------------------------------------------------------------|
| **fun onElementSelected(tokenId: String, postback : String?)**<br/>View내 버튼 클릭시 호출된다.                                       |
| **fun onChipSelected(text: String)**<br/>View내 chip(추천 명령어) 클릭시 호출된다.                                                       |
| **fun onCloseClicked()**<br/>View내 닫기 버튼 클릭시 호출된다.                                                                          |
| **fun onCloseWithParent()**<br/>Child View의 닫기 버튼 클릭시 호출된다. Parent View 를 함께 종료한다.                                          |
| **fun onCloseAllClicked()**<br/>View내 홈 버튼 클릭시 호출된다. SDK에서는 노출중인 모든 템플릿을 종료한다.                                              |
| **fun onNuguButtonSelected()**<br/>View내 누구 버튼 (아리아 호출) 클릭시 호출된다.                                                           |
| **fun onPlayerCommand(command: String, param: String = ""\)**<br/>미디어 재생 관련 동작이 필요할때 호출된다. (ex. View내 재생/일시정지 버튼 클릭)        |
| **fun onContextChanged(context: String)**<br/>View의 display context 변경이 있을때 호출된다. (ex. focus item 변화, visible item 리스트의 변화) |
| **fun showToast(text: String)**<br/>View에서 응용레벨로 Toast노출을 요청할때 호출된다.                                                        |
| **fun showActivity(className: String)**<br/>View에서 응용레벨로 Activity 노출을 요청할때 호출된다.                                            |
| **fun playTTS(text: String)**<br/>View에서 응용레벨로 TTS 재생을 요청할때 호출된다.                                                           |
| **fun setClientListener(listener: ClientListener)**<br/>handler에 ClientListener를 설정한다.                                      |
| **fun onClear()**<br/>TemplateView가 종료될때 호출된다.<br/>여기서 사용한 리소스를 해제한다.                                                           |
| **fun getNuguClient() : NuguAndroidClient?**<br/>TemplateHandler 의 내부 구현에 필요한 NuguAndroidClient 를 리턴한다.                     |

## TemplateHandler.ClientListener

TemplateHandler가 View에서 응용레벨로의 메시지 전달 혹은 요청이라면, ClientListener는 응용레벨에서 View로의 메시지 전달과 요청이라고 할 수 있다.

| Methods                                                                                                                                     |
|:--------------------------------------------------------------------------------------------------------------------------------------------|
| **fun onMediaStateChanged(activity: AudioPlayerAgentInterface.State, currentTimeMs: Long, currentProgress: Float)**<br/>미디어 재생 상태 변경시 호출된다. |
| **fun onMediaDurationRetrieved(durationMs: Long)**<br/>미디어의 재생시간이 구해졌을때 호출된다.                                                               |
| **fun onMediaProgressChanged(progress: Float, currentTimeMs: Long)**<br/>미디어의 재생경과 업데이트시 호출된다.                                              |
| **fun controlFocus(direction: Direction): Boolean**<br/>View에 focus 이동을 요청한다.                                                               |
| **fun controlScroll(direction: Direction): Boolean**<br/>View에 scroll 을 요청한다.                                                               |
| **fun getFocusedItemToken(): String?**<br/>View내에 현재 focusing 중인 아이템의 토큰정보를 요구한다.                                                           |
| **fun getVisibleTokenList(): List?**<br/>View내에 현재 visible한 아이템 리스트정보를 요구한다.                                                                |

## TemplateHandler 적용

작성한 커스텀 TemplateHandler를 리턴하는 TemplateHandlerFactory 를 TemplateRenderer에 적용하면 커스텀 TemplateHandler가 동작합니다.

{% code %}
```kotlin
TemplateRenderer.templateHandlerFactory = object : TemplateHandler.TemplateHandlerFactory() {
    override fun onCreate(
        nuguProvider: TemplateRenderer.NuguClientProvider,
        templateInfo: TemplateHandler.TemplateInfo,
        fragment: Fragment
    ): TemplateHandler {
        return if (templateInfo.templateType == "template you want set your own handler")
            YourTemplateHandler(nuguProvider, templateInfo, fragment)
        else
            super.onCreate(nuguProvider, templateInfo, fragment)
    }
}
```
{% endcode %}
