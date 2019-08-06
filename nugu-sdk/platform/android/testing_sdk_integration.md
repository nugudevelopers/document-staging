---
depth_order: 8
---

# 테스트 환경 설정

## SDK에서 제공하는 `NuguAndroidClient` 클래스를 이용하여 테스트 환경을 변경하는 방법을 소개합니다.

\1. `transportFactory`에 `GrpcTransportFactory`를 생성합니다.
\2. `NuguServerInfo`의 builder 이용하여`DeviceGW` 값은 환경에 맞게 주소를 변경합니다. 아래 심사용과 테스트용 주소가 준비되어 있습니다.

   * 심사용 : `review-dggprc.sktnugu.com` 
   * 테스트용 : `test-dggprc.sktnugu.com`

{% code %}
```kotlin
val transport = GrpcTransportFactory(
   NuguServerInfo.Builder()
       .deviceGW("review-dggprc.sktnugu.com")
       .build()
)
```
{% endcode %}

\3. 마지막으로 `NuguAndroidClient`를 생성하면 모든 설정이 완료 됩니다.

{% code %}
```kotlin
import com.skt.nugu.sdk.client.port.transport.grpc2.GrpcTransportFactory
import com.skt.nugu.sdk.client.port.transport.grpc2.NuguServerInfo

       // Create NuguAndroidClient
       client = NuguAndroidClient.Builder(
           context,
           NuguOAuth.create(options),
           audioSourceManager
       ).transportFactory(transport)
      .build()
```
{% endcode %}
