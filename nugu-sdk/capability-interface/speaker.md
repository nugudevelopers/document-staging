---
depth_order: 9
description: 디바이스의 볼륨을 제어하기 위한 규격
---

# Speaker

## Version

최신 버전은 1.2 입니다.

| Version | Date       | Description                                                             |
|:--------|:-----------|:------------------------------------------------------------------------|
| 1.0     | 2020.03.13 | 규격 추가                                                                   |
| 1.1     | 2020.06.22 | Context 의 volumes.name 목록 변경                                            |
| 1.2     | 2020.06.26 | Context 에 defaultVolumeLevel 필드 추가<br/>Context 의 volumnes 에 group 필드 추가 |

## SDK Interface

### SpeakerAgent 사용

Speaker interface 규격에 따른 디바이스의 동작 제어는 SpeakerAgent 가 처리합니다.

{% alerts style="warning" %}
iOS 는 SpeakerAgent 를 지원하지 않습니다.
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 SpeakerAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val speakerAgent = nuguAndroidClient.getAgent(DefaultSpeakerAgent.NAMESPACE)
```
{% endcode %}

NuguAndroidClient 에 볼륨 제어를 위한 기본 Speaker 구현이 포함되어 있습니다.

Speaker 을 직접 구현하려면 NuguAndroidClient 생성시 SpeakerFactory 를 추가합니다.

{% code %}
```kotlin
class MySpeaker: Speaker {
    ...
}
NuguAndroidClient.Builder(...)
    .speakerFactory(object : SpeakerFactory {
        override fun createNuguSpeaker(): Speaker? = MySpeaker()

        override fun createAlarmSpeaker(): Speaker? = MySpeaker()

        override fun createCallSpeaker(): Speaker? = MySpeaker()

        override fun createExternalSpeaker(): Speaker? = MySpeaker()

        override fun createSpeaker(type: Speaker.Type): Speaker? {
            return when (type) {
                Speaker.Type.NUGU -> MySpeaker()
                Speaker.Type.ALARM -> MySpeaker()
                else -> MySpeaker()
            }
        }
    })
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [SpeakerAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISpeakerHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto speaker_handler(std::shared_ptr<ISpeakerHandler>(
        CapabilityFactory::makeCapability<SpeakerAgent, ISpeakerHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(speaker_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성

Play 에서 디바이스의 볼륨을 제어하기 위해서는 디바이스의 볼륨 정보를 [Context](#context) 에 포함시켜 주어야 합니다.

{% tabs %}
{% tabs::content title="Android" %}
각 Speaker.Type 의 Speaker 를 구현합니다.

{% code %}
```kotlin
class MySpeaker: Speaker {
    override fun getSpeakerSettings(): Speaker.SpeakerSettings? {
        ...
    }
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[SpeakerType](https://nugu-developers.github.io/nugu-linux/group__SpeakerInterface.html#ga8601f6be80368c9d1a7c7b346c99a698) 의 [SpeakerInfo](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1SpeakerInfo.html) 를 설정합니다.

{% code %}
```cpp
speaker_handler->setSpeakerInfo(speakers)
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 볼륨 제어

디바이스의 볼륨 제어가 [SetVolume](#setvolume) directive 로 요청될 수 있습니다.

디바이스의 볼륨 음소거 제어가 [SetMute](#setmute) directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
Speaker 를 구현합니다.

{% code %}
```kotlin
class MySpeaker: Speaker {
    override fun setVolume(volume: Int, rate: Rate = Rate.FAST): Boolean {
        ...
    }

    override fun setMute(mute: Boolean): Boolean {
        ...
    }

    ...
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ISpeakerListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISpeakerListener.html) 를 추가합니다.

{% code %}
```cpp
class MySpeakerListener : public ISpeakerListener {
public:
    ...

    void requestSetMute(const std::string &ps_id, SpeakerType type, bool mute) override
    {
        ...
    }

    void requestSetVolume(const std::string &ps_id, SpeakerType type, int volume, bool linear) override
    {
        ...
    }
};
auto speaker_listener(std::make_shared<MySpeakerListener>());
CapabilityFactory::makeCapability<SpeakerAgent, ISpeakerHandler>(speaker_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Speaker": {
    "version": "1.0",
    "volumes": [
      {
        "name": "{{STRING}}",
        "group": "{{STRING}}",
        "volume": {{LONG}},
        "minVolume": {{LONG}},
        "maxVolume": {{LONG}},
        "defaultVolumeStep": {{LONG}},
        "defaultVolumeLevel": {{LONG}},
        "muted": {{BOOLEAN}}
      }
    ]
  }
}
```
{% endcode %}

| parameter                   | type            | mandatory | description                                                                                                                                                                                                                                                                         |
|:----------------------------|:----------------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| volumes                     | array of object | N         | 볼륨 조절 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                               |
| volumes.name                | string          | Y         | NUGU(MUSIC+VOICE_COMMAND)<br/>MUSIC<br/>RINGTONE<br/>CALL<br/>NOTIFICATION<br/>ALARM<br/>VOICE_COMMAND<br/>NAVIGATION<br/>SYSTEM_SOUND<br/>Reference: [https://source.android.com/devices/audio/attributes\#contexts](https://source.android.com/devices/audio/attributes#contexts) |
| volumes.group               | string          | N         | volume의 group 값으로 영문자와 숫자를 이용하여 구성할 수 있음.(Play에서는 group 값을 mapping하여 TTS를 만들 때 사용할 수 있음) grouping 되어 있지 않은 경우는 전달하지 않음 Reference: [https://source.android.com/devices/automotive/audio\#volume-and-groups](https://source.android.com/devices/automotive/audio#volume-and-groups)   |
| volumes.volume              | long            | N         | 현재 설정된 볼륨 볼륨 조절 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                     |
| volumes.minVolume           | long            | N         | 설정 가능한 최대 볼륨 볼륨 조절 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                  |
| volumes.maxVolume           | long            | N         | 설정 가능한 최소 볼륨 볼륨 조절 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                  |
| volumes.defaultVolumeStep   | long            | N         | 기본 볼륨 단계 볼륨 조절 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                      |
| volumnes.defaultVolumeLevel | long            | N         | 기본 볼륨 값 볼륨 조절 불가한 경우는 전달하지 않음 version 1.2 이전에서는 전달하지 않음                                                                                                                                                                                                                             |
| volumes.muted               | boolean         | N         | 음소거 상태 음소거 설정이 불가한 경우는 전달하지 않음                                                                                                                                                                                                                                                      |

## Directive

### SetVolume

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetVolume",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "rate": "{{STRING}}",
    "volumes": [
      {
        "name": "{{STRING}}",
        "volume": {{LONG}}
      }
    ]
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                 |
|:----------|:-------|:----------|:----------------------------------------------------------------------------|
| name      | string | Y         | Context 참조                                                                  |
| rate      | string | N         | SLOW, FAST<br/>- SLOW: 점진적으로 변경 (max 값으로 설정하는 시나리오에서 사용)<br/>- FAST : 바로 변경 |
| volume    | long   | Y         | 설정할 volume                                                                  |

### SetMute

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetVolume",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "rate": "{{STRING}}",
    "volumes": [
      {
        "name": "{{STRING}}",
        "mute": {{BOOLEAN}}
      }
    ]
  }
}
```
{% endcode %}

| parameter | type    | mandatory | description  |
|:----------|:--------|:----------|:-------------|
| name      | string  | Y         | Context 참조   |
| mute      | boolean | Y         | true / false |

## Event

### SetVolumeSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetVolumeSucceeded",
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

### SetVolumeFailed

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetVolumeFailed",
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

### SetMuteSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetMuteSucceeded",
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

### SetMuteFailed

{% code %}
```json
{
  "header": {
    "namespace": "Speaker",
    "name": "SetMuteFailed",
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
