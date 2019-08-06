---
depth_order: 3
description: 디바이스의 전원 및 네트워크 연결 상태를 관리하기 위한 규격
---

# System

## Version

최신 버전은 1.3 입니다.

| Version | Date       | Description                                 |
|:--------|:-----------|:--------------------------------------------|
| 1.0     | 2019.12.05 | 규격 추가                                       |
| 1.1     | 2020.03.20 | System.Revoke, System.Noop directive 추가     |
| 1.2     | 2020.06.05 | System.Revoke directive 에 WITHDRAWN_USER 추가 |
| 1.3     | 2020.08.27 | System.ResetConnection 추가                   |

## SDK Interface

### SystemAgent 사용

System interface 규격에 따른 디바이스의 동작 제어는 SystemAgent 가 처리합니다.

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 SystemAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val systemAgent = nuguAndroidClient.systemAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 SystemAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let systemAgent = nuguClient.systemAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[CapabilityFactory::makeCapability](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1CapabilityFactory.html#a46d96b1bc96903f02905c92ba8794bf6) 함수로 [SystemAgent](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISystemHandler.html) 를 생성하고 [NuguClient](https://nugu-developers.github.io/nugu-linux/classNuguClientKit_1_1NuguClient.html) 에 추가해 주어야합니다.

{% code %}
```cpp
auto system_handler(std::shared_ptr<ISystemHandler>(
            CapabilityFactory::makeCapability<SystemAgent, ISystemHandler>()));

nugu_client->getCapabilityBuilder()
    ->add(system_handler.get())
    ->construct();
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 디바이스 전원 제어

`사용자 발화` 에 따라 [TurnOff](#turnoff) directive 로 디바이스 전원을 제어할 수 있습니다.

{% alerts style="warning" %}
iOS 는 지원하지 않습니다
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
SystemAgentInterface.Listener 를 추가합니다.

{% code %}
```kotlin
val listener = object: SystemAgentInterface.Listener {
    override fun onTurnOff() {
        ...
    }
}
systemAgent.addListener(listener)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ISystemListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISystemListener.html) 를 추가합니다.

{% code %}
```cpp
class MySystemListener : public ISystemListener {
public:
    ...

    void onTurnOff() override
    {
        ...
    }

    ...
};
auto system_listener(std::make_shared<MySystemListener>());
CapabilityFactory::makeCapability<SystemAgent, ISystemHandler>(system_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 에러처리

NUGU 서버에서 에러가 발생할 경우 [Exception](#exception) directive 로 error code가 전달됩니다.

사용자가 에러 상황을 인지할 수 있도록 Toast, Local TTS 등으로 안내해야합니다.

{% tabs %}
{% tabs::content title="Android" %}
SystemAgentInterface.Listener 를 추가합니다.

{% code %}
```kotlin
val listener = object: SystemAgentInterface.Listener {
    override fun onException(code: ExceptionCode, description: String?) {
        ...
    }
}
systemAgent.addListener(listener)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
SystemAgentDelegate 를 추가합니다.

{% code %}
```swift
class MySystemAgentDelegate: SystemAgentDelegate {
    func systemAgentDidReceiveExceptionFail(code: SystemAgentExceptionCode.Fail, dialogRequestId: String) {
        ...
    }

    ...
}
systemAgent.add(systemAgentDelegate: MySystemAgentDelegate())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ISystemListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISystemListener.html) 를 추가합니다.

{% code %}
```cpp
class MySystemListener : public ISystemListener {
public:
    ...

    void onException(SystemException exception, const std::string &dialog_id) override
    {
        ...
    }

