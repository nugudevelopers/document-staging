---
depth_order: 2
---

# AirQualityCheck Interface

NUGU 스마트홈 AirQualityCheck Capability Interface는 NUGU 스마트홈에 등록된 SmartHomeDevice에서 주변 공기 상태를 측정하는 방식에 대한 설명입니다. 공기질은 1부터 10단계까지의 단계로 응답할 수 있으며 숫자가 작을수록 공기질이 좋은 상태입니다.

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
      "deviceTypeCode": "AIR_CLEANER",
      "deviceTypeName": "공기청정기",
      "deviceModelName": "example device_model_name",
      "friendlyNameSuggestion": "거실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "airQualityCheck": {} // 별도의 파라미터는 없으나 예시와 같이 빈 객체를 응답해야 함.
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
AirQualityCheck Capability 의 경우 Capability에 속한 파라미터가 없습니다.

그러나 해당 디바이스가 공기 상태 질의가 가능한(AirQualityCheck Capability 를 지원하는) 디바이스라는 것을 NUGU SmartHome 플랫폼에 알려주기 위해서는 위의 응답 예시와 같이 빈 객체를 응답해야 합니다.
{% endalerts %}

SmartHomeDevice Attribute parameters

| Attribute        | Description                                                                                                                              |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------|
| customData       | Discovery 시 SmartHomeServiceProvider가 응답할 수 있는 SmartHomeDevice의 부가정보입니다.<br/>customData는 해당 SmartHomeDevice의 제어요청 시 Request에 포함되어 전달됩니다. |
| connectionStatus | 디바이스 연결상태.<br/>현재 제어가 불가능한 상태의 디바이스인 경우 false 로 응답해야 합니다.                                                                                |

## Directive

NUGU SmartHome AirQualityCheck Capability는 공기상태를 조회하는 AskAirQuality Directive를 지원합니다.

### AskAirQuality

**Directive 정보**  
SmartHomeDevice에서 측정한 주변 공기상태를 조회한다.  
Capability : AirQualityCheck  
Directive : AskAirQuality

**Voice Command**  
아리아, {FriendlyName} {DeviceType} 공기상태 알려줘.  
아리아, {FriendlyName} 공기상태 어때?  
아리아, {DeviceType} 공기상태 조회해줘

#### Sample Request

{% code title="Control Request 예시 (POST, /nugu/v1/capabilities/AirQualityCheck/directives/AskAirQuality)"%}
```json
{
  "version": 1,
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "action": {
    "command": {
      "smartHomeCapability": "AirQualityCheck",
      "smartHomeDirective": "AskAirQuality"
    },
    "smartHomeDevices": [
      {
        "id": "1234567",
        "deviceTypeCode": "AIR_CLEANER",
        "deviceTypeName": "공기청정기",
        "deviceModelName": "example device_model_name",
        "friendlyName": "거실",
        "manufacturer": "example manufacturer",
        "supportedCapabilities": {
          "airQualityCheck": {}
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
  "requestId": "20190916109ad8219c251742859c56f6ec3c4700bb",
  "data": [
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        "id": "1234567",
        "deviceTypeCode": "AIR_CLEANER",
        "deviceModelName": "example device_model_name",
        "friendlyName": "거실",
        "deviceTypeName": "공기청정기",
        "customData": {
          "foo": "bar"
        }
      },
      "properties": {
        "airQuality": 1
      }
    }
  ]
}
```
{% endcode %}

AskAirQuality Directive Response parameter details

| parameter name | description                                                                             | type  |
|:---------------|:----------------------------------------------------------------------------------------|:------|
| airQuality     | SmartHomeDevice에서 측정한 주변 공기상태정보입니다.<br/>1부터 10까지의 단계로 응답할 수 있으며 숫자가 작을수록 공기질이 좋은 상태입니다. | 1~10  |

## Error & Exception

해당 Capability/Directive에서 응답 시 사용할 수 있는 ErrorCode는 [SmartHomeError](../smarthomeerror)를 참조해주시기 바랍니다.

### Sample Error Response

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
