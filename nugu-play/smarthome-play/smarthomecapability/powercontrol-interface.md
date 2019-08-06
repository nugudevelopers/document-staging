---
depth_order: 10
---

# PowerControl Interface

NUGU 스마트홈 PowerControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 전원제어방식에 대한 설명입니다. 전원을 켜고 끄거나 동작을 시작, 중지할 수 있는 모든 종류의 SmartHomeDevice를 지원합니다.

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
      "deviceTypeCode": "LIGHT",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyNameSuggestion": "안방",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "powerControl": {
        }
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

## Directive

NUGU SmartHome PowerControl Capability는 전원을 켜는 TurnOn, 전원을 끄는 TurnOff Directive를 지원합니다.

### TurnOn

**Directive 정보**  
SmartHomeDevice의 전원을 켠다.  
Capability : PowerControl  
Directive : TurnOn

**Voice Command**  
아리아. {FriendlyName} {DeviceType} 전원 켜줘.  
아리아, {FriendlyName} 켜줘  
아리아, {DeviceType} 켜

#### Sample Request

{% code title="(POST, /nugu/v1/capabilities/PowerControl/directives/TurnOn)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "PowerControl",
      "smartHomeDirective": "TurnOn",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "LIGHT",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "안방",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "powerControl": {}
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
      "properties": {} // directive 마다 필요한 property 채워서 응답
    }
  ]
}
```
{% endcode %}

### TurnOff

**Directive 정보**  
SmartHomeDevice의 전원을 끈다.  
Capability : PowerControl  
Directive : TurnOff

**Voice Command**  
아리아. {FriendlyName} {DeviceType} 전원 꺼줘.  
아리아, {FriendlyName} 꺼줘  
아리아, {DeviceType} 꺼

#### Sample Request

{% code title="(POST, /nugu/v1/capabilities/PowerControl/directives/TurnOff)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "PowerControl",
      "smartHomeDirective": "TurnOff",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "LIGHT",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "안방",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "powerControl": {}
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
      "properties": {} // directive 마다 필요한 property 채워서 응답
    }
  ]
}
```
{% endcode %}

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