    ...
};
auto system_listener(std::make_shared<MySystemListener>());
CapabilityFactory::makeCapability<SystemAgent, ISystemHandler>(system_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 디바이스 등록 해제

누구 서버에서 디바이스가 등록 해제되면 [Revoke](#revoke) directive 로 reason 이 전달됩니다.

Application 의 상황에 따라 NUGU 로그인 화면으로 이동하거나 NUGU Button 을 비활성화 해야합니다.

{% tabs %}
{% tabs::content title="Android" %}
SystemAgentInterface.Listener 를 추가합니다.

{% code %}
```kotlin
val listener = object: SystemAgentInterface.Listener {
    override fun onRevoke(reason: RevokeReason) {
        ...
    }
}
systemAgent.addListener(listener)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
SystemAgentDelegate 를 추가합니다.

{% code %}
```swift
class MySystemAgentDelegate: SystemAgentDelegate {
    func systemAgentDidReceiveRevokeDevice(reason: SystemAgentRevokeReason, dialogRequestId: String) {
        ...
    }

    ...
}
systemAgent.add(systemAgentDelegate: MySystemAgentDelegate())
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="Linux" %}
[ISystemListener](https://nugu-developers.github.io/nugu-linux/classNuguCapability_1_1ISystemListener.html) 를 추가합니다.

{% code %}
```cpp
class MySystemListener : public ISystemListener {
public:
    ...

    onRevoke(RevokeReason reason) override
    {
        ...
    }

    ...
};
auto system_listener(std::make_shared<MySystemListener>());
CapabilityFactory::makeCapability<SystemAgent, ISystemHandler>(system_listener.get());
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "System": {
    "version": "1.3"
  }
}
```
{% endcode %}

## Directive

### ResetUserInactivity

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* UserInactivityReport 이벤트의 inactivity timer를 리셋시키기 위해 전송
* 사용자 인터렉션은 없지만 서비스를 사용하는 경우에 보내야 함

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "ResetUserInactivity",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### HandoffConnection

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* NUGU Platform과 TCP  connection을 맺고 유지하는 디바이스에게 연결을 끊고 다시 접속하라는 명령
* 장시간 사용하지 않는 경우 NUGU Platform에서 TCP connection을 관리하는 서버의 rebalancing을 위해 사용
* NUGU Platform은 UserInactivityReport에서 inactivity 시간을 보고 장시간 사용하지 않은 디바이스를 대상으로 RevokeConnection 디렉티브를 전송할 수 있음

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "HandoffConnection",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "protocol": "{{STRING}}",
    "hostName": "{{STRING}}",
    "port": {{LONG}},
    "retryCountLimit": {{LONG}},
    "connectionTimeout": {{LONG}},
    "charge": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter         | type   | mandatory | description                                                                                                  |
|:------------------|:-------|:----------|:-------------------------------------------------------------------------------------------------------------|
| protocol          | String | Y         | H2_GRPC : grpc over<br/>http2 H2 : http2                                                                     |
| hostname          | String | Y         | domain                                                                                                       |
| address           | String | Y         | deprecated ip or domain                                                                                      |
| port              | Int    | Y         | port                                                                                                         |
| retryCountLimit   | Int    | Y         | retry_count_limit까지 요청 한 후 다음 server로 접속 시도                                                                  |
| connectionTimeout | Int    | Y         | milliseconds                                                                                                 |
| charge            | String | N         | NORMAL : 일반적인 통신 요금 과금 (default)<br/>FREE : 무과금 포트를 이용하여 device gateway에 접속해서 TTS.SpeechPlay Event를 통해 음성 합성 |

### TurnOff

* 디바이스 전원 끄기 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "TurnOff",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### UpdateState

* 디바이스의 모든 상태 정보 전달 요청

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "UpdateState",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### Exception

누구 서버에서 에러가 발생하면 전달됩니다.

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "Exception",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "code": "{{STRING}}",
    "description": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter   | type   | mandatory | description |
|:------------|:-------|:----------|:------------|
| code        | string | Y         | 서버에서 발생     |
| description | string | N         | 에러에 대한 설명   |

| code                             | description                                                                                                                                                                                                                                |
|:---------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UNAUTHORIZED_REQUEST_EXCEPTION   | 접속시 인증 에러<br/>jwt 토큰이 유효하지 않거나 header에 토큰이 없는 경우<br/>- grpc : System.Exception(UNAUTHORIZED_REQUEST_EXCEPTION)을 내리고 연결 끊음<br/>- h2 : 403 에러<br/>play router에서 토큰이 유효하지 않아서 실패<br/>jwt 토큰은 유효하지만 디바이스 연결 직후 habilis를 조회해서 토큰이 유효하지 않은 것이 확인 |
| ASR_RECOGNIZING_EXCEPTION        | 음성 인식 에러                                                                                                                                                                                                                                   |
| PLAY_ROUTER_PROCESSING_EXCEPTION | Play router 에러<br/>Fallback Play 연동 실패<br/>Client 로직 오류(잘못된 규격으로 요청)                                                                                                                                                                       |
| TTS_SPEAKING_EXCEPTION           | 음성 합성 에러                                                                                                                                                                                                                                   |
| INTERNAL_SERVICE_EXCEPTION       | 기타 알 수 없는 에러                                                                                                                                                                                                                               |

### NoDirectives

* Event에 대한 play router 처리 결과과 없는 경우 발생

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "NoDirectives",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### Revoke

NUGU 서버에서 디바이스가 등록 해제되면 전달됩니다.

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "Revoke",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "reson": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description     |
|:----------|:-------|:----------|:----------------|
| reason    | string | Y         | 디바이스가 등록 해제된 원인 |

| reason         | description             |
|:---------------|:------------------------|
| REVOKED_DEVICE | NUGU 모바일 앱에서 디바이스 연결 해제 |

### Noop

* http2 response에서 multi part body를 사용하면서 padding으로 사용 
* 클라이언트에서는 Noop은 무시하고 아무런 처리를 하지 않음

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "Noop",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {}
}
```
{% endcode %}

### ResetConnection

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* 이 요청을 받으면 클라이언트는 registry에 다시 접속해서 주소를 받아서 접속한다. 

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "ResetConnection",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
      "description": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter   | type   | mandatory | description              |
|:------------|:-------|:----------|:-------------------------|
| description | String | N         | 서버에서 정보를 남기기 위한 단순 로깅 용도 |

## Events

### SynchronizeState

* System.UpdateState 에 대한 응답

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "SynchronizeState",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### UserInactivityReport

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* 1시간동안 사용자 인터렉션이 없는 경우 보내야 함

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "UserInactivityReport",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "inactiveTimeInSeconds": {{LONG}}
  }
}
```
{% endcode %}

| parameter             | type  | mandatory | description |
|:----------------------|:------|:----------|:------------|
| inactiveTimeInSeconds | long  | Y         |             |

### Disconnect

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* handoff 가 완료되어 더 이상 받을 directive나 TTS stream이 없는 경우
* 디바이스 종료 등 이슈로 연결을 끊는 경우

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "SynchronizeState",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}

### Echo

{% alerts style="info" %}
Connection-oriented 디바이스에서만 사용
{% endalerts %}

* device-gateway와 연결 상테를 테스트하기 위한 event

{% code %}
```json
{
  "header": {
    "namespace": "System",
    "name": "SynchronizeState",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {}
}
```
{% endcode %}
