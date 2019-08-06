---
depth_order: 1
---

# AirflowControl Interface

NUGU 스마트홈 AirflowControl Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice의 풍량제어방식에 대한 설명입니다. 특정 풍량을 설정하거나 풍량 단계를 상향, 하향 조정하는 등의 Directive들로 구성되어 있으며 팬 및 풍량, 풍속을 제어할 수 있는 기능이 있는 모든 SmartHomeDevice를 지원합니다.

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
        "airflowControl": {
          "supportedAirflowTypes": [
            "HIGH",
            "MIDDLE",
            "LOW",
            "AUTO"
          ] // 지원 가능한 Airflow 타입 참고.
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

{% alerts style="info" %}
위의 Discovery 응답 예시에서 supportedCapabilities 는 이해를 돕기 위해 airflowControl 만을 속성으로 가지고 있으나, 실제로는 해당 디바이스가 지원가능한 모든 capability 에 대해서 응답해야 합니다.

각각의 Capability 별로 어떤 속성을 가질 수 있는지는 다른 Capability 문서의 Discovery 섹션을 참고하세요.
{% endalerts %}

SmartHomeDevice Attribute Parameters

| Attribute             | Description                                                                                                                                                                                                                                       |
|:----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| supportedAirflowTypes | 해당 SmartHomeDevice가 지원하는 AirflowType의 명칭입니다.<br/>AirflowType은 NUGU스마트홈에서 지원하는 명칭 중 선택해서 응답할 수 있으며, 지원하는 AirflowType의 명칭은 [AirflowType](../smarthomeattribute#airflowtype)를 참조하시기 바랍니다.<br/>지원하는 AirflowType은 각 Device별로 Array 형태로 복수개 전달할 수 있습니다. |
| customData            | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다.                                                                                                          |
| connectionStatus      | 디바이스 연결상태.<br/>현재 제어가 불가능한 상태의 디바이스인 경우 false 로 응답해야 합니다.                                                                                                                                                                                         |

## Directive

NUGU SmartHome AirflowControl Capability는 풍량을 조회하는 AskAirflow, 풍량을 제어하는 SetAirflow, IncreaseAirflow, DecreaseAirflow, SetAirflowMax, SetAirflowMin 등의 Directive를 지원합니다.

### SetAirflow

**Directive 정보**  
SmartHomeDevice의 풍량을 사용자가 발화한 특정 풍량으로 설정한다.  
Capability : AirflowControl  
Directive : SetAirflow

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 강풍으로 설정해줘.  
아리아, {FriendlyName} 풍량 약풍으로 설정해줘.  
아리아, {DeviceType} 풍량 3단계로 설정해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/SetAirflow)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "SetAirflow",
      "parameters": {
        "airflowType": "LOW",
        "rawAirflowType": "약풍"
      }
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

SetAirflow Directive Request parameter details

| parameter name | description                                                                                                               | type   |
|:---------------|:--------------------------------------------------------------------------------------------------------------------------|:-------|
| airflowType    | 설정하고자 하는 airflowType의 사용자 발화 정보.<br/>해당 parameter의 value는 Device Discovery 당시 Response한 supprtedAirflowTypes 중 하나로 요청됩니다. | string |
| rawAirflowType | 사용자가 실제 발화한 AirflowType.<br/>정규화 되지 않은 값                                                                                  | string |

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "12345678",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceModelName": "삼성전자 스마트 에어컨",
        "friendlyName": "거실",
        "deviceTypeName": "에어컨",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airflowType": "LOW"
      }
    }
  ]
}
```
{% endcode %}

SetAirflow Directive Response parameter details

| parameter name | description                                                                | type   |
|:---------------|:---------------------------------------------------------------------------|:-------|
| airflowType    | 설정한 후에 SmartHomeDevice의 airflowType.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

### AskAirflow

**Directive 정보**  
SmartHomeDevice에 설정된 풍량을 조회한다.  
Capability : AirflowControl  
Directive : AskAirflow

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 알려줘.  
아리아, {FriendlyName} 풍량 어떻게 설정되어 있어?  
아리아, {DeviceType} 풍량 조회해줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/AskAirflow)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "AskAirflow",
      "parameters": null
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
            ]
          }
        },
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airflowType": "HIGH"
      }
    }
  ]
}
```
{% endcode %}

AskAirflow Directive Response parameter details

| parameter name | description                                                                      | type   |
|:---------------|:---------------------------------------------------------------------------------|:-------|
| airflowType    | 현재 설정되어 있는 SmartHomeDevice의 airflowType정보.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

### IncreaseAirflow

**Directive 정보**  
SmartHomeDevice의 설정 풍량을 증가시킨다.  
Capability : AirflowControl  
Directive : IncreaseAirflow

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 올려줘.  
아리아, {FriendlyName} 풍량 1단계 올려서 설정해줘.  
아리아, {DeviceType} 풍량 3단계 올려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/IncreaseAirflow)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "IncreaseAirflow"
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

IncreaseAirflow Directive request parameter details

