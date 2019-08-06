---
depth_order: 4
---

# Capability interface

디바이스의 여러 기능을 제어하기 위한 규격을 Capability Interface라 합니다. 응답을 재생하는 기능 외에 오디오 재생, 무드등 제어, 음량 조절 등 다양한 기능을 제어할 수 있습니다.

현재는 디바이스에서 오디오 스트리밍을 통해 음악을 재생하기 위한 AudioPlayer Interface와  NUGU nemo, Btv, T전화 등 Display Device에서 Display template를 사용할 수 있는 Display Interface 지원됩니다. Play를 생성하는 시점에 Play에서 지원하고자 하는 Capability Interface를 선택하면 사용할 수 있습니다.

각 Capability Interface는 다음의 세 요소로 구성되어 있습니다.

## Built-in Intent

기능을 제어하기 위해 기본으로 제공하는 Intent입니다. 사용자가 직접 정의하지 않아도 사용할 수 있습니다.

## Directive

디바이스의 기능을 제어하기 위해 Play에서 디바이스로 전달하는 명령어입니다.

## Event

디바이스가 명령을 수행하면 상태가 변경되는데, 이 상태의 변경을 Play에 알려주기 위해 사용됩니다.

{% alerts style="info" %}
Capability Interface의 자세한 사용법은 [Capability Interfaces](../use-backend-proxy/capability-interfaces)를 참고하세요.
{% endalerts %}
