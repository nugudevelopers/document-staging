---
depth_order: 9
---

# PowerCheck Interface

NUGU스마트홈 PowerCheck Interface는 NUGU스마트홈에 등록된 SmartHomeDevice의 전력량관련 조회방식에 대한 설명입니다. 스마트홈 기기의 사용전력량, 목표전력량 등의 조회 기능을 지원합니다.

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
  "devices": [
    {
      "id": "1234567",
      "deviceTypeCode": "PLUG",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyNameSuggestion": "모니터",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "powerCheck": {}
      },
      "customData": {
        "foo": "bar"
      },
      "connectionStatus": true
    }
  ]
}
```
{% endcode %}

SmartHomeDevice Attribute Parameters

| Attribute  | Description                                                                                                                          |
|:-----------|:-------------------------------------------------------------------------------------------------------------------------------------|
| customData | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다. customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU스마트홈 PowerCheck Capability는 소모 전력량을 조회하는 AskPower와 목표사용전력량을 조회하는 AskPowerTarget Directive를 지원합니다.

### AskPower

**Directive 정보**  
SmartHomeDevice의 사용 전력량을 조회한다.  
Capability : PowerCheck  
Directive : AskPower

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 전력사용량 조회해줘  
아리아, {FriendlyName} 전기사용량 조회해줘.  
아리아, {DeviceType} 이번 달 전력사용량 조회.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/PowerCheck/directives/AskPower)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "PowerCheck",
      "smartHomeDirective": "AskPower",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "PLUG",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "모니터",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "powerCheck": {}
        },
        "customData": {
          "foo": "bar"
        },
        "connectionStatus": true
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
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "powerConsumption": "30", // directive 마다 필요한 property 채워서 응답.
        "month": "3"
      }
    }
  ]
}
```
{% endcode %}

AskPower Directive Response parametert details

| parameter name   | description                               | type   |
|:-----------------|:------------------------------------------|:-------|
| powerConsumption | SmartHomeDevice의 전력사용량값. kW 단위로 응답해야 합니다. | double |
| month            | 몇월 전력사용량인지에 대한 정보입니다.                     | int    |

### AskPowerTarget

**Directive 정보**  
SmartHomeDevice에 설정된 목표전력사용량을 조회한다.  
Capability : PowerCheck  
Directive : AskPowerTarget

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 목표 전력사용량 조회해줘  
아리아, {FriendlyName} 설정된 목표 전기사용량 조회해줘.  
아리아, {DeviceType} 이번 달 목표 전력사용량 조회.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/PowerCheck/directives/AskPowerTarget)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "PowerCheck",
      "smartHomeDirective": "AskPowerTarget",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "PLUG",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "모니터",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "powerCheck": {}
        },
        "customData": {
          "foo": "bar"
        },
        "connectionStatus": true
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
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "targetPowerConsumption": "300" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

AskPowerTarget Directive Response parameter details

| parameter name         | description                                            | type   |
|:-----------------------|:-------------------------------------------------------|:-------|
| targetPowerConsumption | SmartHomeDevice에 설정된 목표 전력 사용량 값.<br/>kW 단위로 응답해야 합니다. | double |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

