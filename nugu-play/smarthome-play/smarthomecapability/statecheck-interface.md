---
depth_order: 12
---

# StateCheck Interface

NUGU 스마트홈 StateCheck Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 상태조회방식에 대한 설명입니다.

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
      "id": "D1234567",
      "deviceTypeCode": "OVEN",
      "modelName": "example light",
      "friendlyNameSuggestion": "조리실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "stateCheck": {
        }
      },
      "customData": {
        ...
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

NUGU SmartHome StateCheck Capability는 SmartHomeDevice의 상태를 조회하는 AskState와 OpenSensor의 열림상태를 조회하는 AskOpenState 등의 Directive를 지원합니다.

### AskState

**Directive 정보**  
SmartHomeDevice의 상태를 조회한다.  
Capability : StateCheck  
Directive : AskState

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 상태 알려줘  
아리아, {FriendlyName} 상태 조회해줘  
아리아, {DeviceType} 현재 상태 알려줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/StateCheck/directives/AskState)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "StateCheck",
      "smartHomeDirective": "AskState",
      "parameters": {}
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "OVEN",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "조리실",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "stateCheck": {}
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
  "data":[
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "temperatureLevel": "200", // directive 마다 필요한 property 채워서 응답.
        "hour" : "1", // directive 마다 필요한 property 채워서 응답.
        "minute" : "29" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

AskState Directive Response parameter details

| parameter name | description                                                                                                              | type   |
|:---------------|:-------------------------------------------------------------------------------------------------------------------------|:-------|
|                | AskState Directive에 응답할 parameter들은 SmartHomeDeviceType에 따라 다릅니다.<br/>상세한 정보는 SmartHomeAttribute : DeviceStatus를 참조해주세요. | string |

### AskOpenState

**Directive 정보**  
SmartHomeDevice의 열림상태를 조회한다.  
Capability : StateCheck  
Directive : AskOpenState

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 열림상태 알려줘  
아리아, {FriendlyName} 열림상태 조회해줘  
아리아, {DeviceType} 현재 열림상태 알려줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/StateCheck/directives/AskOpenState)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "StateCheck",
      "smartHomeDirective": "AskOpenState",
      "parameters": {}
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "OPEN_SENSOR",
        "deviceTypeName": "example_device_type",
        "deviceModelName": "example_model_name",
        "friendlyName": "현관",
        "manufacturer": "example_manufacturer",
        "supportedCapabilities": {
          "stateCheck": {}
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
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83", // request로 받은 값을 그대로 응답
  "data":[
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "openState": "open" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

AskOpenState Directive Response parameter details

| parameter name | description                               | type   |
|:---------------|:------------------------------------------|:-------|
| openState      | SmartHomeDevice의 열림상태(open, close로 구분)    | string |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

