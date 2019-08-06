---
depth_order: 6
description: 텍스트 명령을 Play 로 전달하기 위한 규격
---

# Text

## Version

최신 버전은 1.7 입니다.

| Version | Date       | Description                                                                               |
|:--------|:-----------|:------------------------------------------------------------------------------------------|
| 1.0     | 2019.11.24 | 규격 추가                                                                                     |
| 1.1     | 2020.03.23 | TextInput event 에 asrContext 필드 추가                                                        |
| 1.2     | 2020.06.05 | TextInput event 의 sessionId 필드 삭제<br/>TextInput event 의 asrContext 에 playServiceId 필드 추가  |
| 1.3     | 2020.09.02 | TextSource 에 playServiceId 추가                                                             |
| 1.4     | 2020.11.13 | TextRedirect directive 추가                                                                 |
| 1.5     | 2020.11.30 | TextSourceFailed, TextRedirectFailed event 추가                                             |
| 1.6     | 2021.12.09 | ExpectTyping Directive 추가                                                                 |
| 1.7     | 2022.04.05 | TextInput 이벤트에 source 필드 추가                                                               |

## SDK Interface

### TextAgent 사용

Text interface 규격에 따른 디바이스의 동작 제어는 TextAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 TextAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val textAgent = nuguAndroidClient.textAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 TextAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let textAgent = nuguClient.textAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [TextAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ITextHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto text_handler(std::shared_ptr<ITextHandler>(
        CapabilityFactory::makeCapability<TextAgent, ITextHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(text_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 텍스트 명령

임의의 텍스트 명령을 [TextInput](#textinput) event 로 요청할 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
{% code %}
```kotlin
textAgent.requestTextInput(text)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
{% code %}
```swift
textAgent.requestTextInput(text: textInput, requestType: .normal)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
{% code %}
```cpp
text_handler->requestTextInput(text)
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Text": {
    "version": "1.5"
  }
}
```
{% endcode %}

## Directive

### TextSource

* 외부 시스템에서 Device Gateway를 사용하여 직접 연동하는 경우에만 사용

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextSource",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "text": "{{STRING}}",
    "token": "{{STRING}}",
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter     | type   | mandatory | description                                                                                                                                                                                              |
|:--------------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text          | string | Y         | 디바이스로 전달한 뒤 context를 추가하여 다시 Device Gateway로 전송해야 하는 text                                                                                                                                                |
| token         | string | Y         | 전송하는 text를 식별하기 위한 unique string                                                                                                                                                                         |
| playServiceId | string | N         | 값이 존재하면 TextInput의 playServiceId 값을 설정하는데 사용 ASR.ExpectSpeech 보다 우선하여 동작 함.<br/>(TextSource 에 playServiceId 가 있는 경우 ASR.ExpecSpeech 에서 받은 playServiceId, domainTypes, asrContext 를 TextInput 으로 전달하지 않음) |

### TextRedirect

Play에서 다른 Play로 처리를 넘기는데, 특정 Text를 전달해서 실행하고자 하는 경우에 사용

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextRedirect",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "text": "{{STRING}}",
    "token": "{{STRING}}",
    "playServiceId": "{{STRING}}",
    "targetPlayServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter           | type   | mandatory | description                                                                                                                                                                                                                                                               |
|:--------------------|:-------|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text                | string | Y         | 디바이스로 전달한 뒤 context를 추가하여 다시 Device Gateway로 전송해야 하는 text                                                                                                                                                                                                                 |
| token               | string | Y         | 전송하는 text를 식별하기 위한 unique string                                                                                                                                                                                                                                          |
| playServiceId       | string | Y         | 디렉티브를 지시한 PlayServiceId (Play에서 NPK 통한 응답일때는 라우터가 알아서 채워줌)                                                                                                                                                                                                                |
| targetPlayServiceId | string | N         | 값이 존재하면 TextInput의 playServiceId 값을 설정하는데 사용 명확히 라우팅되어야 하는 Play를 지정하는 경우에 사용되고, 지정하지 않으면 라우팅 로직에 의해 라우팅 ASR.ExpectSpeech 보다 우선하여 동작 함.<br/>(TextRedirect에 targetPlayServiceId가 있는 경우 ASR.ExpecSpeech 에서 받은 playServiceId, domainTypes, asrContext 를 TextInput 으로 전달하지 않음) |

### ExpectTyping

Text input을 했을때 멀티턴 Play로 강제 라우팅 할 때 사용

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextSource",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "domainTypes": [],
    "asrContext": {
      "task": "{{STRING}}",
      "sceneId": "{{STRING}}",
      "sceneText": [
        "{{STRING}}"
      ],
      "playServiceId" : "playServiceId"
    }
  }
}
```
{% endcode %}

| parameter                | type           | mandatory  | description                                                                                     |
|--------------------------|----------------|------------|-------------------------------------------------------------------------------------------------|
| playServiceId            | string         | N          | 값이 존재하면 이후 입력하는 TextInput 이벤트의 playServiceId 값을 설정하는데 사용                                        |
| domainTypes              | string         | N          | TextInput 이벤트로 입력되는 text 분석 시 NLU에서 사용할 domainType 셋팅 정보(ASR.ExpectSpeech의 domainTypes와 동일한 용도) |
| asrContext               | object         | N          | ExpectTyping directive 수신 후 ASR.Recognize 이벤트 발생 시 포함 되어야 함                                     |
| asrContext.task          | string         | N          | -                                                                                               |
| asrContext.sceneId       | string         | N          | -                                                                                               |
| asrContext.playServiceId | string         | N          | -                                                                                               |
| asrContext.sceneText     | Array\<string> | N          | -                                                                                               |

## Events

### TextInput

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextInput",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "text": "{{STRING}}",
    "token": "{{STRING}}",
    "sessionId": "{{STRING}}",
    "playServiceId": "{{STRING}}",
    "domainTypes": [
      "{{STRING}}"
    ],
    "source" : "{{STRING}}"
  }
}
```
{% endcode %}

| parameter     | type            | mandatory | description                                                                                                                                                                                                  |
|:--------------|:----------------|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text          | string          | Y         | TextSource directive 에서 전달한 text 디바이스에서 생성한 임의의 text                                                                                                                                                         |
| token         | string          | N         | TextSource에 의해 생성된 이벤트인 경우 TextSource의 token을 그대로 사용<br/>Chips interface, Display interface, Routine interface 에 의해 생성된 이벤트의 경우 해당 directive 에서 전달받은 token 을 사용<br/>디바이스에서 생성된 text는 임의의 값을 갖거나 필드를 갖지 않아도 됨 |
| playServiceId | string          | N         | ASR/Display/Routine/Text interface 에 의해 생성된 이벤트의 경우 해당 directive 에서 전달받은 playServiceId 를 사용                                                                                                                  |
| domainTypes   | array of string | N         | ExpectSpeech에 의한 발화인 경우에만 ExpectSpeech에서 받은 domainTypes를 적용                                                                                                                                                  |
| source        | string          | N         | TextInput을 유발한 원인에 대한 정보 값                                                                                                                                                                           |

### TextSourceFailed

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextSourceFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description            |
|:----------|:-------|:----------|:-----------------------|
| token     | string | Y         | TextSource에서 정의한 token |
| errorCode | string | Y         | NOT_SUPPORTED_STATE    |

### TextRedirectFailed

{% code %}
```json
{
  "header": {
    "namespace": "Text",
    "name": "TextRedirectFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description            |
|:----------|:-------|:----------|:-----------------------|
| token     | string | Y         | TextSource에서 정의한 token |
| errorCode | string | Y         | NOT_SUPPORTED_STATE    |

