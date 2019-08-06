---
depth_order: 3
---

# Backend proxy API Reference

## Request sample

{% code %}
```bash
POST /action_name HTTP/1.1
Accept: application/json, */*
Content-Length: 400
Content-Type: application/json
Host: builder.open.co.kr
Authorization: token TOKEN_STRING
```
{% endcode %}

{% code %}

```json
{
  "version": "2.0",
  "action": {
    "actionName": "{{string}}",
    "parameters": {
      KEY: {
        "type": "{{string}}",
        "value": VALUE
      }
    }
  },
  "event": {
    "type": "{{string}}"
  },
  "context": {
    "session": {
      "accessToken": "{{string}}"
    },
    "device": {
      "type": "{{string}}",
      "state": {
        KEY: VALUE
      }
    },
    "supportedInterfaces": {
      "AudioPlayer": {
        "playerActivity": "PLAYING",
        "token": "string value",
        "offsetInMilliseconds": 100000
      }
    },
    "privatePlay": {} // reserved
  }
}
```
{% endcode %}

## Request header

| Parameter     | Location | Mandatory | Description                                         |
|:--------------|:---------|:----------|:----------------------------------------------------|
| Authorization | header   | N         | Backend proxy에서 유효한 요청인지 검증(validation)하기 위해 사용합니다. |

{% alerts style="info" %}
실제 스피커에서 연동할 때 전달하는 값이며, PlayBuider에서 테스트할 때는 포함하지 않습니다.

`NUGU developers` &gt; `내 정보` &gt; `API key` 정보에서 확인할 수 있습니다.
{% endalerts %}

## Request body

| Parameter                                | Type    | Mandatory | Description                                                                                                                                                                                                                                                                                                         |
|:-----------------------------------------|:--------|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version                                  | string  | Y         | Backend proxy API 버전을 표시합니다.                                                                                                                                                                                                                                                                                        |
| action                                   | json    |           |                                                                                                                                                                                                                                                                                                                     |
| action.actionName                        | string  | Y         | 현재 요청하는 Action의 이름입니다.                                                                                                                                                                                                                                                                                              |
| action.parameters                        | string  | Y         | Action에서 설정된 파라미터로 Play Builder에서 설정한 내용을 포함합니다.<br/> (단, 값이 null인 경우 요청에서 제외됩니다. 요청에서 생략되었더라도 Backend parameter를 응답 값으로 포함해야 합니다.)<br/>     KEY - Play Builder에서 Action 내에 정의한 parameter 이름<br/>    type - 사용자 발화에서 분석된 Entity인 경우 Play Builder에서 설정한 Entity의 타입<br/>  value - 파라미터의 값으로 string 타입                 |
| event                                    | json    | Y         |                                                                                                                                                                                                                                                                                                                     |
| event.type                               | string  | Y         | 디바이스에서 발생한 event의 종류를 나타내며, 이 값에 따라 event의 데이터가 달라집니다. (Capability Interfaces 참조)                                                                                                                                                                                                                                   |
| context                                  | json    | Y         |                                                                                                                                                                                                                                                                                                                     |
| context.session                          | json    | Y         |                                                                                                                                                                                                                                                                                                                     |
| context.session.id                       | string  | Y         | 대화가 유지되는 동안의 유효한 키 값입니다.                                                                                                                                                                                                                                                                                            |
| context.session.isNew                    | boolean | Y         | 대화의 처음을 알려주는 값입니다.                                                                                                                                                                                                                                                                                                  |
| context.session.accessToken              | string  | N         | OAuth 2에 사용되는 인증 token입니다.                                                                                                                                                                                                                                                                                          |
| context.session.isPlayBuilderRequest     | bool    | N         | Play Builder에서 테스트용으로 전달한 요청임을 의미합니다. (기본값: false)                                                                                                                                                                                                                                                                  |
| context.device                           | json    | Y         |                                                                                                                                                                                                                                                                                                                     |
| context.device.type                      | string  | Y         | 현재 사용 중인 디바이스 종류를 나타냅니다.                                                                                                                                                                                                                                                                                            |
| context.device.state                     | json    | N         | 디바이스의 상태를 나타내는 값으로 현재는 정의된 것이 없습니다.                                                                                                                                                                                                                                                                                 |
| context.supportedInterfaces              | json    | Y         | 개발한 Play가 특정 Capability Interface를 지원하는 경우 각 Interface별로 상태 정보를 표시합니다.                                                                                                                                                                                                                                              |
| profile                                  | json    | N         | Private Play에서만 사용됩니다.                                                                                                                                                                                                                                                                                              |
| profile.privatePlay                      | json    | N         | Private Play인 경우 정보를 추가합니다.                                                                                                                                                                                                                                                                                         |
| profile.privatePlay.deviceUniqueId       | string  | N         | Private Play인 경우에만 입력합니다.                                                                                                                                                                                                                                                                                           |
| profile.privatePlay.userKey              | string  | Y         | 해시된 사용자 ID(hashed user id)를 나타냅니다.                                                                                                                                                                                                                                                                                  |
| profile.privatePlay.deviceKey            | string  | Y         | 해시된 디바이스 ID(hashed device id)를 나타냅니다.                                                                                                                                                                                                                                                                               |
| profile.privatePlay.enrolledUser         | json    | N         | 초대 사용자(enrolled user)인 경우 정보를 추가합니다.                                                                                                                                                                                                                                                                                |
| profile.privatePlay.enrolledUser.name    | string  | Y         | 초대 사용자 추가 이름을 나타냅니다.                                                                                                                                                                                                                                                                                                |
| profile.privatePlay.enrolledUser.phoneNo | string  | Y         | 초대 사용자 추가 전화번호를 나타냅니다.                                                                                                                                                                                                                                                                                              |
| profile.privatePlay.enrolledUser.email   | string  | Y         | 초대 사용자 추가 이메일을 나타냅니다.                                                                                                                                                                                                                                                                                               |
| profile.privatePlay.enrolledUser.tag     | string  | N         | 초대 사용자 추가 정보를 나타냅니다.                                                                                                                                                                                                                                                                                                |

