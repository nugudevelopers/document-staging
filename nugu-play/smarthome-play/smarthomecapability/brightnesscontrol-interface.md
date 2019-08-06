---
depth_order: 3
---

# BrightnessControl Interface

NUGU 스마트홈 BrightnessControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 밝기제어방식에 대한 설명입니다. 스마트홈 기기의 밝기는 1부터 100단계로 제어할 수 있습니다.

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
      "id": "123456",
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
        },
        "brightnessControl": {} // BrightnessControl 을 지원하려면 이 속성이 supportedCapabilities 에 포함되어 있어야 합니다.
      },
      "connectionStatus": true
    }
  ]
}
```
{% endcode %}

SmarHomeDevice Attribute Parameters

| Attribute  | Description                                                                                                                              |
|:-----------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| customData | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU SmartHome BrightnessControl Capability는 SmartHomeDevice의 밝기를 제어하는 SetBrightness, IncreaseBrightness, DecreaseBrightness, SetBrightnessMax, SetBrightnessMin 등의 Directive를 지원합니다.

### SetBrightness

**Directive 정보**  
SmartHomeDevice의 밝기를 사용자가 발화한 특정 밝기로 설정한다.  
Capability : BrightnessControl  
Directive : SetBrightness

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 밝기 25로 설정해줘.  
아리아, {FriendlyName} 밝기 30%로 설정해줘.  
아리아, {DeviceType} 밝기 19로 설정해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/BrightnessControl/directives/SetBrightness)"%}
```json
{
  "version": 1,
  "requestId": "201909301991140f5a1e97441fa76a699284bc6035",
  "action": {
    "command": {
      "smartHomeCapability": "BrightnessControl",
      "smartHomeDirective": "SetBrightness",
      "brightnessLevel": 30
    },
    "smartHomeDevices": [
      {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
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

SetBrightness Directive Request parameter details

| parameter name  | description                                                            | type           |
|:----------------|:-----------------------------------------------------------------------|:---------------|
| brightnessLevel | 사용자가 SmartHomeDevice에 설정하고자 하는 밝기의 발화 정보입니다.<br/>1부터 100까지 설정할 수 있습니다. | integer(1~100) |

#### Sample Response

{% code %}
```json
{
  "requestId": "201909301991140f5a1e97441fa76a699284bc6035",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "deviceModelName": "example_device_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "brightnessLevel": 1
      }
    }
  ]
}
```
{% endcode %}

SetBrightness Directive Response parameter details

| parameter name  | description                                                         | type           |
|:----------------|:--------------------------------------------------------------------|:---------------|
| brightnessLevel | SmartHomeDevice를 설정한 이후의 밝기정보입니다.<br/>제어를 마친 이후의 밝기를 기준으로 응답해야 합니다. | integer(1~100) |

### IncreaseBrightness

**Directive 정보**  
SmartHomeDevice의 밝기단계를 올린다.  
Capability : BrightnessControl  
Directive : IncreaseBrightness

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 밝기 올려줘.  
아리아, {FriendlyName} 밝기 3 올려서 설정해줘.  
아리아, {DeviceType} 밝기 10단계 올려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/BrightnessControl/directives/IncreaseBrightness)"%}
```json
{
  "version": 1,
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "action": {
    "command": {
      "smartHomeCapability": "BrightnessControl",
      "smartHomeDirective": "IncreaseBrightness",
      "parameters": {
        "brightnessDelta": 3
      }
    },
    "smartHomeDevices": [
      {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "deviceModelName": "example_model_name",
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
      "accessToken": "example_access_token",
      "userIdentifier": "example_"
    }
  }
}
```
{% endcode %}

IncreaseTemperature Directive request parameter details

| parameter name  | description                                                         | type           |
|:----------------|:--------------------------------------------------------------------|:---------------|
| brightnessDelta | 설정 밝기를 몇 단계 올릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우 1단계를 올리도록 설정합니다. | integer(1~100) |

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "brightnessLevel": 6
      }
    }
  ]
}
```
{% endcode %}

IncreaseBrightness Directive response parameter details

| parameter name  | description                                                              | type           |
|:----------------|:-------------------------------------------------------------------------|:---------------|
| brightnessLevel | SmartHomeDevice의 밝기를 조절한 이후의 설정 밝기입니다.<br/>제어를 마친 이후의 밝기를 기준으로 응답해야 합니다. | integer(1~100) |

### DecreaseBrightness

**Directive 정보**  
SmartHomeDevice의 밝기단계를 내린다.  
Capability : BrightnessLevel  
Directive : DecreaseBrightness

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 밝기 내려줘.  
아리아, {FriendlyName} 밝기 3 내려서 설정해줘.  
아리아, {DeviceType} 밝기 10단계 내려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/BrightnessControl/directives/DecreaseBrightness)"%}
```json
{
  "version": 1,
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "action": {
    "command": {
      "smartHomeCapability": "BrightnessControl",
      "smartHomeDirective": "DecreaseBrightness",
      "parameters": {
        "brightnessDelta": 3
      }
    },
    "smartHomeDevices": [
      {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "deviceModelName": "example_model_name",
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

DecreseBrightness Directive request parameter details

| parameter name  | description                                                         | type           |
|:----------------|:--------------------------------------------------------------------|:---------------|
| brightnessDelta | 설정 밝기를 몇 단계 내릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우 1단계를 내리도록 설정합니다. | integer(1~100) |

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "brightnessLevel": 1
      }
    }
  ]
}
```
{% endcode %}

DecreaseBrightness Directive response parameter details

| parameter name  | description                                                              | type           |
|:----------------|:-------------------------------------------------------------------------|:---------------|
| brightnessLevel | SmartHomeDevice의 밝기를 조절한 이후의 설정 밝기입니다.<br/>제어를 마친 이후의 밝기를 기준으로 응답해야 합니다. | integer(1~100) |

### SetBrightnessMax

**Directive 정보**  
SmartHomeDevice의 밝기를 최고 단계로 설정한다.  
Capability : BrightnessControl  
Directive : SetBrightnessMax

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 밝기 최고로 설정해줘.  
아리아, {FriendlyName} 가장 밝게 해줘  
아리아, {DeviceType} 설정 밝기 최대로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/BrightnessControl/directives/SetBrightnessMax)"%}
```json
{
  "version": 1,
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "action": {
    "command": {
      "smartHomeCapability": "BrightnessControl",
      "smartHomeDirective": "SetBrightnessMax"
    },
    "smartHomeDevices": [
      {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "deviceModelName": "example_model_name",
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

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "brightnessLevel": 100
      }
    }
  ]
}
```
{% endcode %}

SetBrightnessMax Directive Response parameter details

| parameter name  | description                                                              | type         |
|:----------------|:-------------------------------------------------------------------------|:-------------|
| brightnessLevel | SmartHomeDevice의 밝기를 조절한 이후의 설정 밝기입니다.<br/>제어를 마친 이후의 밝기를 기준으로 응답해야 합니다. | integer(100) |

### SetBrightnessMin

**Directive 정보**  
SmartHomeDevice의 밝기를 최저 단계로 설정한다.  
Capability : BrightnessControl  
Directive : SetBrightnessMin

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 밝기 최저로 설정해줘.  
아리아, {FriendlyName} 가장 어둡게 해줘  
아리아, {DeviceType} 설정 밝기 최하 단계로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/BrightnessControl/directives/SetBrightnessMin)"%}
```json
{
  "version": 1,
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "action": {
    "command": {
      "smartHomeCapability": "BrightnessControl",
      "smartHomeDirective": "SetBrightnessMin"
    },
    "smartHomeDevices": [
      {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "deviceModelName": "example_model_name",
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

#### Sample Response

{% code %}
```json
{
  "requestId": "2019093019f78107f1a36147688c699703f5373a56",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "123456",
        "deviceTypeCode": "LIGHT",
        "deviceModelName": "example_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "조명",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "brightnessLevel": 1
      }
    }
  ]
}
```
{% endcode %}

SetBrightnessMin Directive Response parameter details

| parameter name  | description                                                              | type    |
|:----------------|:-------------------------------------------------------------------------|:--------|
| brightnessLevel | SmartHomeDevice의 밝기를 조절한 이후의 설정 밝기입니다.<br/>제어를 마친 이후의 밝기를 기준으로 응답해야 합니다. | integer |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

