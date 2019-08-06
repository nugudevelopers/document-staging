---
depth_order: 7
---

# 로봇청소기

NUGU스마트홈에서 제공하는 기종 중 로봇청소기(ROBOT_CLEANER) 기종에 대한 정보입니다. 로봇청소기는 로봇청소기 청소 시작 및 중지 등의 동작 제어 기능과 충전 기능을 지원합니다. 청소 중지 명령 시에 충전을 하도록 제어하도록 구현하는 것을 권장합니다.

## Discovery

NUGU스마트홈에 로봇청소기(ROBOT_CLEANER)를 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

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
      "deviceTypeCode": "ROBOT_CLEANER",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyName": "거실",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "chargeControl": {},
        "powerControl": {}
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

NUGU스마트홈을 통해 로봇청소기(ROBOT_CLEANER)를 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                      | Description                                               | 예시발화            |
|:----------------------------------------------------------------|:----------------------------------------------------------|:----------------|
| [PowerControl](../smarthomecapability/powercontrol-interface)   | 로봇청소기 전원 제어 기능입니다.<br/>전원을 켜고 끄며 동작을 제어하는 기능들로 구성되어 있습니다. | "로봇청소기 청소 시작해줘" |
| [ChargeControl](../smarthomecapability/chargecontrol-interface) | 로봇청소기 전원 충전 관련 제어 기능입니다.<br/>충전을 시작/중지하는 기능들로 구성되어 있습니다.  | "로봇청소기 충전해줘"    |

