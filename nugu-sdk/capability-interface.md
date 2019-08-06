---
depth_order: 5
---

# Capability Interface

## Capability Interface

Capability Interface 는 Play 에서 디바이스의 기능을 제어하기 위한 규격으로 Event, Directive, Context 등으로 구성되어 있으며, Play 에서 제공하려는 기능에 따라 여러개의 Capability Interface 를 조합하여 디바이스로 전달할 수 있습니다.

### 공통 파라미터

Capability Interface 규격에서 공통적으로 사용되는 파라미터입니다.

* namespace: Capability Interface 의 이름입니다.
* name: Directive 또는 Event 의 이름입니다.
* messageId: 하나의 Directive 또는 Event 를 구분하기 위한 id 입니다.
* dialogRequestId: Event 와 Directive 를 mapping 하기 위한 id 입니다. 하나의 요청(Event) 과 응답(Directive) 은 동일한 dialogRequestId 를 가집니다.
* playServiceId: Play 의 고유 id 값입니다. Directive 또는 Event 에 포함되어 있습니다.
* version: Capability Interface 의 버전입니다.

## Capability Agent

Capability Interface 의 규격에서 정의하는 기능을 제공하기 위해 Capability Interface 와 1:1 로 매핑되는 Capability Agent 가 구현되어 있습니다.

Capability Agent 에서 미디어 재생과 같은 기능은 직접 실행하지만, UI 구성과 같이 직접 실행할 수 없는 기능을 Application 에 위임합니다.

## Event

디바이스에서 서버로 전달되는 JSON 형식의 데이터로 JSON 구조는 각 각의 Capability Interface 에 정의되어 있습니다.

## Directive

서버에서 디바이스로 전달되는 JSON 형식의 데이터로 JSON 구조는 각 각의 Capability Interface 에 정의되어 있습니다.

Event 요청에 대한 응답값으로 1개 이상의 Directive 가 전달됩니다.

## Context

Capability Agent 의 현재 상태를 의미하는 데이터로 Event 와 함께 서버로 전달됩니다.

### 구조

{% code %}
```json
{
  "supportedInterfaces": {
    "{{STRING}}": {}
  },
  "client": {
    "os": "{{STRING}}",
    "wakeupWord": "{{STRING}}",
    "playStack": [
      "{{STRING}}"
    ]
  }
}
```
{% endcode %}

| parameter                   | type             | mandatory  | description                        |
|-----------------------------|------------------|------------|------------------------------------|
| supportedIntefacaces        | map              | Y          | Capability interface 의 Context 정보  |
| supportedIntefacaces.key    | string           | N          | Capability interface 의 이름          |
| supportedIntefacaces.value  | Object           | N          | Capability interface 의 Context     |
| client                      | map              | Y          | 클라이언트의 컨텍스트 정보                     |
| client.os                   | string           | N          | Android, iOS, Linux                |
| client.wakeupWord           | string           | N          | 아리아, 팅커벨 클라이언트에 설정된 wakeup word    |
| client.playStack            | array of string  | N          | 클라이언트에서 실행중인 playServiceId 목록      |

### supportedInterfaces 전송 규칙

* ASR.Recognize, Text.TextInput, System.SynchronizeState, Display.ElementSelected event
  * 전체 capability interface 의 context
* 그 외 event
  * 해당 capability interface 의 context
  * 다른 capability interface 의 context 중 version 만 포함

## Platform 에 따른 지원 현황 <a id="platform"></a>

2022-01-12 기준

| Capability interface | Description           | Android | iOS                           | Linux       |
|----------------------|-----------------------|---------|-------------------------------|-------------|
| AudioPlayer          | 음악 재생                 | 지원      | 지원                            | 지원          |
| Display              | UI template data 제공   | 지원      | 지원                            | 지원          |
| System               | 디바이스 전원 제어 네트워크 연결 제어 | 지원      | 일부지원(디바이스 전원 제어는 플랫폼 특성상 미지원) | 지원          |
| TTS                  | TTS 재생                | 지원      | 지원                            | 지원          |
| ASR                  | 사용자 음성 인식             | 지원      | 지원                            | 지원          |
| Text                 | 텍스트 명령 수행             | 지원      | 지원                            | 지원          |
| Location             | 위치 정보 수집              | 지원      | 지원                            | 플랫폼 특성상 미지원 |
| Extension            | 확장 기능 수행              | 지원      | 지원                            | 지원          |
| Speaker              | 볼륨 제어                 | 지원      | 플랫폼 특성상 미지원                   | 지원          |
| Bluetooth            | 블루투스 제어               | 지원      | 플랫폼 특성상 미지원                   | 플랫폼 특성상 미지원 |
| Mic                  | 마이크 장치 제어             | 지원      | 플랫폼 특성상 미지원                   | 지원          |
| Screen               | 디스플레이 장치 제어           | 지원      | 플랫폼 특성상 미지원                   | 플랫폼 특성상 미지원 |
| Battery              | 배터리 정보 수집             | 지원      | 추후 지원 예정                      | 미지원         |
| Sound                | Beep 음 재생             | 지원      | 지원                            | 지원          |
| Chips                | 발화 가이드 제공             | 지원      | 지원                            | 지원          |
| Session              | 음성 인식 세션 제어           | 지원      | 지원                            | 지원          |
| PhoneCall            | 통화 기능 제어              | 지원      | 지원                            | 지원          |
| Message              | 문자 기능 제어              | 지원      | 지원                            | 지원          |
| MediaPlayer          | 음악 앱 제어               | 지원      | 지원                            | 미지원         |
| Routine              | 루틴 실행                 | 지원      | 지원                            | 지원          |
| Utility              | Directive 실행 순서 제어    | 지원      | 지원                            | 지원          |
