---
depth_order: 8
description: 정의되지 않은 기능을 수행하기 위한 규격
---

# Extension

## Version

최신 버전은 1.1 입니다.

| Version | Date       | Description           |
|:--------|:-----------|:----------------------|
| 1.0     | 2019.11.24 | 규격 추가                 |
| 1.1     | 2020.01.08 | CommandIssued event 추 |

## Precondition

Extension interface 를 사용한 Play 를 제작하기 위해서는 제휴담당자에게 요청하여 권한을 획득해야 합니다.

Play 개발자와 Application 개발자는 Context, Directive, Event 의 data 필드에 대한 데이터 구조를 협의해야 합니다.

## SDK Interface

### ExtensionAgent 사용

Extension interface 규격에 따른 디바이스의 동작 제어는 ExtensionAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 ExtensionAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val extensionAgent = nuguAndroidClient.extensionAgent
```
{% endcode %}

NuguAndroidClient 생성시 ExtensionAgentInterface.Client 를 추가합니다.

{% code %}
```kotlin
class MyExtensionAgentClient: ExtensionAgentInterface.Client {
    ...
}
NuguAndroidClient.Builder(...)
    .enableExtension(MyExtensionAgentClient())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 ExtensionAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let extensionAgent = nuguClient.extensionAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
CapabilityFactory::makeCapability 함수로 ExtensionAgent 를 생성하고 NuguClient 에 추가해 주어야합니다.

{% code %}
```cpp
auto extension_handler(std::shared_ptr<IExtensionHandler>(
        CapabilityFactory::makeCapability<ExtensionAgent, IExtensionHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(extension_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성 및 기능 실행

Play 에서 알아야 하는 디바이스/Application 의 정보를 [Context](#context) 에 포함시켜 주어야 합니다.

특정 기능의 실행이 [Action](#action) directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
ExtensionAgentInterface.Client 를 구현합니다.

{% code %}
```kotlin
class MyExtensionAgentClient : ExtensionAgentInterface.Client {
    override fun getData(): String? {
        // json string
        ...
    }

    override fun action(data: String, playServiceId: String): Boolean {
        ...
    }
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
ExtensionAgentDelegate 를 추가합니다.

{% code %}
```swift
class MyExtensionAgentDelegate: ExtensionAgentDelegate {
    func extensionAgentRequestContext() -> [String: AnyHashable]? {
        ...
    }

    func extensionAgentDidReceiveAction(data: [String: AnyHashable], playServiceId: String, dialogRequestId: String, completion: @escaping (Bool) -> Void) {
        ...
    }
}
extensionAgent.delegate = MyExtensionAgentDelegate()
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
IExtensionListener를 추가합니다.

{% code %}
```cpp
class ExtensionListener : public IExtensionListener {
public:
    ...

    void receiveAction(const std::string& data, const std::string& ps_id, const std::string& dialog_id) override
    {
        ...
    }
};
auto extension_listener(std::make_shared<ExtensionListener>());
CapabilityFactory::makeCapability<ExtensionAgent, IExtensionHandler>(extension_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 기능 요청

특정 기능 실행을 [CommandIssued](#commandissued) event 로 요청할 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
{% code %}
```kotlin
extensionAgent.issueCommand(playServiceId, data, callback)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
{% code %}
```swift
extentionAgent.requestCommand(data: data, playServiceId: playServiceId)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
```cpp
extension_handler->commandIssued(play_service_id, data)
```
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Extension": {
    "version": "1.1",
    "data": {}
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description     |
|:----------|:-------|:----------|:----------------|
| data      | object | N         | 임의의 JSON object |

## Directive

### Action

{% code %}
```json
{
  "header": {
    "namespace": "Extension",
    "name": "Action",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "data": {}
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description     |
|:----------|:-------|:----------|:----------------|
| data      | object | Y         | 임의의 JSON object |

## Event

### ActionSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "Extension",
    "name": "ActionSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

### ActionFailed

{% code %}
```json
{
  "header": {
    "namespace": "Extension",
    "name": "ActionFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

### CommandIssued

{% code %}
```json
{
  "header": {
    "namespace": "Extension",
    "name": "CommandIssued",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "data": {}
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description     |
|:----------|:-------|:----------|:----------------|
| data      | object | Y         | 임의의 JSON object |
