---
depth_order: 5
---

# ColorControl Interface

NUGU 스마트홈 ColorControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 설정된 색 제어방식에 대한 설명입니다. 스마트 조명 등의 색상 변경을 지원합니다.

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
      "id": "12345",
      "deviceTypeCode": "LIGHT",
      "friendlyNameSuggestion": "거실",
      "deviceTypeName": "조명",
      "deviceModelName": "example_device_model_name",
      "customData": {
        "foo": "bar"
      },
      "supportedCapabilities": {
        "powerControl": {},
        "colorControl": {
          "supportedColorTypes": [
            "BLUE",
            "GREEN",
            "CYAN",
            "MINT",
            "SKYBLUE",
            "PURPLE",
            "LAVENDER",
            "COOL_WHITE",
            "SALMON",
            "GOLD",
            "RED",
            "MAGENTA",
            "CRIMSON",
            "WARM_WHITE",
            "ORANGE",
            "SOFTWHITE",
            "PINK",
            "WHITE",
            "DAY_LIGHT",
            "YELLOW",
            "TURQUOISE",
            "LIGHT_PURPLE"
          ] // 지원 가능한 ColorType 타입 참고.
        }, // 이 property 를 포함하고 있어야 "조명 노란색으로 설정해줘" 와 같은 발화를 지원할 수 있습니다.
        "brightnessControl": {}
      }
    }
  ]
}
```
{% endcode %}

SmartHomeDevice Attribute Parameters

| Attribute           | Description                                                                                                                                        |
|:--------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------|
| supportedColorTypes | 해당 SmartHomeDevice가 지원하는 ColorType의 명칭입니다.<br/>Discovery시의 ColorType은 지원한는 Color의 영문명을 사용하고, 지원하는 ColorTypes는 각 Device별로 Array 형태로 복수개 전달할 수 있습니다. |
| customData          | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다.           |

## Directive

NUGU SmartHome ColorControl Capability는 SmartHomeDevice의 색상변경을 제어하는 ChangeColor Directive를 지원합니다.

### ChangeColor

**Directive 정보**  
SmartHomeDevice의 색상을 사용자가 발화한 색상으로 설정한다.  
Capability : ColorControl  
Directive : ChangeColor

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 색상 빨간색으로 설정해줘.  
아리아, {FriendlyName} 색깔 파랗게 바꿔줘.  
아리아, {DeviceType} 노란색으로 설정해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/ColorControl/directives/ChangeColor)"%}
```json
{
  "version": 1,
  "requestId": "20190930213631c172b5214d4abfdbeb5804d8d80d",
  "action": {
    "command": {
      "smartHomeCapability": "ColorControl",
      "smartHomeDirective": "ChangeColor",
      "parameters": {
        "colorType": "#ffff00"
      }
    },
    "smartHomeDevices": [
      {
        "id": "12345",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "deviceModelName": "example_device_model_name",
        "customData": {
          "foo": "bar"
        },
        "supportedCapabilities": {
          "powerControl": {},
          "colorControl": {},
          "brightnessControl": {}
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

ChangeColor Directive Request parameter details

| parameter name | description                                                                  | type   |
|:---------------|:-----------------------------------------------------------------------------|:-------|
| colorType      | 사용자가 SmartHomeDevice에 설정하고자 하는 색상 정보입니다.<br/>RGB값으로 구성됩니다. e.g) 노란색: #ffff00 | string |

#### Sample Response

{% code %}
```json
{
  "requestId": "20190930213631c172b5214d4abfdbeb5804d8d80d", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "smartHomeDevice": {}, // request로 받은 값을 그대로 응답
      "properties": {
        "colorType": "#ff0000" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

ChangeColor Directive Response parameter details

| parameter name | description                                                     | type   |
|:---------------|:----------------------------------------------------------------|:-------|
| colorType      | SmartHomeDevice를 설정한 이후의 색상정보입니다. 제어를 마친 이후의 색상을 기준으로 응답해야 합니다. | string |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

