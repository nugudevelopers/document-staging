---
depth_order: 7
description: 디바이스 위치 정보를 Play 로 전달하기 위한 규격
---

# Location

## Version

최신 버전은 1.0 입니다.

| Version  | Date        | Description  |
|----------|-------------|--------------|
| 1.0      | 2019.12.04  | 규격 추가        |

## SDK Interface

### LocationAgent 사용

Location interface 규격에 따른 디바이스의 동작 제어는 LocationAgent 가 처리합니다.

{% alerts style="danger" %}
Linux 는 LocationAgent 를 지원하지 않습니다.
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient instance 를 통해 LocationAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val locationAgent = nuguAndroidClient.getAgent(LocationAgent.NAMESPACE)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 LocationAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let locationAgent = nuguClient.locationAgent
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성

Play 에서 위치 정보 기반의 정보를 제공 받기 위해서는 디바이스의 위치 정보를 [Context](#context) 에 포함시켜 주어야 합니다.

{% tabs %}
{% tabs::content title="Android" %}
LocationProvider 를 추가합니다.

{% code %}
```kotlin
val provider = object: LocationProvider {
    override fun getLocation(): Location? {
        ...
    }
}
NuguAndroidClient.Builder(...)
    .enableLocation(provider)
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
LocationAgentDelegate 를 추가합니다.

{% code %}
```swift
class MyLocationAgentDelegate: LocationAgentDelegate {
    func locationAgentRequestLocationInfo() -> LocationInfo? {
        ...
    }
}
locationAgent.delegate = MyLocationAgentDelegate()
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "Location": {
    "version": "1.0",
    "current": {
      "latitude": "{{STRING}}",
      "longitude": "{{STRING}}"
    }
  }
}
```
{% endcode %}

| parameter         | type   | mandatory | description |
|-------------------|--------|-----------|-------------|
| current           | object | N         | 현재 위치의 정보   |
| current.latitude  | string | Y         | 위도          |
| current.longitude | string | Y         | 경도          |
