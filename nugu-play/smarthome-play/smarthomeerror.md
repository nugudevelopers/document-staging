---
depth_order: 4
---

# SmartHomeError

NUGU스마트홈에서 지원하고 있는 Error와 Exception에 대한 내용입니다. ServiceProvider는 SmartHomeBackendProxy 구현 시 아래 리스트를 참조하여 SmartHomeDevice 제어 및 상태 조회 시 발생하는 오류 혹은 예외상황에 맞는 error code를 응답해야 합니다.

## Error Response Format

SmartHome의 Error는 SmartHomeBackendProxy에서 모든 처리가 불가한 Global-level error와 SmartHomeDevice 제어 시에 발생하는 다양한 원인의 Error인 Device-level error로 구분됩니다. 아래 Global-level error와 Device-level error의 예시 format을 참조해주세요.

### Global-level error

Service Provider에 공통 exception으로 처리하고자 하는 경우 사용합니다.

{% tabs %}

{% tabs::content title="예1" %}
{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "error": {
    "code": 401, // HTTP status code
    "message": "invalid token"
  }
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="예2" %}
{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "error": {
    "code": 429, // HTTP status code
    "message": "Too many requests, 요청 한도를 넘었니다."
  }
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="예3" %}
{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "error": {
    "code": 503, // HTTP status code
    "message": "Service Unavailable, 소프트웨어 업데이트 중입니다."
  }
}
```
{% endcode %}
{% endtabs::content %}

{% endtabs %}

### Device-level error

{% code %}
```json
{
  "requestId": "2019071712638a4378649347bdb21643127a0f6d83",
  "data": [
    {
      "resultCode": "NotSupportBrightnessControl",
      "smartHomeDevice": {
        ...
      },
      "errorProperties": {}
    },
    {
      "resultCode": "OK",
      "smartHomeDevice": {
        ...
      },
      "properties": {}
    }
  ]
}
```
{% endcode %}

## Error List

Device-level error 발생 시에는 error 원인에 맞는 error code를 응답해야 합니다. 이 때 error code에 따라 함께 응답해야 하는 부가정보(error property)가 있는 경우도 있습니다. 아래 NUGU 스마트홈을 통해 제공할 수 있는 error case별 code와 error property를 참조하시기 바랍니다.

| Error Code                            | Error Property                | description                                                                                                                                                                |
|:--------------------------------------|:------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| NotExistDeviceInSmartHomeBackendProxy | -                             | 제어 대상 SmartHomeDevice가 SmartHomdeBackendProxy에 존재하지 않는 경우에 대한 에러입니다. NUGU 앱을 통해 등록한 이후 원래 IoT Service에서 삭제한 경우에 발생합니다.                                                     |
| NoConnectionDevice                    | -                             | 해당 SmartHomeDevice의 네트워크 연결 실패에 대한 에러입니다.                                                                                                                                  |
| DeviceTurnedOff                       | -                             | SmartHomeDevice의 전원이 꺼져 있어 제어가 불가한 상태인 경우의 에러입니다. 해당 제어 명령이 전원을 켤 경우 수행할 수 있다면 이 에러로 응답해야 합니다.                                                                             |
| AlreadyTurnOn                         | -                             | 해당 SmartHomeDevice가 이미 켜져 있는데 켜달라는 제어 요청을 받은 경우입니다. PowerControl Capability, TurnOn Directive의 제어 명령 시 발생 가능한 에러입니다.                                                       |
| AlreadyTurnOff                        | -                             | 해당 SmartHomeDevice가 이미 꺼져 있는데 꺼달라는 제어 요청을 받은 경우입니다. PowerControl Capability, TurnOff Directive의 제어 명령 시 발생 가능 에러입니다.                                                       |
| TemperatureOutofRange                 | minTemperature maxTemperature | SmartHomeDevice에 설정하고자 하는 온도가 해당 SmartHomeDevice의 제어 범위 밖일 경우에 대한 에러입니다. 제어 가능한 최소/최대 온도 설정 범위를 함께 응답해야 합니다.                                                               |
| AlreadyAtMaxTemp                      | -                             | SmartHomeDevice의 설정 온도를 올리려고 했을 때 해당 SmartHomeDevice가 이미 최고 온도로 설정되어 있는 경우입니다.                                                                                             |
| AlreadyAtMinTemp                      | -                             | SmartHomeDevice의 설정 온도를 내리려고 했을 때 해당 SmartHomeDevice가 이미 최저 온도로 설정되어 있는 경우입니다.                                                                                             |
| NotAvailableSetAirflow                | -                             | 해당 SmartHomeDevice가 풍량 조절 불가한 모델일 경우입니다. 동일한 SmartHomeDeviceType 중 풍량 제어가 가능한 모델과 가능하지 않은 모델을 함께 제공하는 IoT ServiceProvider일 경우 해당 응답을 사용할 수 있습니다.                           |
| UnsupportedAirflow                    | -                             | 해당 SmartHomeDevice가 지원하지 않는 풍량에 대해 제어 발화가 인입되었을 경우입니다.                                                                                                                     |
| AlreadyAtMaxAirflow                   | -                             | SmartHomeDevice의 설정 풍량을 올리려고 했을 때 해당 SmartHomeDevice가 이미 최고 풍량으로 설정되어 있는 경우입니다.                                                                                            |
| AlreadyAtMinAirflow                   | -                             | SmartHomeDevice의 설정 풍량을 내리려고 했을 때 해당 SmartHomeDevice가 이미 최저 풍량으로 설정되어 있는 경우입니다.                                                                                            |
| UnsupportedMode                       | -                             | 해당 SmartHomeDevice가 지원하지 않는 모드에 대해 제어 발화가 인입되었을 경우입니다.                                                                                                                     |
| NotInAvailableMode                    | mode                          | SmartHomeDevice가 취소할 수 없는 모드를 취소요청한 경우입니다. 어떤 SmartHomeDevice와 특정 모델들은 다른 모드를 설정해야만 현재 모드를 해제할 수 있는 경우가 있습니다. 이 에러는 그런 모드를 갖는 SmartHomeDevice에 대해 모드 취소 제어가 인입될 경우를 지원합니다. |
| SetTimeOutofRange                     | -                             | SmartHomeDevice에 종료예약 발화시간이 해당 기기의 지원범위 밖일 경우입니다.                                                                                                                          |
| NotExistSetEndTime                    | -                             | SmartHomeDevice에 종료예약취소 요청이 인입되었으나 해당 기기에 설정된 종료예약이 없는 경우입니다.                                                                                                              |
| UnsupportedSetEndTime                 | -                             | 사용자가 요청한 종료예약시간이 미지원하는 시간 단위일 경우(시간 분단위 등)입니다. 어떤 스마트홈 기기 및 모델들은 특정 유형으로만 종료예약을 설정할 수 있습니다. 이 에러는 그런 스마트홈 기기 및 모델을 지원합니다.                                                  |
| AlreadyCharging                       | -                             | 스마트홈 기기에 충전 요청이 인입되었으나 해당 스마트홈 기기가 이미 충전 중인 상태일 경우입니다.                                                                                                                     |
| AlreadyStarting                       | -                             | 스마트홈 기기에 동작 명령을 내렸을 경우 해당 스마트홈 기기가 이미 동작 상태인 경우입니다. PowerControl Capability의 TurnOn Directive를 동작으로 사용하는 경우를 지원합니다.                                                        |
| AlreadyStopped                        | -                             | 스마트홈 기기에 동작 중지 명령을 내렸을 경우 해당 스마트홈 기기가 이미 중지 상태인 경우입니다. PowerControl Capability의 TurnOff Directive를 동작 중지로 사용하는 경우를 지원합니다.                                                  |
| NotExistDailyPowerTarget              | -                             | 스마트홈 기기 목표전력사용량 조회 시 해당 스마트홈 기기에 설정된 1일 목표전력사용량이 없는 경우입니다.                                                                                                                 |
| NotSupportBrightnessControl           | -                             | 스마트홈 조명이 밝기 조절 불가한 모델일 경우입니다.                                                                                                                                              |
| NotSupportChangeColor                 | -                             | 스마트홈 조명이 색상 변경 불가한 모델일 경우입니다.                                                                                                                                              |
| UnsupportedColorType                  | -                             | 스마트홈 조명이 지원하지 않는 색상 타입인 경우입니다.                                                                                                                                             |
| HumidityOutofRange                    | minHumidity maxHumidity       | SmartHomeDevice에 설정하고자 하는 습도가 해당 SmartHomeDevice의 제어 범위 밖일 경우에 대한 에러입니다. 제어 가능한 최소/최대 습도 설정 범위를 함께 응답해야 합니다.                                                               |
| AlreadyAtMaxHumidity                  | -                             | SmartHomeDevice의 설정 습도를 올리려고 했을 때 해당 SmartHomeDevice가 이미 최고 습도로 설정되어 있는 경우입니다.                                                                                             |
| AlreadyAtMinHumidity                  | -                             | SmartHomeDevice의 설정 습도를 내리려고 했을 때 해당 SmartHomeDevice가 이미 최저 습도로 설정되어 있는 경우입니다.                                                                                             |
| NotSupportedInCurrentMode             | mode                          | 현재 설정된 모드에서 요청한 기능을 수행할 수 없을 때에 대한 에러입니다.                                                                                                                                  |
| DeviceInSleepMode                     | -                             | 제어 대상인 스마트홈 기기가 슬랩모드 혹은 절전 모드여서 제어에 실패한 경우에 대한 에러입니다.                                                                                                                      |
| NoControlAuthority                    | -                             | ServiceProvider로부터 제어권을 받지 못해 일시적으로 음성제어가 불가능한 경우입니다. ServiceProvider별로 제어 가능한 상태에 대한 가이드 전달이 필요합니다.                                                                       |

{% alerts style="info" %}
SmartHomeError는 계속해서 업데이트됩니다.
{% endalerts %}

