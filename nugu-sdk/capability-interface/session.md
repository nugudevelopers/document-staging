---
depth_order: 16
description: Play 와 Client 간의 세션을 유지하기 위한 규격
---

# Session

## Version

최신 버전은 1.0 입니다.

| Version | Date       | Description |
|:--------|:-----------|:------------|
| 1.0     | 2020.06.05 | 규격 추가       |

## SDK Interface

#### SessionAgent 사용

Session interface 규격에 따른 디바이스의 동작 제어는 SessionAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 SessionAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val sessionAgent = nuguAndroidClient.getAgent(SessionAgent.NAMESPACE)
```
{% endcode %}

보이스 크롬 UI 구성을 위해 TTS interface, ASR interface, Chips interface, Session interface 를 병합해주는 DialogUXStateAggregator 를 제공합니다.
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 SessionAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let sessionAgent = nuguClient.sessionAgent
```
{% endcode %}

보이스 크롬 UI 구성을 위해 TTS interface, ASR interface, Chips interface, Session interface 를 병합해주는 DisplayStateAggregator 를 제공합니다.

NuguClient instance 를 통해 DialogStateAggregator instance 에 접근할 수 있습니다.

{% code %}
```swift
let dialogStateAggregator = nuguClient.dialogStateAggregator
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [SessionAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1IAudioPlayerHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto session_handler(std::shared_ptr<ISessionHandler>(
        CapabilityFactory::makeCapability<SessionAgent, ISessionHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(session_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 세션 상태 정보

세션 유지상태 정보를 확인할 수 있습니다.

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
[ISessionListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1IAudioPlayerListener.html) 를 추가합니다.

{% code %}
```cpp
class MySessionListener : public ISessionListener {
public:
    ...

    void onState(SessionState state, const std::string& dialog_id) override
    {
        ...
    }

    ...
};
auto session_listener(std::make_shared<MySessionListener>());
CapabilityFactory::makeCapability<SessionAgent, ISessionHandler>(session_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Session": {
    "version": "1.1",
    "list": [
      {
        "sessionId": "{{STRING}}",
        "playServiceId": "{{STRING}}"
      }
    ]
  }
}
```
{% endcode %}

| parameter          | type   | mandatory | description         |
|:-------------------|:-------|:----------|:--------------------|
| list               | array  | N         | 현재 활성화 되어 있는 세션 리스트 |
| list.sessionId     | string | Y         | -                   |
| list.playServiceId | string | Y         | -                   |

## Directives

### Set

{% code %}
```json
{
  "Session": {
    "namespace": "Session",
    "name": "Set",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "sessionId": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description |
|:----------|:-------|:----------|:------------|
| sessionId | string | Y         |             |

