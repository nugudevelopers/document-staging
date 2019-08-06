---
depth_order: 22
---

# 조명

NUGU스마트홈에서 제공하는 기종 중 조명(LIGHT) 기종에 대한 정보입니다. 조명은 전원 제어 기능 및 모델에 따른 밝기 조절, 색상 변경에 대한 기능을 지원합니다.

### Discovery

NUGU스마트홈에 조명(LIGHT)를 등록하고자 할 때 Discovery Request/Response의 예시입니다. 사용자가 NUGU 모바일 앱을 통해 IoT ServiceProvider의 계정을 연동한 후 스마트홈 기기를 등록하려고 시도할 때 NUGU스마트홈이 SmartHomeBackendProxy에 Discovery 요청을 보내고 이 때 등록할 수 있는 스마트홈 기기 정보를 응답해야 합니다.

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
      "deviceTypeCode": "LIGHT",
      "deviceTypeName": "example_device_type",
      "deviceModelName": "example_model_name",
      "friendlyName": "거실",
      "manufacturer": "example_manufacturer",
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
          ] // 지원 가능한 ColorType 타입 참고
        },
        "brightnessControl": {}
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

NUGU스마트홈을 통해 조명(LIGHT)을 제어할 때 권장하는 SmartHome Capability 목록입니다. 권장하는 모든 Capability를 지원하지 않아도 되며 스마트홈 기기 자체 기능에 맞추어 제공하고자 하는 Capability 목록을 Discovery 시 응답에 포함해야 합니다.

Capability별 상세한 내용은 아래 리스트의 링크를 통해 확인하실 수 있습니다.

| Capability                                                              | Description                                                                      | 예시발                |
|:------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:-------------------|
| [PowerControl](../smarthomecapability/powercontrol-interface)           | 조명 전원 제어 기능입니다.<br/>전원을 켜고 끄며 동작을 제어하는 기능들로 구성되어 있습니다.                           | "조명 켜줘"            |
| [BrightnessControl](../smarthomecapability/brightnesscontrol-interface) | 조명 밝기 제어 기능입니다.<br/>조명의 밝기를 1~100의 밝기 단계로 구분하여 제어하게 됩니다.                         | "조명 밝기 20으로 설정해줘"  |
| [ColorControl](../smarthomecapability/colorcontrol-interface)           | 조명 색상 변경 제어 기능입니다.<br/>설정 색상에 대한 상세한 정보는 SmartHomeAttribute : Color를 참조하시기 바랍니다. | "조명 색상 파란색으로 설정해줘" |

