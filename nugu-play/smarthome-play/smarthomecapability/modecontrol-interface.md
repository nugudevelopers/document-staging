---
depth_order: 8
---

# ModeControl Interface

NUGU 스마트홈 ModeControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 모드설정방식에 대한 설명입니다. NUGU스마트홈에는 사전에 정의된 모드명들이 있으며 다양한 표현을 정규화하여 정의된 모드명으로 제어 요청을 보냅니다. IoT ServiceProvider는 제어 대상인 스마트홈 기기의 특성과 모드명으로 적합한 기능을 제어하게 됩니다.

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
      "deviceTypeName": "에어컨",
      "deviceModelName": "example air_conditioner",
      "friendlyNameSuggestion": "거실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "modeControl": {
          "supportedModes": [
            "COLD",
            "DEHUMIDITY",
            "COMFORT",
            "AIR_BLAST",
            "ENERGY_SAVING"
          ]
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

| Attribute      | Description                                                                                                                                                                    |
|:---------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| supportedModes | 해당 SmartHomeDevice가 지원하는 Mode의 명칭입니다.<br/>Mode는 NUGU스마트홈에서 지원하는 Mode 명칭 중 선택해서 응답할 수 있으며, 지원하는 Mode의 명칭은 Mode를 참조하시기 바랍니다.<br/>지원하는 Mode는 각 Device별로 Array 형태로 복수개 전달할 수 있습니다. |
| customData     | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다.                                       |

## Directive

NUGU SmartHome ModeControl Capability는 Mode를 설정하는 SetMode와 설정된 Mode를 취소하는 CancelMode를 지원합니다.

### SetMode

**Directive 정보**  
SmartHomeDevice를 사용자가 발화한 모드로 설정한다.  
Capability : ModeControl  
Directive : SetMode

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 냉방모드로 설정해줘.  
아리아, {FriendlyName} 제습모드 설정해줘.  
아리아, {DeviceType} 절전모드로 설정.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ModeControl/directives/SetMode)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "ModeControl",
      "smartHomeDirective": "SetMode",
      "parameters": {
        "mode": "COLD"
      }
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "modeControl": {
            "supportedModes": [
              "COLD",
              "DEHUMIDITY",
              "COMFORT",
              "AIR_BLAST",
              "ENERGY_SAVING"
            ]
          }
        },
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

SetMode Directive Request parameter details

| parameter name | description                                                                                            | type   |
|:---------------|:-------------------------------------------------------------------------------------------------------|:-------|
| mode           | 설정하고자 하는 mode의 사용자 발화 정보.<br/>해당 parameter의 value는 Device Discovery 당시 응답한 supportedModes 중 하나로 요청됩니다. | string |

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
        "mode": "COLD" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetMode Directive Response parameter details

| parameter name | description                                                        | type   |
|:---------------|:-------------------------------------------------------------------|:-------|
| mode           | 설정한 후에 SmartHomeDevice의 모드명.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

### CancelMode

{% alerts style="info" %}
CancelMode 는 모드를 취소하는 기능인데 만약 취소가 불가능한 모드일 경우 적절한 에러코드를 응답해야 합니다.
{% endalerts %}

**Directive 정보**  
SmartHomeDevice에 사용자가 발화한 모드를 설정 해제한다.  
Capability : ModeControl  
Directive : CancelMode

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 냉방모드 설정 해제해줘.  
아리아, {FriendlyName} 무풍모드 설정 취소해줘.  
아리아, {DeviceType} 제습모드 취소.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ModeControl/directives/CancelMode)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "ModeControl",
      "smartHomeDirective": "CancelMode",
      "parameters": {
        "mode": "WINDLESS"
      }
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "modeControl": {
            "supportedModes": [
              "COLD",
              "DEHUMIDITY",
              "COMFORT",
              "AIR_BLAST",
              "ENERGY_SAVING"
            ]
          }
        },
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

SetMode Directive Request parameter details

| parameter name | description                    | type   |
|:---------------|:-------------------------------|:-------|
| mode           | 설정해제하고자 하는 mode의 사용자 발화 정보입니다. | string |

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
        "mode": "WINDLESS" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

CancelMode Directive Response parameter details

| parameter name | description                                                     | type   |
|:---------------|:----------------------------------------------------------------|:-------|
| mode           | 해제한 SmartHomeDevice의 모드명.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

