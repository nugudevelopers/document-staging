---
depth_order: 7
---

# HumidityControl Interface

NUGU스마트홈 HumidityControl Capability Interface는 NUGU스마트홈에 등록된 SmartHomeDevice의 습도제어방식에 대한 설명입니다. 제어하고자 하는 습도는 해당 공간의 습도 비율로 %단위로 설정하며 습도를 제어하는 기능을 가진 SmartHomeDevice들을 지원합니다.

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
      "type": "DEHUMIDIFICATION",
      "modelName": "example dehumidification",
      "friendlyNameSuggestion": "거실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "humidityControl": {
          "minHumidity": "10",
          "maxHumidity": "70",
          "humidityStep": "5"
        } // "습도 올려줘" 등 HumidityControl Capability 를 사용하기 위해서는 이 프로퍼티를 supportedCapabilities 에 포함해야 함.
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

| Attribute    | Description                                                                                                                              |
|:-------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| minHumidity  | 해당 SmartHomeDevice가 지원하는 최저 자체 설정 습도입니다.                                                                                                 |
| maxHumidity  | 해당 SmartHomeDevice가 지원하는 최고 자체 설정 습도입니다.                                                                                                 |
| humidityStep | 해당 SmartHomeDevice의 습도 상승/하강 시의 기본 제어 단위입니다.<br/>별도의 사용자 발화가 없을 시 해당 단위만큼 조절합니다.                                                         |
| customData   | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |

## Directive

NUGU스마트홈 HumidityControl Capability는 설정습도 및 실제습도를 조회하는 AskHumidity, 설정 습도를 제어하는 SetHumidity, IncreaseHumidity, DecreaseHumidity, SetHumidityMax, SetHumidityMin 등의 Directive를 지원합니다.

### AskHumidity