| parameter name | description                                               | type  |
|:---------------|:----------------------------------------------------------|:------|
|                | 별도의 파라미터는 없고, 1단계씩 올려야 합니다.<br/>n 단계 올리는 스펙은 추후 지원 예정입니다. |       |

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
            ]
          }
        },
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airflowType": "HIGH" // 올려서 최종적으로 설정한 풍량 타입 응답.
      }
    }
  ]
}
```
{% endcode %}

IncreaseAirflow Directive response parameter details

| parameter name | description                                                                             | type   |
|:---------------|:----------------------------------------------------------------------------------------|:-------|
| airflowType    | Airflow 증가 후 최종 설정된 SmartHomeDevice의 AirflowType.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

### DecreaseAirflow

**Directive 정보**  
SmartHomeDevice의 설정 풍량을 감소시킨다.  
Capability : AirflowControl  
Directive : DecreaseAirflow

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 내려줘.  
아리아, {FriendlyName} 풍량 1단계 내려서 설정해줘.  
아리아, {DeviceType} 풍량 2단계 내려줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/DecreaseAirflow)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "DecreaseAirflow"
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

DecreaseAirflow Directive request parameter details

| parameter name | description                                             | type  |
|:---------------|:--------------------------------------------------------|:------|
|                | 별도의 파라미터는 없 1단계씩 내려야 합니다.<br/>n 단계 내리는 스펙은 추후 지원 예정입니다. |       |

#### Sample Response

{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83", // request로 받은 값을 그대로 응답
  "data": [
    {
      "resultCode": "OK", // 에러일 경우 에러코드 응답
      "properties": {
        "airflowType": "강풍" // directive 마다 필요한 property 채워서 응답.
      }
    }
  ]
}
```
{% endcode %}

DecreaseAirflow Directive response parameter details

| parameter name | description                                      | type   |
|:---------------|:-------------------------------------------------|:-------|
| airflowType    | Airflow 감소 후 최종 설정된 SmartHomeDevice의 AirflowType | string |

### SetAirflowMax

**Directive 정보**  
SmartHomeDevice을 최고 풍량으로 설정한다.  
Capability : AirflowControl  
Directive : SetAirflowMax

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 최고로 설정해줘.  
아리아, {FriendlyName} 풍량 가장 높게 해줘  
아리아, {DeviceType} 풍량 최대로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/SetAirflowMax)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "SetAirflowMax"
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
            ]
          }
        },
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airflowType": "HIGH" // 올려서 최종적으로 설정한 풍량 타입 응답.
      }
    }
  ]
}
```
{% endcode %}

SetAirflowMax Directive Response parameter details

| parameter name | description                                       | type   |
|:---------------|:--------------------------------------------------|:-------|
| airflowType    | Airflow 감소 후 최종 설정 된 SmartHomeDevice의 AirflowType | string |

### SetAirflowMin

**Directive 정보**  
SmartHomeDevice을 최저 풍량으로 설정한다.  
Capability : AirflowControl  
Directive : SetAirflowMin

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 풍량 최저로 설정해줘.  
아리아, {FriendlyName} 풍량 가장 낮게 해줘  
아리아, {DeviceType} 풍량 최소로 해줘.

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirflowControl/directives/SetAirflowMin)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "SetAirflowMin"
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1234567",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
            ]
          }
        },
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airflowType": "LOW" // 내려서 최종적으로 설정한 풍량 타입 응답.
      }
    }
  ]
}
```
{% endcode %}

SetAirflowMin Directive response parameter details

| parameter name | description                                                                | type   |
|:---------------|:---------------------------------------------------------------------------|:-------|
| airflowType    | 설정한 후에 SmartHomeDevice의 airflowType.<br/>해당 parameter의 value로 사용자에게 안내됩니다. | string |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

Sample Error Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "DeviceTurnedOff",
      "smartHomeDevice": {
        "id": "D68856420232",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceModelName": "삼성전자 스마트 에어컨",
        "friendlyName": "거실",
        "deviceTypeName": "에어컨",
        "customData": {
          "foo": "bar"
        }
      }
    }
  ]
}
```
{% endcode %}

{% alerts style="info" %}
사용자가 여러개 디바이스를 동시에 제어하려고 하는 경우, 아래와 같이 여러 디바이스에 대해 요청이 갈 수 있습니다. 이 때 각각의 기기를 제어한 뒤 제어 결과를 리스트로 응답해야 합니다.

이는 모든 제어 요청에 대해 공통으로 해댱되는 내용입니다.

응답으로는 각 디바이스별 성공/실패 여부를 data의 하위 리스트에 담을 수 있습니다
{% endalerts %}

#### Sample Request

{% code %}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirflowControl",
      "smartHomeDirective": "SetAirflowMin"
    },
    "smartHomeDevices": [
      {
        "id": "1111",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
            ]
          }
        },
        "customData": {
          "foo": "bar"
        }
      },
      {
        "id": "2222",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "deviceModelName": "example air_conditioner",
        "friendlyName": "안방",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airflowControl": {
            "supportedAirflowTypes": [
              "HIGH",
              "MIDDLE",
              "LOW",
              "AUTO"
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

#### Sample Response

{% code %}
```json
{
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1111",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "friendlyName": "거실",
        "deviceModelName": "example air_conditioner",
        "customData": {
          "foo": "bar"
        }
      }
    },
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "2222",
        "deviceTypeCode": "AIR_CONDITIONER",
        "deviceTypeName": "에어컨",
        "friendlyName": "안방",
        "deviceModelName": "example air_conditioner",
        "customData": {
          "foo": "bar"
        }
      }
    }
  ]
}
```
{% endcode %}
