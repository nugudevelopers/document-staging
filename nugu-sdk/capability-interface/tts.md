---
depth_order: 4
description: 음성 합성 결과를 전달받기 위한 규격
---

# TTS

## Version

최신 버전은 1.3 입니다.

| Version | Date       | Description                                                 |
|:--------|:-----------|:------------------------------------------------------------|
| 1.0     | 2019.11.24 | 규격 추가                                                       |
| 1.1     | 2020.03.23 | Stop directive 에서 token 필드 삭제                               |
| 1.2     | 2020.06.05 | Context 에 token 필드 추가                                       |
| 1.3     | 2020.11.09 | SpeechStarted, SpeechStopped, SpeechFinished event 전송 규칙 수정 |

## SDK Interface

### TTSAgent 사용

TTS interface 규격에 따른 디바이스의 동작 제어는 TTSAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 TTSAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val ttsAgent = nuguAndroidClient.ttsAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 TTSAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let ttsAgent = nuguClient.ttsAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [TTSAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ITTSHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto tts_handler(std::shared_ptr<ITTSHandler>(
        CapabilityFactory::makeCapability<TTSAgent, ITTSHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(tts_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 재생 상태 정보

[Speak](#speak) directive 로 전달된 음원에 대한 재생 상태를 모니터링 할 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
TTSAgentInterface.Listener 를 추가합니다.

{% code %}
```kotlin
val listener = object: TTSAgentInterface.Listener {
    override fun onStateChanged(state: State, dialogRequestId: String) {
        ...
    }

    ...
}
ttsAgent.addListener(listener)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
TTSAgentDelegate 를 추가합니다.

{% code %}
```swift
class MyTTSAgentDelegate: TTSAgentDelegate {
    func ttsAgentDidChange(state: TTSState, dialogRequestId: String) {
        ...
    }

    ...
}
ttsAgent.add(delegate: MyTTSAgentDelegate())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ITTSListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ITTSListener.html) 를 추가합니다.

{% code %}
```cpp
class MyTTSListener : public ITTSListener {
public:
    ...

    void onTTSState(TTSState state, const std::string &dialog_id) override
    {
        ...
    }

    ...
};
auto tts_listener(std::make_shared<MyTTSListener>());
CapabilityFactory::makeCapability<TTSAgent, ITTSHandler>(tts_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "TTS": {
    "version": "1.2",
    "ttsActivity": "{{STRING}}",
    "engine": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter   | type   | mandatory | description                                                                                                                         |
|:------------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------|
| ttsActivity | string | Y         | TTS 재생 상태<br/>**IDLE**<br/>**PLAYING**<br/>**PAUSED**<br/>**FINISHED**<br/>**STOPPED**<br/>IDLE인 경우는 최초 전원을 켰을 때만 가능하고 이후에는 나올 수 없음 |
| engine      | string | N         | Device 에서 사용하는 음성합성 engine 을 명시 NUGU 음성합성 engine 을 사용하는 경우 "skt" (값을 채우지 않으면 default "skt")                                         |
| token       | string | N         | 현재 재생중인 TTS 의 token                                                                                                                 |

## Directive

### Speak

새로운 TTS 재생 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "TTS",
    "name": "Speak",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "sourceType": "{{STRING}}",
    "format": "{{STRING}}",
    "text": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter  | type   | mandatory | description                             |
|:-----------|:-------|:----------|:----------------------------------------|
| sourceType | string | N         | URL or ATTACHMENT(default 는 ATTACHMENT) |
| format     | string | Y         | **TEXT** or **SKML**                    |
| text       | string | Y         | tts text                                |
| token      | string | Y         | 현재 TTS를 식별하기 위한 unique string           |

### Stop

현재 TTS 중지 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "TTS",
    "name": "Stop",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

## Event

### SpeechStarted

{% code %}
```json
{
  "header": {
    "namespace": "TTS",
    "name": "SpeechStarted",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                  |
|:----------|:-------|:----------|:-----------------------------|
| token     | string | Y         | TTS.Speak 디렉티브에서 설정한 token 값 |

### SpeechFinished

{% code %}
```json
{
  "header": {
    "namespace": "TTS",
    "name": "SpeechFinished",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                  |
|:----------|:-------|:----------|:-----------------------------|
| token     | string | Y         | TTS.Speak 디렉티브에서 설정한 token 값 |

### SpeechStopped

{% code %}
```json
{
  "header": {
    "namespace": "TTS",
    "name": "SpeechStopped",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                  |
|:----------|:-------|:----------|:-----------------------------|
| token     | string | Y         | TTS.Speak 디렉티브에서 설정한 token 값 |

