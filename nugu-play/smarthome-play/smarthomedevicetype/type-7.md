---
depth_order: 8
---

# 보일러

NUGU스마트홈에서 제공하는 기종 중 보일러(BOILER) 기종에 대한 정보입니다. 보일러는 공간에 대한 난방 제어 장치로 보일러 동작을 위한 전원 제어 기능 및 목표 설정 온도 제어, 각 모델별로 지원하는 모드 설정 기능, 종료예약 설정 기능을 지원합니다.

## Discovery

NUGU스마트홈에 보일러(BOILER)를 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

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
      "deviceTypeCode": "BOILER",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyName": "거실",
      "manufacturer": "example_manufacturer",
      "supportedCapabilities": {
        "setTimeControl": {},
        "modeControl": {
          "supportedModes": [
            "HEAT_ROOM",
            "HOTWATER",
            "OUTSIDE",
            "SLEEP"
          ]
        },
        "powerControl": {},
        "temperatureControl": {
          "minTemperature": "21",
          "maxTemperature": "40",
          "temperatureStep": "1"
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

NUGU스마트홈을 통해 보일러(BOILER)를 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                                | Description                                                                    | 예시발화                |
|:--------------------------------------------------------------------------|:-------------------------------------------------------------------------------|:--------------------|
| [PowerControl](../smarthomecapability/powercontrol-interface)             | 보일러 전원 제어 기능입니다.<br/>전원을 켜고 끄며 동작을 제어하는 기능들로 구성되어 있습니다.                        | "보일러 켜줘"            |
| [TemperatureControl](../smarthomecapability/temperaturecontrol-interface) | 보일러의 설정 온도 제어 기능입니다.<br/>기기 자체의 온도가 아닌 주변 온도 및 희망 온도에 대한 기능들로 구성되어 있습니다.       | "보일러 온도 27도로 설정해줘"  |
| [ModeControl](../smarthomecapability/modecontrol-interface)               | 보일러의 모드 제어 기능입니다.<br/>설정 모드에 대한 상세헌 정보는 SmartHomeAttribute : Mode를 참조하시기 바랍니다. | "보일러 실내난방모드로 설정해줘"  |
| [SetTimeControl](../smarthomecapability/settimecontrol-interface)         | 보일러 기기의 시간 설정 기능입니다.                                                           | "보일러 1시간 후로 종료예약해줘" |

