---
depth_order: 11
---

# SetTimeControl Interface

NUGU스마트홈 SetTimeControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 제어시간설정방식에 대한 설명입니다. 스마트홈 기기의 종료예약설정 등을 관리할 수 있습니다.

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
      "deviceTypeCode": "AIR_CONDITIONER",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyNameSuggestion": "거실",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "setTimeControl": {} // 이 속성이 존재해야 setTimeControl Capability 사용 가능.
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

| Attribute  | Description                                                                                                                              |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| customData | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU SmartHome SetTimeControl Capability는 종료예약을 설정하는 SetEndTime과 설정된 종료예약을 취소하는 CancelEndTime을 지원합니다.

### SetEndTime

**Directive 정보**  
SmartHomeDevice를 사용자가 발화한 시간에 맞춰 종료 예약 설정한다.  
Capability : SetTimeControl  
Directive : SetEndTime

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 1시간 후에 종료예약 설정해줘.  
아리아, {FriendlyName} {DeviceType} 3시로 종료예약해줘.  
아리아, {DeviceType} 1시간 30분 후 종료예약 설정.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/SetTimeControl/directives/SetEndtime)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "SetTimeControl",
      "smartHomeDirective": "SetEndtime",
      "parameters": {
        "dateTime": "2019-10-01T15:50"
      }
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "setTimeControl": {}
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

SetEndTime Directive Request parameter details

| parameter name | description                              | type   |
|:---------------|:-----------------------------------------|:-------|
| dateTime       | SmartHomeDevice에 설정하고자 하는 종료예약의 시간정보입니다. | string |

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
        "dateTime": "2019-10-01T15:50"
      }
    }
  ]
}
```
{% endcode %}

### CancelEndTime

**Directive 정보**  
SmartHomeDevice에 설정된 종료예약을 취소한다.  
Capability : SetTimeControl  
Directive : CancelEndTime

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 종료예약 취소해줘.  
아리아, {FriendlyName} {DeviceType} 꺼짐예약 삭제해줘.  
아리아, {DeviceType} 종료예약 취소.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/SetTimeControl/directives/CancelEndtime)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "SetTimeControl",
      "smartHomeDirective": "CancelEndtime",
      "parameters": {}
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "setTimeControl": {}
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
      }
    }
  ]
}
```
{% endcode %}

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

