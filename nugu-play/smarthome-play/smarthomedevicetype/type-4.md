---
depth_order: 4
---

# 공기센서

NUGU스마트홈에서 제공하는 기종 중 공기센서(AIR_SENSOR) 기종에 대한 설명입니다. 공기센서에서 측정한 주변 공기 상태 조회 기능을 제공합니다.

## Discovery

NUGU스마트홈에 공기센서(AIR_SENSOR)를 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

### Discovery Request 예시

{% code titls="(POST, /nugu/v1/devices)"%}
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
      "deviceTypeCode": "AIR_SENSOR",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyName": "거실",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "airQualityCheck": {
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

## Recommended Capabilities

NUGU스마트홈을 통해 공기센서(AIR_SENSOR)를 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                          | Description             | 예시발화               |
|:--------------------------------------------------------------------|:------------------------|:-------------------|
| [AirQualityCheck](../smarthomecapability/airqualitycheck-interface) | 공기센서를 통한 공기상태 조회 기능입니다. | "공기센서에서 공기상태 조회해줘" |

