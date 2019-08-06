---
depth_order: 1
description: Template 유지 정책의 커스텀
---

# TemplateRenderer

`TemplateRenderer`는 NUGU의 Template유지정책에 따라 Template 을 노출하고 제거합니다.

예를들어 응답 TTS재생이 종료되면 일정시간 후 연관된 Template은 자동으로 제거됩니다. 또한 미디어 플레이어 Template의 경우, 새로운 미디어 플레이 요청이 들어왔을때 기존의 모든 Template을 제거한후 노출됩니다.

이런 기본 정책과 다른 자신만의 유지정책을 가지려면 `DisplayAggregatorInterface.Renderer`를 직접 구현하여 `NuguAndroidClient` 객체에 [displayRenderer로 등록](../nugu-display#templaterenderer-1)하면 됩니다.

## Renderer 구현

DisplayAggregatorInterface.Renderer 인터페이스를 직접 구현하여 Template의 노출과 제거를 컨트롤 할 수 있습니다.

{% code %}
```kotlin
interface Renderer {
    fun render(templateId: String, templateType: String, templateContent: String, header: Header, displayType: Type): Boolean
    fun clear(templateId: String, force: Boolean)
    fun update(templateId: String, templateContent: String)
}
```
{% endcode %}

* **render() :** 새로운 Template 노출이 필요할때 호출됩니다. 파라미터로 전달받은 Template 정보를 이용하여 사용자에게 시각정보를 제공해야 합니다. 처리 여부를 리턴해야 합니다.
* **clear() :** Template을 제거해야 할때 호출됩니다. 사용자의 '닫기' 명령에 의해 호출될 수도 있고 NUGU의 화면 유지정책에 따라 호출될 수도 있습니다. force 파라미터가 true인 경우는 반드시 제거하기를 권장합니다.
* **update() :** 이미 노출된 Template의 특정 요소를 업데이트 해야할때 호출됩니다.

{% alerts style="warning" %}
각 메서드는 mainThread에서 호출됨을 보장하지 않습니다.\
필요한 로직이 mainThread에서 동작하도록 작성하시기 바랍니다.
{% endalerts %}

## Display 상태 전송

DisplayAggregatorInterface.Renderer의 render(), clear() 가 처리되거나 사용자가 백키로 화면을 닫는 등 화면의 노출상태가 변화하면 이를 `DisplayInterface`를 통해 NUGU SDK로 알려야 합니다.\
(DisplayInterface는 NuguAndroidClient.getDisplay()로 얻을 수 있습니다.)

{% code %}
```kotlin
//DisplayInterface.kt
fun displayCardRendered(templateId: String, controller: Controller?)
fun displayCardRenderFailed(templateId: String)
fun displayCardCleared(templateId: String)
```
{% endcode %}

* **displayCardRendered()** : Template 화면 노출이 완료됐을때 호출해야 합니다. 사용자가 화면을 보며 인터렉션할 수 있음을 의미합니다.
* **displayCardRenderFailed()** : Template 화면 노출을 시도했으나 실패했을 경우 호출해야 합니다.
* **displayCardCleared()** : Template 화면이 제거되면 호출해야 합니다.

{% alerts style="warning" %}
DisplayAggregatorInterface.Renderer의 render()함수에서 처리결과로 true를 리턴했다면, 이후 반드시 displayCardRenderer() 혹은 displayCardRenderFailed()를 호출해야 합니다.
{% endalerts %}

{% alerts style="warning" %}
displayCardRendered()가 호출되지 않은 템플릿에 대해 displayCardCleared()가 호출되어서는 안됩니다.\
렌더링이 완료되지 않은 Template이 제거된 경우에는 displayCardRenderFailed()를 호출해야 합니다.
{% endalerts %}

