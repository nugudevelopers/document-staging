---
depth_order: 9
---

# AudioPlayer Interface 지원하는 Play 만들기

AudioPlayer Interface를 사용하여 Play를 만들 경우, NUGU SDK에 연결된 디바이스에서 스트리밍을 통해 음악을 재생할 수 있습니다.

AudioPlayer Interface를 사용하기 위해서는 `General` > `기본 정보` > `Capability Interface 추가` 에서 `AudioPlayer` 항목을 체크 합니다.

![](../../assets/images/create-a-play-with-audioplayer-01.png)

설정을 하고 저장을 하면, 해당 Play는 Built-in Intent가 자동으로 더 추가되고 AudioPlayer를 사용할 수 있는 Play가 됩니다.

이후에는 아래 문서를 참고하여, 재생/정지 등의 명령을 처리할 수 있도록 Play를 정의 합니다.

1. [Custom Intent 정의하기](./create-a-play-with-audioplayer/audioplayer-define-custom-intent)
2. [Action 정의하기](./create-a-play-with-audioplayer/audioplayer-define-action)
3. [Built-in Intent를 위한 Action 정의하기](./create-a-play-with-audioplayer/audioplayer-define-built-in-intent)

{% alerts style="info" %}
AudioPlayer Interface에서 제공하는 Built-in Intent, Directive, Event에 대한 자세한 설명은 [Capability Interfaces](./use-backend-proxy/capability-interfaces)를 참고하세요.
{% endalerts %}
