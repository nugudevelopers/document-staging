---
depth_order: 14
description: 디바이스의 음원 파일 재생을 위한 규격
---

# Sound

## Version

최신 버전은 1.0 입니다.

| Version | Date       | Description |
|:--------|:-----------|:------------|
| 1.0     | 2020.04.01 | 규격 추가       |

## SDK Interface

### SoundAgent 사용

Sound interface 규격에 따른 디바이스의 동작 제어는 SoundAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 SoundAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val soundAgent = nuguAndroidClient.getAgent(DefaultSoundAgent.NAMESPACE)
```
{% endcode %}

NuguAndroidClient 생성시 SoundProvider 를 추가합니다.

{% code %}
```kotlin
class MySoundProvider: SoundProvider {
    ...
}
NuguAndroidClient.Builder(...)
    .enableSound(MySoundProvider())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 SoundAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let soundAgent = nuguClient.soundAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [SoundAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISoundHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto sound_handler(std::shared_ptr<ISoundHandler>(
        CapabilityFactory::makeCapability<SoundAgent, ISoundHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(sound_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 재생

디바이스 음원 재생이 [Beep](#beep) directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
SoundProvider 를 구현합니다.

{% code %}
```kotlin
class MySoundProvider: SoundProvider {
    override fun getContentUri(name: SoundProvider.BeepName): URI {
        return URI.create(
            Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + context.packageName + "/" + R.raw.responsefa
                .toString()
        );
    }
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
SoundAgentDelegate 를 추가합니다.

{% code %}
```swift
class MySoundAgentDelegate: SoundAgentDelegate {
    func soundAgentDidChange(state: SoundState, dialogRequestId: String) {
        ...
    }
}
soundAgent.delegate = MySoundAgentDelegate()
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ISoundListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISoundListener.html) 를 추가합니다.

{% code %}
```cpp
class MySoundListener : public ISoundListener {
public:
    ...

    void handleBeep(BeepType beep_type) override
    {
        ...
    }
};
auto sound_listener(std::make_shared<MySoundListener>());
CapabilityFactory::makeCapability<SoundAgent, ISoundHandler>(sound_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Sound": {
    "version": "1.0"
  }
}
```
{% endcode %}

## Directives

### Beep

Beep 유형의 음원 재생 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "Sound",
    "name": "Beep",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "beepName": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description               |
|:----------|:-------|:----------|:--------------------------|
| beepName  | string | Y         | RESPONSE_FAIL: Play 응답 실패 |

## Event

### BeepSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "Sound",
    "name": "BeepSucceeded",
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

### BeepFailed

{% code %}
```json
{
  "header": {
    "namespace": "Sound",
    "name": "BeepFailed",
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