**Directive 정보**  
SmartHomeDevice에서 측정한 실제습도와 SmartHomeDevice에 설정된 설정습도를 조회한다.  
Capability : HumidityControl  
Directive : AskHumidity

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 알려줘.  
아리아, {FriendlyName} 습도 어떻게 설정되어 있어?  
아리아, {DeviceType} 습도 조회해줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/AskHumidity)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "AskHumidity"
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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
        "currentHumidity": "55" // directive 마다 필요한 property 채워서 응답
      }
    }
  ]
}
```
{% endcode %}

AskHumidity Directive Response parameter details

| parameter name  | description                                                     | type   |
|:----------------|:----------------------------------------------------------------|:-------|
| currentHumidity | SmartHomeDevice에서 측정한 해당 공간의 실제 습도정보입니다.<br/>사용자에게 실제습도로 안내됩니다. | double |

### SetHumidity

**Directive 정보**  
SmartHomeDevice의 설정습도를 사용자가 발화한 특정 습도로 설정한다.  
Capability : HumidityControl  
Directive : SetHumidity

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 55퍼센트로 설정해줘.  
아리아, {FriendlyName} 습도 70퍼센트로 설정해줘.  
아리아, {DeviceType} 습도 20으로 설정해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/SetHumidity)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "SetHumidity",
      "parameters": {
        "humidityLevel": "40"
      }
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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

SetHumidity Directive Request parameter details

| parameter name | description                                              | type   |
|:---------------|:---------------------------------------------------------|:-------|
| humidityLevel  | 사용자가 SmartHomeDevice에 설정하고자 하는 습도의 발화 정보입니다.<br/>%단위입니다. | double |

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
        "humidityLevel": "50" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetHumidity Directive Response parameter details

| parameter name | description                                                    | type   |
|:---------------|:---------------------------------------------------------------|:-------|
| humidityLevel  | SmartHomeDevice를 설정한 이후의 설정습도입니다.<br/>제어를 마친 이후의 습도로 응답해야 합니다. | double |

### IncreaseHumidity

**Directive 정보**  
SmartHomeDevice의 설정습도를 증가시킨다.  
Capability : HumidityControl  
Directive : IncreaseHumidity

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 올려줘.  
아리아, {FriendlyName} 습도 30% 올려서 설정해줘.  
아리아, {DeviceType} 습도 10% 올려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/IncreaseHumidity)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "IncreaseHumidity",
      "parameters": {
        "humidityDelta": "10"
      }
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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

IncreaseHumidity Directive request parameter details

| parameter name | description                                                                             | type   |
|:---------------|:----------------------------------------------------------------------------------------|:-------|
| humidityDelta  | 설정습도를 몇 % 올릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우 ("parameters": null) 5% 만큼 올리도록 설정합니다. | double |

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
        "humidityLevel": "50" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

IncreaseHumidity Directive response parameter details

| parameter name | description                                                    | type   |
|:---------------|:---------------------------------------------------------------|:-------|
| humidityLevel  | SmartHomeDevice를 설정한 이후의 설정습도입니다.<br/>제어를 마친 이후의 습도로 응답해야 합니다. | double |

### DecreaseHumidity

**Directive 정보**  
SmartHomeDevice의 설정 습도를 감소시킨다.  
Capability : HumidityControl  
Directive : DecreaseHumidity

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 내려줘.  
아리아, {FriendlyName} 습도 30% 내려서 설정해줘.  
아리아, {DeviceType} 습도 10% 내려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/DecreaseHumidity)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "DecreaseHumidity",
      "parameters": {
        "humidityDelta": "40"
      }
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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

DecreaseHumidity Directive request parameter details

| parameter name | description                                                                             | type   |
|:---------------|:----------------------------------------------------------------------------------------|:-------|
| humidityDelta  | 설정습도를 몇 % 올릴지에 대한 사용자 발화 정보입니다.<br/>해당 정보가 없을 경우 ("parameters": null) 5% 만큼 내리도록 설정합니다. | double |

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
        "humidityLevel": "40" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

DecreaseHumidity Directive response parameter details

| parameter name | description                                                    | type   |
|:---------------|:---------------------------------------------------------------|:-------|
| humidityLevel  | SmartHomeDevice를 설정한 이후의 설정습도입니다.<br/>제어를 마친 이후의 습도로 응답해야 합니다. | double |

### SetHumidityMax

**Directive 정보**  
SmartHomeDevice를 최고 설정습도로 설정한다.  
Capability : HumidityControl  
Directive : SetHumidityMax

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 최고로 설정해줘.  
아리아, {FriendlyName} 습도 가장 높게 해줘  
아리아, {DeviceType} 설정습도 최대로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/SetHumidityMax)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "SetHumidityMax",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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
        "humidityLevel": "70" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetHumidityMax Directive Response parameter details

| parameter name | description                                                    | type   |
|:---------------|:---------------------------------------------------------------|:-------|
| humidityLevel  | SmartHomeDevice를 설정한 이후의 설정습도입니다.<br/>제어를 마친 이후의 습도로 응답해야 합니다. | double |
| maxHumidity    | 해당 SmartHomeDevice가 지원하는 최고 습도입니다.                             | double |

### SetHumidityMin

**Directive 정보**  
SmartHomeDevice를 최저 설정습도로 설정한다.  
Capability : HumidityControl  
Directive : SetHumidityMin

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 습도 최저로 설정해줘.  
아리아, {FriendlyName} 습도 가장 낮게 해줘  
아리아, {DeviceType} 설정습도 최소로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/HumidityControl/directives/SetHumidityMin)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "HumidityControl",
      "smartHomeDirective": "SetHumidityMin",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "D1234567",
        "type": "DEHUMIDIFICATION",
        "modelName": "example dehumidification",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "humidityControl": {}
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
        "humidityLevel": "30" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

SetHumidityMin Directive Response parameter details

| parameter name | description                                                    | type   |
|:---------------|:---------------------------------------------------------------|:-------|
| humidityLevel  | SmartHomeDevice를 설정한 이후의 설정습도입니다.<br/>제어를 마친 이후의 습도로 응답해야 합니다. | double |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

