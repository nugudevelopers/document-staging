---
depth_order: 2
---

# 가습기

NUGU스마트홈에서 제공하는 기종 중 가습기(HUMIDIFICATION) 기종에 대한 정보입니다. 가습기는 풍량 제어 등을 통해 주변의 습도상태를 제어하는 기기로 전원제어 및 가습수준에 따른 풍량제어, 각 모델별로 지원하는 모드 설정 기능, 종료예약 설정 등의 기능을 제공합니다.

## Discovery

NUGU스마트홈에 가습기(HUMIDIFICATION)를 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

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
      "deviceTypeCode": "HUMIDIFICATION",
      "deviceTypeName": "가습기",
      "deviceModelName": "example humidification",
      "friendlyName": "거실",
      "manufacturer": "example manufacturer",
      "supportedCapabilities": {
        "powerControl": {
        },
        "airflowControl": {
          "supportedAirflowTypes": [
            "HIGH",
            "MIDDLE",
            "LOW",
            "AUTO"
          ] // 지원 가능한 Airflow 타입 참고.
        },
        "modeControl": {
          "supportedModes": [
            "DEHUMIDITY",
            "COMFORT",
            "AIR_BLAST",
            "ENERGY_SAVING"
          ] // 지원 가능한 Mode 타입 참고.
        },
        "setTimeControl": {
        },
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

NUGU스마트홈을 통해 가습기(HUMIDIFICATION)를 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                        | Description                                                                           | 예시발화                |
|:------------------------------------------------------------------|:--------------------------------------------------------------------------------------|:--------------------|
| [PowerControl](../smarthomecapability/powercontrol-interface)     | 가습기 전원 제어 기능입니다.<br/>전원을 켜고 끄며 동작을 제어하는 기능들로 구성되어 있습니다.                               | "가습기 켜줘"            |
| [AirflowControl](../smarthomecapability/airflowcontrol-interface) | 가습기의 풍량 제어 기능입니다.<br/>설정 풍량에 대한 상세한 정보는 SmartHomeAttribute : AirflowType을 참조하시기 바랍니다. | "가습기 풍량 강풍으로 설정해줘"  |
| [ModeControl](../smarthomecapability/modecontrol-interface)       | 가습기의 모드 제어 기능입니다.<br/>설정 모드에 대한 상세한 정보는 SmartHomeAttribute : Mode를 참조하시기 바랍니다.        | "가습기 쾌면모드로 설정해줘"    |
| [SetTimeControl](../smarthomecapability/settimecontrol-interface) | 가습기 기기의 시간 설정 기능입니다.                                                                  | "가습기 1시간 후로 종료예약해줘" |