{% alerts style="info" %}
context.device.state와 context.privatePlay는 동일 버전 내에서 하위 호환성을 유지한 상태로 지속적으로 확장될 수 있는 필드이므로 구현 시 주의해야 합니다.
{% endalerts %}

## Context for Capability Interfaces(AudioPlayer Interface)

AudioPlayer Interface를 사용하도록 설정된 Play에만 전송됩니다.

| parameter            | type   | mandatory | description                                                                                                      |
|:---------------------|:-------|:----------|:-----------------------------------------------------------------------------------------------------------------|
| playerActivity       | string | Y         | 스피커의 오디오 플레이어 상태값을 나타냅니다.<br/>**IDLE**, **PLAYING**, **PAUSED**, **STOPPED**, **FINISHED**, **BUFFER_UNDERRUN**  |
| token                | string | N         | 현재 재생 중인 곡의 token 값입니다.<br/>AudioPlayer.Play Directive 전송 시 스트리밍 URL과 함께 전송되는 token 값 재생 중인 곡이 있는 경우에만 token이 존재 |
| offsetInMilliseconds | long   | Y         | 현재 재생 중인 위치 (msec)를 나타냅니다.<br/>재생 중인 곡이 없을 경우 기본 값은 0                                                            |

## Response Sample

{% code %}
```json
{
  "version": "2.0",
  "resultCode": "OK",
  "output": {
    "datetime": "오늘",
    KEY1: VALUE1,
    KEY2: VALUE2,
    ...
  },
  "directives": [
    {
      "type": "AudioPlayer.Play",
      "audioItem": {     
          "stream": {
            "url": "{{STRING}}",
            "offsetInMilliseconds": {{LONG}},
            "progressReport": {
              "progressReportDelayInMilliseconds": {{LONG}},
              "progressReportIntervalInMilliseconds": {{LONG}}
            },
            "token": "{{STRING}}",
            "expectedPreviousToken": "{{STRING}}"
          },
          "metadata": { } // reserved
      }
    }
  ]
}
```
{% endcode %}

## Response Body

| parameter  | type   | mandatory | description                                                                                                                                                                                                                                                                               |
|:-----------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| version    | string | Y         | Backend proxy API 버전을 표시합니다.                                                                                                                                                                                                                                                              |
| resultCode | string | Y         | **OK** : 성공인 경우 사용하는 값으로 다른 값을 전송하면 성공이 아닌 것으로 처리하기 때문에 주의해야 합니다.<br/>성공이 아닌 경우는 PlayBuider의 `General` > `기본정보` 페이지의 예외 처리 또는 `Action` > `Custom Actions` > `선택한 Action`의 예외 처리에서 설정된 Result Code(Exception Code)값 전송합니다.                                                                 |
| output     | json   | Y         | Request에서 전송한 action.parameters의 KEY:VALUE를 처리한 결과를 전송합니다.<br/>Request의 모든 KEY:VALUE가 동일하게 나와야 합니다.<br/>VALUE는 Request의 값과 같거나 다를 수 있습니다.<br/>변경되지 않은 VALUE들은 Request의 값을 그대로 써주어야 합니다.<br/>  - **KEY** : Request의 action.parameters에 정의된 KEY<br/>  - **VALUE** : backend proxy에서 처리한 결과  |
| directives | json   | N         | 특정 Capability Interface를 지원하는 Play에서 Directive를 전송하는 경우에 이 필드를 통해 전송합니다.<br/>각 Capability Interface의 Directive 포맷은 해당 Capability Interface 규격을 참조합니다.                                                                                                                                     |

## Health check

서비스 정상 여부를 확인하기 위해 다음의 /health url을 다음과 같이 구현해야 합니다. NUGU developers에서는 이 URL을 주기적으로 요청해서 서버의 정상 여부를 판단합니다. 정상적으로 서비스가 가능하면 HTTP Status code를 "200 OK"로 리턴합니다. (결과 텍스트는 OK 등 아무 문자나 리턴해도 됩니다.)

만약 서비스에 문제가 있을 경우에는 "500 Internal Server Error" 등 200 이외의 HTTP Status Code를 리턴하면 됩니다.

{% code %}
```bash
GET /health HTTP/1.1
Accept: */*


HTTP/1.1 200 OK
Content-Length: 2
OK
```
{% endcode %}

{% alerts style="danger" %}
심사 요청 시 /health url이 정상 동작해야 하며, /health url에서 200 이외의 상태가 오래 지속되면 서비스가 직권 중지될 수 있으므로 유의해야 합니다.
{% endalerts %}
