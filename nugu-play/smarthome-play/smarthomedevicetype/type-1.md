---
depth_order: 1
---

# 가스차단기

NUGU스마트홈에서 제공하는 기종 중 가스차단기(GAS_BREAKER) 기종에 대한 정보입니다. 가스차단기는 닫는 기능을 제공하며 안전 상의 이유로 음성제어 시 여는 기능은 제공하고 있지 않습니다.

## Discovery

NUGU스마트홈에 가스차단기(GAS_BREAKER)을 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

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
      "deviceTypeCode": "GAS_BREAKER",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyName": "부엌",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "powerControl": {
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

NUGU스마트홈을 통해 가스차단기(GAS_BREAKER)를 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                    | Description                                               | 예시발화        |
|:--------------------------------------------------------------|:----------------------------------------------------------|:------------|
| [PowerControl](../smarthomecapability/powercontrol-interface) | 가스차단기 전원 제어 기능입니다.<br/>전원을 켜고 끄며 동작을 제어하는 기능들로 구성되어 있습니다. | "가스차단기 닫아줘" |

