---
depth_order: 13
description: 디바이스 배터리 정보를 Play 로 전달하기 위한 규격
---

# Battery

## Version

최신 버전은 1.1 입니다.

| Version | Date       | Description                      |
|---------|------------|----------------------------------|
| 1.0     | 2020.02.25 | 규격 추가                            |
| 1.1     | 2020.04.29 | Context 에 approximateLevel 필드 추가 |

## SDK Interface

### BatteryAgent 사용

Battery interface 규격에 따른 디바이스의 정보 전달은 BatteryAgent 가 처리합니다.

{% alerts style="warning" %}
Linux 는 BatteryAgent 를 지원하지 않습니다.
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 BatteryAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val batteryAgent = nuguAndroidClient.getAgent(DefaultBatteryAgent.NAMESPACE)
```
{% endcode %}

NuguAndroidClient 에 배터리 정보을 전달를 위한 기본 BatteryStatusProvider 구현이 포함되어 있습니다.

BatteryStatusProvider 을 직접 구현하려면 NuguAndroidClient 생성시 추가합니다.

{% code %}
```kotlin
class MyBatteryStatusProvider: BatteryStatusProvider {
    ...
}
NuguAndroidClient.Builder(...)
    .enableBattery(MyBatteryStatusProvider())
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성

디바이스 배터리 정보를 [Context](#context) 에 포함시켜 주어야 합니다.

{% tabs %}
{% tabs::content title="Android" %}
BatteryStatusProvider 를 구현합니다.

{% code %}
```kotlin
class MyBatteryStatusProvider: BatteryStatusProvider {
    override fun getBatteryLevel(): Int {
        ...
    }

    override fun isCharging(): Boolean? {
        ...
    }
}
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Location": {
    "version": "1.1",
    "level": {{LONG}},
    "charging": {{BOOLEAN}},
    "approximateLevel": {{BOOLEAN}}
  }
}
```
{% endcode %}

| parameter        | type    | mandatory | description                                        |
|------------------|---------|-----------|----------------------------------------------------|
| level            | Long    | Y         | 배터리 잔량(0 ~ 100)                                    |
| charging         | boolean | Y         | 충전 여부                                              |
| approximateLevel | boolean | N         | 배터리 잔량의 근사치 여부 ( 일부 디바이스의 경우 정확한 배터리 잔량을 측정할 수 없음) |
