---
depth_order: 15
description: 보이스 크롬에 노출되는 발화 가이드를 제공하기 위한 규격
---

# Chips

## Version

최신 버전은 1.2 입니다.

| Version | Date       | Description                                                                                  |
|:--------|:-----------|:---------------------------------------------------------------------------------------------|
| 1.0     | 2020.07.02 | 규격 추가                                                                                        |
| 1.1     | 2020.10.26 | Render directive 의 chips 에 token 필드 추가                                                       |
| 1.2     | 2021.05.31 | Render directive 의 chips.type 에 NUDGE 추가<br/>Render directive 의 target 에 LISTEN, SPEAKING 추가 |

## SDK Interface

### ChipsAgent 사용

Chips interface 규격에 따른 디바이스의 동작 제어는 ChipsAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 ChipsAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val chipsAgent = nuguAndroidClient.getAgent(ChipsAgent.NAMESPACE)
```
{% endcode %}

보이스 크롬 UI 구성을 위해 TTS interface, ASR interface, Chips interface, Session interface 를 병합해주는 DialogUXStateAggregator 를 제공합니다.
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 ChipsAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let chipsAgent = nuguClient.chipsAgent
```
{% endcode %}

보이스 크롬 UI 구성을 위해 TTS interface, ASR interface, Chips interface, Session interface 를 병합해주는 DisplayAggregatorInterface 를 제공합니다.

NuguClient instance 를 통해 DialogStateAggregator instance 에 접근할 수 있습니다.

{% code %}
```swift
let dialogStateAggregator = nuguClient.dialogStateAggregator
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
CapabilityFactory::makeCapability 함수로 ChipsAgent 를 생성하고 NuguClient 에 추가해 주어야합니다.

{% code %}
```cpp
auto chips_handler(std::shared_ptr<IChipsHandler>(
        CapabilityFactory::makeCapability<ChipsAgent, IChipsHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(chips_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### UI 구성

보이스 크롬에 노출하기 위한 데이터는 Render directive 에 포함되어 전달됩니다.

{% tabs %}
{% tabs::content title="Android" %}
DialogUXStateAggregatorInterface.Listener 를 추가합니다.

{% code %}
```kotlin
val listener = object: DialogUXStateAggregatorInterface.Listener {
    override fun onDialogUXStateChanged(newState: DialogUXState, dialogMode: Boolean, chips: RenderDirective.Payload?, sessionActivated: Boolean) {
        ...
    }
}
nuguAndroidClient.addDialogUXStateListener(listener)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
DialogStateDelegate 를 추가합니다.

{% code %}
```swift
class MyDialogStateDelegate: DialogStateDelegate {
    func dialogStateDidChange(_ state: DialogState, isMultiturn: Bool, chips: [ChipsAgentItem.Chip]?, sessionActivated: Bool) {
        ...
    }
}
dialogStateAggregator.add(delegate: MyDialogStateDelegate())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
IChipsListener를 추가합니다.

{% code %}
```cpp
class ChipsListener : public IChipsListener {
public:
    ...

    void onReceiveRender(ChipsInfo&& chips_info) override
    {
        ...
    }
};
auto chips_listener(std::make_shared<IChipsListener>());
CapabilityFactory::makeCapability<ChipsAgent, IChipsHandler>(chips_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Chips": {
    "version": "1.2"
  }
}
```
{% endcode %}

## Directives

### Render

{% code %}
```json
{
  "header": {
    "namespace": "Chips",
    "name": "Render",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "target": "{{STRING}}",
    "chips": [
      {
        "type": "{{STRING}}",
        "text": "{{STRING}}",
        "token": "{{STRING}}"
      }
    ]
  }
}
```
{% endcode %}

| parameter   | type   | mandatory | description                                                                                                                                                             |
|:------------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| target      | string | Y         | **DM** : ASR.ExpectSpeech, Session.Set 와 같이 전달되는 발화가이드<br/>**LISTEN** : Session.Set 없이 ASR.ExpectSpeech 발생 시 LISTEN 을 사용<br/>**SPEAKING** : TTS.Speak 와 함께 제공되는 발화 가이드  |
| chips       | list   | Y         | 발화 가이드 목록                                                                                                                                                               |
| chips.type  | string | Y         | **ACTION** : 보이스크롬 가이드의 '액션버튼'으로 기능 단위의 동작 처리를 위한 발화 가이드.<br/>**GENERAL** : 기본 발화 가이드<br/>**NUDGE** : 넛지 발화 가이드                                                         |
| chips.text  | string | Y         | 버튼 텍스트<br/>- Text.TextInput event 를 보내기 위한 텍스트 명령 문자열                                                                                                                   |
| chips.token | string | N         | Text.TextInput event 의 출처를 구분하기 위한 값                                                                                                                                    |
