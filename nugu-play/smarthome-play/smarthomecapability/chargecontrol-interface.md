---
depth_order: 4
---

# ChargeControl Interface

NUGU스마트홈 ChargeControl Interface는 NUGU스마트홈에 등록된 SmartHomeDevice의 충전관련 기능들에 대한 설명입니다. 충전 기능이 있는 모든 SmartHomeDevice를 지원합니다.

## Discovery

NUGU스마트홈을 통해 SmartHomeDevice를 제어하려면 사전에 NUGU스마트홈에 SmartHomeDevice를 등록해야 합니다. 사용자가 NUGU App을 통해 SmartHomeDevice 등록을 요청하면 SmartHome Play 제작 당시 입력한 SmartHomeBackendProxy URL로 NUGU스마트홈에 등록할 수 있는 SmartHomeDevice 목록에 대한 Discovery 요청이 전달됩니다. SmartHomeBackendProxy는 SmartHomeDevice 목록과 함께 각 SmartHomeDevice별로 지원하는 Capability와 그에 따른 부가적인 Parameter들을 응답해야 합니다.

### Discovery Request 예시

{% code title="(POST, /nugu/v1/devices)"%}
```json
{
  "token": "7KOdwPQdJPZf4KYsjtHdqz3e8fKd"
}
```
{% endcode %}

### Discovery Response 예시

{% code %}
```json
{
  "id": "12345",
  "deviceTypeCode": "ROBOT_CLEANER",
  "friendlyNameSuggestion": "거실",
  "deviceTypeName": "로봇청소기",
  "deviceModelName": "example_model_name",
  "customData": {
    "foo": "bar"
  },
  "supportedCapabilities": {
    "powerControl": {},
    "chargeControl": {} // 이 프로퍼티가 있어야 "충전시작" 등 ChargeControl 을 사용하는 발화 지원가능.
  }
}
```
{% endcode %}

{% alerts style="info" %}
ChargeControl Capability 는 별도의 파라미터를 가지지 않습니다. 그러나 NUGU SmartHome Platform 에게 디바이스가 ChargeControl 을 지원한다는 것을 알리기 위해 충전기능을 지원하는 디바이스는 (e.g. 로봇청소기) supportedCapabilities 로 chargeControl 에 해당하는 빈 객체를 응답에 포함시켜야 합니다.
{% endalerts %}

SmartHomeDevice Attribute Parameters

| Attribute  | Description                                                                                                                              |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| customData | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU스마트홈 ChargeControl Capability는 충전을 요청하는 StartCharging과 충전중지를 요청하는 StopCharging, 잔여 배터리량을 조회하는 CheckRemainingBattery Directive를 지원합니다.

### StartCharging

**Directive 정보**  
SmartHomeDevice의 충전을 시작한다.  
Capability : ChargeControl  
Directive : StartCharging

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 충전 시작해줘  
아리아, {FriendlyName} 충전해줘  
아리아, {DeviceType} 충전 시작.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ChargeControl/directives/StartCharging)"%}
```json
{
  "version": 1,
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783",
  "action": {
    "command": {
      "smartHomeCapability": "ChargeControl",
      "smartHomeDirective": "StartCharging"
    },
    "smartHomeDevices": [
      {
        "id": "12345",
        "deviceTypeCode": "ROBOT_CLEANER",
        "friendlyName": "거실",
        "deviceTypeName": "로봇청소기",
        "deviceModelName": "example_model_name",
        "customData": {
          "foo": "bar"
        },
        "supportedCapabilities": {
          "powerControl": {},
          "chargeControl": {}
        }
      }
    ]
  },
  "context": {
    "session": {
      "id": "example_session_id",
      "accessToken": "example_access_token"
    }
  }
}
```
{% endcode %}

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
      }
    }
  ]
}
```
{% endcode %}

### StopCharging

**Directive 정보**  
SmartHomeDevice의 충전을 중단한다.  
Capability : ChargeControl  
Directive : StopCharging

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 충전 중지해줘  
아리아, {FriendlyName} 충전 멈춰줘  
아리아, {DeviceType} 충전 그만.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ChargeControl/directives/StopCharging)"%}
```json
{
  "version": 1,
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783",
  "action": {
    "command": {
      "smartHomeCapability": "ChargeControl",
      "smartHomeDirective": "StartCharging"
    },
    "smartHomeDevices": [
      {
        "id": "12345",
        "deviceTypeCode": "ROBOT_CLEANER",
        "friendlyName": "거실",
        "deviceTypeName": "로봇청소기",
        "deviceModelName": "example_model_name",
        "customData": {
          "foo": "bar"
        },
        "supportedCapabilities": {
          "powerControl": {},
          "chargeControl": {}
        }
      }
    ]
  },
  "context": {
    "session": {
      "id": "example_session_id",
      "accessToken": "example_access_token"
    }
  }
}
```
{% endcode %}

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
      }
    }
  ]
}
```
{% endcode %}

### CheckRemainingBattery

**Directive 정보**  
SmartHomeDevice의 잔여배터리량을 조회한다.  
Capability : ChargeControl  
Directive : CheckRemainingBattery

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 잔여 배터리량 조회해줘  
아리아, {FriendlyName} 남은 배터리량 알려줘  
아리아, {DeviceType} 배터리량 조회

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ChargeControl/directives/CheckRemainingBattery)"%}
```json
{
  "version": 1,
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783",
  "action": {
    "command": {
      "smartHomeCapability": "ChargeControl",
      "smartHomeDirective": "CheckRemainingBattery"
    },
    "smartHomeDevices": [
      {
        "id": "12345",
        "deviceTypeCode": "ROBOT_CLEANER",
        "friendlyName": "거실",
        "deviceTypeName": "로봇청소기",
        "deviceModelName": "example_model_name",
        "customData": {
          "foo": "bar"
        },
        "supportedCapabilities": {
          "powerControl": {},
          "chargeControl": {}
        }
      }
    ]
  },
  "context": {
    "session": {
      "id": "example_session_id",
      "accessToken": "example_access_token"
    }
  }
}
```
{% endcode %}

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093020a1e59d2c95f74908a06c7473f6676783", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "remainingBattery": "80" // 잔여 배터리 량 (단위: 퍼센트(%), 단위 기호 생략.)
      }
    }
  ]
}
```
{% endcode %}

CheckRemainingBattery Directive Response parameter details

| parameter name   | description                                     | type    |
|:-----------------|:------------------------------------------------|:--------|
| remainingBattery | SmartHomdeDevice의 잔여배터리량.<br/>%를 기준으로 응답해야 합니다. | integer |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

