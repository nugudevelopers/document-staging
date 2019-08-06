---
depth_order: 6
description: User Interface
---

# NUGU 사용자 인터페이스

[SDK UX Guide](../../sdk-design-guide/voice-chrome) 을 준수하여 어플리케이션을 개발하는데 사용할 수 있는 레이아웃 객체와 UI 컨트롤 같은 UI 구성요소를 미리 빌드된 형태로 제공합니다.

## ChromeWindow

ChromeWindow은 사용자의 음성 입력 수신, NUGU 음성 출력 등 NUGU 음성 동작과 관련된 상태를 그래픽, 색상, 모션으로 표현하는 UI 모듈 입니다.  
구성요소로 NuguVoiceChromeView, NuguChipsView, Stt(TextView)가 포함되어있습니다.

1. CoordinatorLayout에 android:id 태그를 설정합니다.

{% code %}
```xml
<androidx.coordinatorlayout.widget.CoordinatorLayout
       android:id="@+id/coordinator"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
```
{% endcode %}

2. ChromeWindow 객체 생성시 CoordinatorLayout을 연결합니다.

{% code %}
```kotlin
val chromeWindow = ChromeWindow(this, findViewById<CoordinatorLayout>(R.id.coordinator))
```
{% endcode %}

3. ChromeWindow 작업을 추가하려면 ChromeWindow.OnChromeWindowCallback 인터페이스를 구현하는 Callback 객체를 정의해야 합니다.

{% code %}
```kotlin
chromeWindow.setOnChromeWindowCallback(object : ChromeWindow.OnChromeWindowCallback {
   override fun onExpandStarted() {
     // ChromeWindow 시작 
   }

   override fun onHiddenFinished() {
     // ChromeWindow 종료
   }

   override fun onChipsClicked(item: NuguChipsView.Item) {
     // Chips 아이템이 클릭
   }
})
```
{% endcode %}

4. 추가적으로 DialogUXStateAggregatorInterface.Listener, ASRAgentInterface.OnResultListener 리스너를 연결해야 합니다.

{% code %}
```kotlin
chromeWindow.apply {
   ClientManager.getClient().addDialogUXStateListener(this)
   ClientManager.getClient().addASRResultListener(this)
}
```
{% endcode %}

| Methods                                                                                                              |
|:---------------------------------------------------------------------------------------------------------------------|
| **fun isShown() : Boolean**<br/>chromeWindow의 visible 확인                                                             |
| **fun dismiss()**<br/>chromeWindow를 종료                                                                               |
| **fun setScreenOnWhileASR(screenOn: Boolean)**<br/>ASR 중에 화면을 켜진 상태로 유지                                              |
| **fun setOnCustomChipsProvider(provider: CustomChipsProvider)**<br/>chromeWindow에 표시될 custom chips (발화 가이드) 프로바이더 설정 |

## NuguButton

NUGU Voice Button은 음성 입력이 가능한 대기 상태를 나타내는 버튼입니다. BLUE / WHITE 컬러타입 중 한 가지를 선택 적용할 수 있습니다.

1. layout file에 NuguButton을 정의 합니다.

{% code %}
```xml
<com.skt.nugu.sdk.platform.android.ux.widget.NuguButton
   android:id="@+id/fab"
   android:layout_width="wrap_content"
   android:layout_height="wrap_content"
   android:layout_gravity="bottom|end"
   android:layout_marginEnd="14dp"
   android:layout_marginBottom="10dp"
   android:contentDescription="@string/button_fab_description"
   app:colors="blue"
   app:types="fab" />
```
{% endcode %}

   attributes 수정하여 버튼 타입 및 색생등 설정할수 있습니다.

| Attribute    | 설명                                      |
|:-------------|-----------------------------------------|
| **types**    | fab, button 제공                          |
| **colors**   | blue, white 제공                          |
| **autoPlay** | 뷰생성시 Animation을 자동으로 재생 (default:false) |
| **loopPlay** | Animation을 재생을 반복 (default:true)        |

{% alerts style="info" %}
Template 내의 NuguButton 색상은 **TemplateView.nuguButtonColor** 정적변수를 설정하여 변경 가능합니다.  
ex\) TemplateView.nuguButtonColor = NuguButtonColor.WHITE
{% endalerts %}

## NuguToast

NUGU 토스트 메시지는 작은 팝업으로 작업에 관한 간단한 피드백을 제공합니다. 메시지에 필요한 공간만 차지하며 진행 중인 활동은 그대로 표시되고 상호작용도 유지됩니다. 토스트 메시지는 시간이 초과하면 자동으로 사라집니다. (android.widget.Toast 기반으로 커스터마이징)

1. Toast 메시지 빌드 및 표시

{% code %}
```kotlin
NuguToast.with(this)
       .message(R.string.volume_mute)
       .duration(NuguToast.LENGTH_SHORT)
       .yOffset(height)
       .show()
```
{% endcode %}

   * **message** : 알림메시지를 설정 
   * **duration** : LENGTH_SHORT, LENGTH_LONG 선택가능하며, 각각 4초, 7초동안 노출됩니다.
   * **yOffset** : 토스트 메시지 위치 지정 (y-좌표 오프셋)
   * **show** : 설정된 메시지 알림을 표시

## NuguSnackbar

NUGU 스택바는 사용자에게 간단한 팝업 메시지를 제공합니다. 스낵바가 표시된 동안 현재 활동은 계속 표시되고 상호작용이 가능합니다. 잠시 후에 스낵바가 자동으로 닫힙니다. Snackbar 사용자가 메시지에 응답할 수 있도록 설계되어있지만 NuguSnackbar는 작업을 추가할 수 없습니다.

1. Snackbar 메시지 빌드 및 표시

{% code %}
```kotlin
NuguSnackbar.with(findViewById(R.id.drawer_layout))   
       .message(R.string.device_gw_error_002)
       .duration(NuguSnackbar.LENGTH_LONG)
       .show()
```
{% endcode %}

   * **message** : 알림메시지를 설정
   * **duration** : LENGTH_SHORT, LENGTH_LONG, LENGTH_INDEFINITE 선택
   * **callback**: dismissed 이벤트 콜백
   * **show** : 설정된 메시지 알림을 표시

