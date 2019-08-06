---
depth_order: 6
---

# DeviceTemperatureControl Interface

NUGU스마트홈 DeviceTemperatureControl Capability Interface는 NUGU스마트홈에 등록된 SmartHomeDevice 자체의 온도제어방식에 대한 설명입니다. TemperatureControl Interface가 주변 온도에 대한 제어 명령이라면 DeviceTemperatureControl Interface는 해당 SmartHomeDevice 자체의 온도 설정에 대한 명령으로 구성되어 있습니다.

## Discovery

NUGU스마트홈을 통해 SmartHomeDevice를 제어하려면 사전에 NUGU스마트홈에 SmartHomeDevice를 등록해야 합니다. 사용자가 NUGU App을 통해 SmartHomeDevice 등록을 요청하면 SmartHome Play 제작 당시 입력한 SmartHomeBackendProxy URL로 NUGU스마트홈에 등록할 수 있는 SmartHomeDevice 목록에 대한 Discovery 요청이 전달됩니다. SmartHomeBackendProxy는 SmartHomeDevice 목록과 함께 각 SmartHomeDevice별로 지원하는 Capability와 그에 따른 부가적인 Parameter들을 응답해야 합니다.

### Discovery Request 예시

{% code title="(POST, /nugu/v1/devices)"%}
```json
{
  "userIdentifier": "t6Pv9PLAEmYZilNiloUUnZbVDjXgvUCzwpWY1tPq", // (optional, e.g. hue whitelist identifier),
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
      "id": "12345",
      "type": "OVEN",
      "modelName": "example oven",
      "friendlyNameSuggestion": "조리실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "deviceTemperatureControl": {
          "minTemperature": "100",
          "maxTemperature": "300"
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

SmartHomeDevice Attribute Parameters

| Attribute      | Description                                                                                                                              |
|:---------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| minTemperature | 해당 SmartHomeDevice가 지원하는 최저 자체 설정 온도입니다.                                                                                                 |
| maxTemperature | 해당 SmartHomeDevice가 지원하는 최고 자체 설정 온도입니다.                                                                                                 |
| customData     | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU스마트홈 DeviceTemperatureControl Capability는 SmartHomeDevice의 자체 설정 온도를 조회하는 AskDeviceTemperature와 SmartHomeDevice 자체 온도를 설정하는 SetDeviceTemperature 등의 Directive를 지원합니다.

### AskDeviceTemperature

**Directive 정보**  
SmartHomeDevice에 설정된 자체 온도를 조회한다.  
Capability : DeviceTemperatureControl  
Directive : AskDeviceTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 알려줘.  
아리아, {FriendlyName} 온도 어떻게 설정되어 있어?  
아리아, {DeviceType} 온도 조회해줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/{Capability}/directives/{Directive})"%}
```json
{
  "version": 1,
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "action": {
    "command": {
      "smartHomeCapability": "DeviceTemperatureControl",
      "smartHomeDirective": "AskDeviceTemperature"
    },
    "smartHomeDevices": [
      {
        "id": "12345678",
        "deviceTypeCode": "OVEN",
        "deviceModelName": "example oven",
        "friendlyName": "조리실",
        "deviceTypeName": "오븐",
        "customData": {
          "foo": "bar"
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
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "temperatureLevel": 120.0 // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

AskDeviceTemperature Directive Response parameter details

| parameter name   | description                                            | type   |
|:-----------------|:-------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice에 설정된 자체설정온도입니다.<br/>사용자에게 설정온도로 안내됩니다. | double |

### SetDeviceTemperature

**Directive 정보**  
SmartHomeDevice의 자체설정온도를 사용자가 발화한 특정 온도로 설정한다.  
Capability : DeviceTemperatureControl  
Directive : SetDeviceTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 25도로 설정해줘.  
아리아, {FriendlyName} 온도 30.5도로 설정해줘.  
아리아, {DeviceType} 온도 19도로 설정해줘.

#### Sample Request

{% code titls="Control Request 예시 (POST, /nugu/v1/capabilities/DeviceTemperatureControl/directives/SetDeviceTemperature)"%}
```json
{
  "version": 1,
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "action": {
    "command": {
      "smartHomeCapability": "DeviceTemperatureControl",
      "smartHomeDirective": "SetDeviceTemperature",
      "parameters": {
        "temperatureLevel": "120.0"
      }
    },
    "smartHomeDevices": [
      {
        "id": "12345678",
        "deviceTypeCode": "OVEN",
        "deviceModelName": "example oven",
        "friendlyName": "조리실",
        "deviceTypeName": "오븐",
        "customData": {
          "foo": "bar"
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

SetDeviceTemperature Directive Request parameter details

| parameter name   | description                                     | type   |
|:-----------------|:------------------------------------------------|:-------|
| temperatureLevel | 사용자가 SmartHomeDevice에 설정하고자 하는 자체설정온도의 발화정보입니다. | double |

#### Sample Response

{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "temperatureLevel": "120.0" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetDeviceTemperature Directive Response parameter details

| parameter name   | description                                                      | type   |
|:-----------------|:-----------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 자체설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

