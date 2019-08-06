---
depth_order: 3
description: TemplateView 커스텀
---

# TemplateView

기본적으로 제공되는 `TemplateView`는 Nugu에서 정의한 레이아웃과 디자인을 따릅니다. TemplateView를 직접 구현하고 이를 TemplateView 생성로직에 적용하면 특정 templateType의 template 노출이 요청된 경우 원하는 TemplateView를 노출 시킬 수 있습니다.

## TemplateView 구현

TemplateView는 TemplateRenderer를 통해 전달되는 템플릿의 노출과 업데이트를 처리해야 합니다.

TemplateView Interface에서 필수로 override 해야 하는 method입니다.

| Methods                                                                                                                                                                                                                                   |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **fun load(templateContent: String, deviceTypeCode: String, dialogRequestId: String, onLoadingComplete: (() -\> Unit)? = null)**<br/>새로운 탬플릿 노출이 필요할때 TemplateRenderer의 render()를 통해 호출됩니다. templateContent에는 template payload 전체가 전달됩니다. |
| **fun update(templateContent: String, dialogRequestedId: String, onLoadingComplete: (() -\> Unit)**<br/>이미 노출된 탬플릿의 부분 업데이트가 필요할때 TemplateRenderer의 update()를 통해 호출됩니다. templateContent에는 업데이트가 필요한 template payload가 전달됩니다.              |

{% alerts style="info" %}
TemplateView 구현체는 android View 객체여야 합니다.
{% endalerts %}

## TemplateView Constructor 추가

생성될 TemplateView는 templateType에 따라 결정됩니다.

TemplateView.kt에 선언된 정적 맵에 templateType과 templateConstructor가 매핑되어 있습니다.\
이 맵에서 templateType에 맞는 templateConstructor를 찾아 TemplateView를 생성합니다.\
매핑되는 것이 없을 경우 TemplateWebView 객체가 생성됩니다.

원하는 templateType과 직접 구현한 TemplateView 생성자를 매핑하여 맵에 추가하면 됩니다.

{% code %}
```kotlin
TemplateView.kt

/**
 * key : TemplateType list
 * value : TemplateView Constructor
 */
 val templateConstructor: HashMap<List<String>, (String, Context) -> TemplateView> by lazy {
    HashMap<List<String>, (String, Context) -> TemplateView>().also {
        it[MEDIA_TEMPLATE_TYPES] = { templateType, context ->
            DisplayAudioPlayer(templateType, context)
        }
    }
}
```
{% endcode %}

