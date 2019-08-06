---
depth_order: 11
description: 디바이스의 마이크를 제어하기 위한 규격
---

# Mic

## Version

최신 버전은 1.0 입니다.

| Version | Date       | Description |
|:--------|:-----------|:------------|
| 1.0     | 2020.03.02 | 규격 추가       |

## SDK Interface

### MicAgent 사용

Mic interface 규격에 따른 디바이스의 동작 제어는 MicAgent 가 처리합니다.

{% alerts style="warning" %}
iOS 는 MicAgent 를 지원하지 않습니다.
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 MicrophoneAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val microphoneAgent = nuguAndroidClient.getAgent(DefaultMicrophoneAgent.NAMESPACE)
```
{% endcode %}

NuguAndroidClient 생성시 Microphone 을 추가합니다.

{% code %}
```kotlin
class MyMicrophone: Microphone {
    ...
}
NuguAndroidClient.Builder(...)
    .enableMicrophone(MyMicrophone())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [MicAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1IMicHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto mic_handler(std::shared_ptr<IMicHandler>(
        CapabilityFactory::makeCapability<MicAgent, IMicHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(mic_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성

디바이스의 microphone 상태를 [Context](#context) 에 포함시켜 주어야 합니다.

{% tabs %}
{% tabs::content title="Android" %}
Microphone 을 구현합니다.

{% code %}
```kotlin
class MyMicrophone: Microphone {
    override fun getSettings(): Settings {
        ...
    }
    ...
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Microphone 제어

디바이스의 microphone 제어가 [SetMic](#setmic) directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
Microphone 을 구현합니다.

{% code %}
```kotlin
class MyMicrophone: Microphone {
    override fun on(): Boolean {
        ...
    }

    override fun off(): Boolean {
        ...
    }

    ...
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[IMicListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1IMicListener.html) 를 추가합니다.

{% code %}
```cpp
class MyMicListener : public IMicListener {
public:
    ...

    void micStatusChanged(MicStatus &status) override
    {
        ...
    }
};
auto mic_listener(std::make_shared<MyMicListener>());
CapabilityFactory::makeCapability<MicAgent, IMicHandler>(mic_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Mic": {
    "version": "1.0",
    "micStatus": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description |
|:----------|:-------|:----------|:------------|
| micStatus | string | Y         | ON / OFF    |

## Directive

### SetMic

{% code %}
```json
{
  "header": {
    "namespace": "Mic",
    "name": "SetMic",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "status": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description |
|:----------|:-------|:----------|:------------|
| status    | string | Y         | ON / OFF    |
