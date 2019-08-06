---
depth_order: 5
description: TemplateRenderer 적용 방법
---

# NUGU Display의 노출과 제어

[Display 가이드](../../../nugu-sdk/capability-interface/display)에 소개된 DisplayAggregatorInterface.Renderer, DisplayAggregatorInterface.Controller 를 구현하고 DisplayAgent를 이용하여 Template 화면을 노출하고 이를 제어할 수 있습니다.

개발 편의를 위해 NUGU SDK는 이 과정을 구현한 `TemplateRenderer`를 제공합니다.  
TemplateRenderer의 적용 방법을 설명합니다.

{% alerts style="info" %}
TemplateRenderer는 NuguUXKit에 포함되어 있습니다.
{% endalerts %}

## TemplateRenderer 생성

{% code %}
```kotlin
 // MainActivity.kt in SampleApp
 private val templateRenderer = TemplateRenderer(
        nuguClientProvider = object : TemplateRenderer.NuguClientProvider {
            override fun getNuguClient(): NuguAndroidClient {
                return ClientManager.getClient()
            }
        },
        deviceTypeCode = "your_device_type_code",
        fragmentManager = supportFragmentManager,
        containerId = R.id.template_container)
```
{% endcode %}

* **nuguClientProvider** : Template 관련요청 처리를 위한 NuguAndroidClient 프로바이더
* **deviceTypeCode** : poc의 device type code
* **fragmentManager** : Fragment Transaction을 위한 fragmentManager
* **containerId** : Fragment가 추가될 container view id

{% alerts style="info" %}
TemplateRenderer는 Fragment 형태로 Template 화면을 제공합니다.
{% endalerts %}

## TemplateRenderer 등록 <a id="templaterenderer-1"></a>

nuguAndroidClient에 templateRenderer를 displayRenderer로 설정합니다.

{% code %}
```kotlin
// MainActivity.kt in SampleApp
ClientManager.getClient().setDisplayRenderer(templateRenderer)
```
{% endcode %}

이제 Template 화면이 알아서 노출되고 클릭, 스크롤, 포커스 등 사용자 인터렉션이 자동으로 처리됩니다.

## TemplateRenderer 사용 (모든 템플릿 제거)

TemplateRenderer를 등록하는 것만으로도 Template 노출, 업데이트, 제거는 물론 상호작용까지 알아서 처리됩니다.  
다만 백키 클릭과 같이 TemplateRenderer가 알아챌 수 없는 이벤트로 모든 template을 제거하는 유즈케이스 대응을 위해 clearAll() 메서드를 제공합니다.

{% code %}
```kotlin
// TemplateRenderer.kt in NuguUXKit
fun clearAll(): Boolean 

// MainActivity.kt in SampleApp
override fun onBackPressed() {
    if (templateRenderer.clearAll()) return
    super.onBackPressed()
}
```
{% endcode %}

SampleApp의 MainActivity에서의 사용예시입니다.

백키 이벤트가 발생했을때 template이 노출상태라면 template을 제거하고, 아니면 activity를 종료하는 케이스에 사용될 수 있습니다.
