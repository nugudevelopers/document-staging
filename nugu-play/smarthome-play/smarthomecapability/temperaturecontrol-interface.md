---
depth_order: 13
---

# TemperatureControl Interface

NUGU 스마트홈 TemperatureControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 온도제어방식에 대한 설명입니다. TemperatureControl Interface는 주변 온도를 특정 온도로 설정하기 위한 스마트홈 기기의 제어 명령입니다.

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
      "deviceTypeName": "에어컨",
      "deviceModelName": "example air_conditioner",
      "friendlyNameSuggestion": "거실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "temperatureControl": {
          "deviceTemperatureControl": {
            "minTemperature": "18",
            "maxTemperature": "29",
            "temperatureStep": "1"
          }
        } // "온도 25도로 설정해줘" 등 TemperatureControl 을 지원하기 위해서는 이 property 를 supportedCapabilities 에 포함해야 합니다.
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

| Attribute       | Description                                                                                                                              |
|:----------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| minTemperature  | 해당 SmartHomeDevice가 지원하는 최저 섭씨 온도입니다.                                                                                                    |
| maxTemperature  | 해당 SmartHomeDevice가 지원하는 최고 섭씨 온도입니다.                                                                                                    |
| temperatureStep | 해당 SmartHomeDevice의 온도 상승/하강 시의 기본 제어 단위입니다.<br/>별도의 사용자 발화가 없을 시 해당 단위만큼 조절합니다.                                                         |
| customData      | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU SmartHome TemperatureControl Capability는 설정온도 및 실제온도를 조회하는 AskTemperature, 설정온도를 제어하는 SetTemperature, IncreaseTemperature, DecreaseTemperature, SetTemperatureMax, SetTemperatureMin 등의 Directive를 지원합니다.

### AskTemperature

**Directive 정보**  
SmartHomeDeivce에서 측정한 실제온도와 SmartHomeDevice에 설정된 설정온도를 조회한다.  
Capability : TemperatureControl  
Directive : AskTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 알려줘.  
아리아, {FriendlyName} 온도 어떻게 설정되어 있어?  
아리아, {DeviceType} 온도 조회해줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/AskTemperature)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "AskTemperature",
      "parameters": null
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
          "temperatureControl": {}
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
        "currentTemperature": "25", // directive 마다 필요한 property 채워서 응답.
        "temperatureLevel": "20"
      }
    }
  ]
}
```
{% endcode %}

AskTemperature Directive Response parameter details

| parameter name     | description                                                     | type   |
|:-------------------|:----------------------------------------------------------------|:-------|
| currentTemperature | SmartHomeDevice에서 측정한 해당 공간의 실제 온도정보입니다.<br/>사용자에게 실제온도로 안내됩니다. | double |
| temperatureLevel   | SmartHomeDevice에 설정된 온도정보입니다.<br/>사용자에게 설정온도로 안내됩니다.            | double |

### SetTemperature

**Directive 정보**  
SmartHomeDevice의 설정온도를 사용자가 발화한 특정 온도로 설정한다.  
Capability : TemperatureControl  
Directive : SetTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 25도로 설정해줘.  
아리아, {FriendlyName} 온도 30.5도로 설정해줘.  
아리아, {DeviceType} 온도 19도로 설정해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/SetTemperature)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "SetTemperature",
      "parameters": {
        "temperatureLevel": "20"
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
          "temperatureControl": {}
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

SetTemperature Directive Request parameter details

| parameter name   | description                                  | type   |
|:-----------------|:---------------------------------------------|:-------|
| temperatureLevel | 사용자가 SmartHomeDevice에 설정하고자 하는 온도의 발화 정보입니다. | double |

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
        "temperatureLevel": "20" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetTemperature Directive Response parameter details

| parameter name   | description                                                    | type   |
|:-----------------|:---------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

### IncreaseTemperature

**Directive 정보**  
SmartHomeDevice의 설정온도를 증가시킨다.  
Capability : TemperatureControl  
Directive : IncreaseTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 올려줘.  
아리아, {FriendlyName} 온도 3도 올려서 설정해줘.  
아리아, {DeviceType} 온도 10.5도 올려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/IncreaseTemperature)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "IncreaseTemperature",
      "parameters": {
        "temperatureDelta": "3"
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
          "temperatureControl": {}
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

IncreaseTemperature Directive request parameter details

| parameter name   | description                                                              | type   |
|:-----------------|:-------------------------------------------------------------------------|:-------|
| temperatureDelta | 설정온도를 몇 도(섭씨) 올릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우에는 1도 만큼 올리도록 설정합니다. | double |

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
        "temperatureLevel": "23" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

IncreaseTemperature Directive response parameter details

| parameter name   | description                                                    | type   |
|:-----------------|:---------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

### DecreaseTemperature

**Directive 정보**  
SmartHomeDevice의 설정 온도를 감소시킨다.  
Capability : TemperatureControl  
Directive : DecreaseTemperature

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 내려줘.  
아리아, {FriendlyName} 온도 3도 내려서 설정해줘.  
아리아, {DeviceType} 온도 10.5도 내려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/DecreaseTemperature)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "DecreaseTemperature",
      "parameters": {
        "temperatureDelta": "3"
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
          "temperatureControl": {}
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

DecreaseTemperature Directive request parameter details

| parameter name   | description                                                              | type   |
|:-----------------|:-------------------------------------------------------------------------|:-------|
| temperatureDelta | 설정온도를 몇 도(섭씨) 내릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우에는 1도 만큼 내리도록 설정합니다. | double |

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
        "temperatureLevel": "23" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

DecreaseTemperature Directive response parameter details

| parameter name   | description                                                    | type   |
|:-----------------|:---------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

### SetTemperatureMax

**Directive 정보**  
SmartHomeDevice를 최고 설정온도로 설정한다.  
Capability : TemperatureControl  
Directive : SetTemperatureMax

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 최고로 설정해줘.  
아리아, {FriendlyName} 온도 가장 높게 해줘  
아리아, {DeviceType} 설정온도 최대로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/SetTemperatureMax)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "SetTemperatureMax",
      "parameters": null
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
          "temperatureControl": {}
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
        "temperatureLevel": "30" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetTemperatureMax Directive Response parameter details

| parameter name   | description                                                    | type   |
|:-----------------|:---------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

### SetTemperatureMin

**Directive 정보**  
SmartHomeDevice를 최저 설정온도로 설정한다.  
Capability : TemperatureControl  
Directive : SetTemperatureMin

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 온도 최저로 설정해줘.  
아리아, {FriendlyName} 온도 가장 낮게 해줘  
아리아, {DeviceType} 설정온도 최소로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/TemperatureControl/directives/SetTemperatureMin)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "TemperatureControl",
      "smartHomeDirective": "SetTemperatureMin",
      "parameters": null
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
          "temperatureControl": {}
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
        "temperatureLevel": "18" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetTemperatureMin Directive Response parameter details

| parameter name   | description                                                    | type   |
|:-----------------|:---------------------------------------------------------------|:-------|
| temperatureLevel | SmartHomeDevice를 설정한 이후의 설정온도입니다.<br/>제어를 마친 이후의 온도로 응답해야 합니다. | double |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

