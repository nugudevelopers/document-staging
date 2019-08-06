---
depth_order: 2
---

# Layer 정책

NUGU 서비스가 수행하는 동작은 몇 가지 유형(layer)으로 나뉠 수 있으며, 특정 유형의 동작 수행 중 다른 유형의 동작이 실행될 경우, 동작 방식에 대한 정책을 NUGU layer 정책이라고 합니다.

NUGU 서비스 Layer 정의는 다음과 같습니다.

| Layer 유형    | 정의                                  |
|:------------|:------------------------------------|
| Call        | 통화 상대와 통화가 연결된 상태                   |
| Alert       | 알람 울림 / 타이머 울림 / Notification 울림 상태 |
| Information | TTS로 정보를 제공하고 있는 상태                 |
| Media       | Streaming으로 미디어(음악 등)를 재생하고 있는 상태   |

각 layer간 동작 정책은 다음과 같습니다.

* Call 동작 중 다른 명령이 발화 될 경우, Call 상태 유지 
* Alert 동작 중 다른 명령이 발화될 경우, Alert 종료 후 신규 동작 실행 
* Info. 동작 중 다른 명령이 발화될 경우, Info. 종료 후 신규 동작 실행 
* Media 동작 중 다른 명령이 발화될 경우, Media pause 상태에서 신규 동작 실행 후 Media resume

