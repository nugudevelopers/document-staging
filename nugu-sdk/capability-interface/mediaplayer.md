---
depth_order: 19
description: 음악 앱을 제어하기 위한 규격
---

# MediaPlayer

## Version

최신 버전은 1.2 입니다.

| Version | Date       | Description                                                                                                                                                                                                                                                                           |
|:--------|:-----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.0     | 2020.07.15 | 규격 추가                                                                                                                                                                                                                                                                                 |
| 1.1     | 2020.10.29 | Song.category: SIMILAR 추가<br/>PlayFailed event(errorCode) : noSimilarSong 추가<br/>HandlePlaylist, HandleLyrics directive 추가<br/>HandlePlaylistSucceeded, HandlePlaylistFailed, HandleLyricsSucceeded, HandleLyricsFailed event 추가<br/>PlaySuspended event 의 issueCode 에 excludeSong 추가 |
| 1.2     | 2022.05.06 | failed 관련 이벤트에 data 추가                                                                                                                                                                                                                                                                |

## SDK Interface

### MediaPlayerAgent 사용

MediaPlayer interface 규격에 따른 디바이스의 동작 제어는 MediaAgent 가 처리합니다.

{% alerts style="warning" %}
Linux 는 MediaPlayerAgent 를 지원하지 않습니다.
{% endalerts %}

{% tabs %}
{% tabs::content title="Android" %}
NuguAndroidClient 생성시 MediaPlayerAgent 를 추가합니다.

{% code %}
```kotlin
class MyMediaPlayer: MediaPlayer {
    ...
}
NuguAndroidClient().Builder()
            .addAgentFactory(MediaPlayerAgent.NAMESPACE, object : AgentFactory<MediaPlayerAgent> {
                override fun create(container: SdkContainer): MediaPlayerAgent = with(container) {
                    MediaPlayerAgent(
                        MyMediaPlayer(),
                        getMessageSender(),
                        getContextManager(),
                        getContextManager(),
                        getDirectiveSequencer()
                    )
                }
            })
```
{% endcode %}

NuguAndroidClient instance 를 통해 MediaPlayerAgent instance 에 접근할 수 있습니다.

{% code %}
```kotlin
val mediaPlayerAgent = nuguAndroidClient.mediaPlayerAgent
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
NuguClient instance 를 통해 MediaPlayerAgent instance 에 접근할 수 있습니다.

{% code %}
```swift
let mediaPlayerAgent = nuguClient.mediaPlayerAgent
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### Context 구성

앱에서 재생중인 음원에 대한 정보를 [Context](#context) 에 포함시켜 주어야 합니다.

{% tabs %}
{% tabs::content title="Android" %}
MediaPlayer 를 구현합니다.

{% code %}
```kotlin
class MyMediaPlayer: MediaPlayer {
    override fun getContext(): Context {
        ...
    }

    ...
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
MediaPlayerAgentDelegate를 추가합니다.

{% code %}
```swift
class MyMediaPlayerAgentDelegate: MediaPlayerAgentDelegate {
    func func mediaPlayerAgentRequestContext() -> MediaPlayerAgentContext? {
        ...
    }

    ...
}
mediaPlayerAgent.delegate = MyMediaPlayerAgentDelegate()
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 제어 명령

`사용자 발화`에 의해 음악 [검색](#search)/[재생](#play)/[중지](#stop)/[다음](#next)/[이전](#previous)/[탐색](#move)/[일시정지](#pause)/[계속재생](#resume)/[다시재생](#rewind)/[반복](#toggle)/[즐겨찾기](#toggle)/[셔플](#toggle)/[재생목록 보기](#handleplaylist)/[가사 보기](#handlelyrics) 가 directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
MediaPlayer 를 구현합니다.

{% code %}
```kotlin
class MyMediaPlayer: MediaPlayer {
    override fun search(payload: SearchPayload, callback: EventCallback) {
        ...
    }

    override fun play(header: Header, payload: PlayPayload, callback: PlayCallback) {
        ...
    }

    override fun fun stop(header: Header, payload: Payload, callback: EventCallback) {
        ...
    }

    override fun next(header: Header, payload: NextPayload, callback: NextCallback) {
        ...
    }

    override fun previous(header: Header, payload: PreviousPayload, callback: PreviousCallback) {
        ...
    }

    override fun move(header: Header, payload: MovePayload, callback: EventCallback) {
        ...
    }

    override fun pause(header: Header, payload: Payload, callback: EventCallback) {
        ...
    }

    override fun resume(header: Header, payload: Payload, callback: EventCallback) {
        ...
    }

    override fun rewind(header: Header, payload: Payload, callback: EventCallback) {
        ...
    }

    override fun toggle(header: Header, payload: TogglePayload, callback: EventCallback) {
        ...
    }

    override fun handlePlaylist(header: Header, payload: HandlePlaylistPayload, callback: EventCallback) {
        ...
    }

    override fun handleLyrics(header: Header, payload: HandleLyricsPayload, callback: EventCallback) {
        ...
    }

    ...
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
MediaPlayerAgentDelegate를 추가합니다.

{% code %}
```swift
class MyMediaPlayerAgentDelegate: MediaPlayerAgentDelegate {
    func mediaPlayerAgentReceiveSearch(payload: MediaPlayerAgentDirectivePayload.Search, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Search) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceivePlay(payload: MediaPlayerAgentDirectivePayload.Play, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Play) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveStop(playServiceId: String, token: String, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Stop) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveNext(payload: MediaPlayerAgentDirectivePayload.Next, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Next) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceivePrevious(payload: MediaPlayerAgentDirectivePayload.Previous, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Previous) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveMove(payload: MediaPlayerAgentDirectivePayload.Move, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Move) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceivePause(playServiceId: String, token: String, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Pause) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveResume(playServiceId: String, token: String, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Resume) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveRewind(playServiceId: String, token: String, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Rewind) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveToggle(payload: MediaPlayerAgentDirectivePayload.Toggle, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.Toggle) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceivePlaylist(playServiceId: String, action: String, target: String?, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.HandlePlaylist) -> Void)) {
        ...
    }

    func mediaPlayerAgentReceiveLyrics(playServiceId: String, action: String, header: Downstream.Header, completion: @escaping ((MediaPlayerAgentProcessResult.HandleLyrics) -> Void)) {
        ...
    }

    ...
}
mediaPlayerAgent.delegate = MyMediaPlayerAgentDelegate()
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

### 재생중인 곡 정보 요청

재생중인 곡 정보가 [GetInfo](#getinfo) directive 로 요청될 수 있습니다.

{% tabs %}
{% tabs::content title="Android" %}
MediaPlayer 를 구현합니다.

{% code %}
```kotlin
class MyMediaPlayer: MediaPlayer {
    override fun getInfo(payload: Payload, callback: GetInfoCallback) {
        ...
    }

    ...
}
```
{% endcode %}
{% endtabs::content %}

{% tabs::content title="iOS" %}
MediaPlayerAgentDelegate를 추가합니다.

{% code %}
```swift
class MyMediaPlayerAgentDelegate: MediaPlayerAgentDelegate {
    func func mediaPlayerAgentReceiveGetInfo(playServiceId: String, token: String, dialogRequestId: String, completion: @escaping ((MediaPlayerAgentProcessResult.GetInfo) -> Void)) {
        ...
    }

    ...
}
mediaPlayerAgent.delegate = MyMediaPlayerAgentDelegate()
```
{% endcode %}
{% endtabs::content %}
{% endtabs %}

## Context

{% code %}
```json
{
  "MediaPlayer": {
    "version": "1.0",
    "appStatus": "{{STRING}}",
    "playerActivity": "{{STRING}}",
    "user": {
      "isLogIn": "{{STRING}}",
      "hasVoucher": "{{STRING}}"
    },
    "currentSong": Song,
    "playlist": {
      "name": "{{STRING}}",
      "number": "{{STRING}}",
      "length": "{{STRING}}",
      "currentSongOrder": "{{STRING}}"
    },
    "toggle": {
      "repeat": "{{STRING}}",
      "shuffle": "{{STRING}}"
    }
  }
}
```
{% endcode %}

| parameter                 | type          | mandatory | Play Builder Precondition | description                                                                                                                                             |
|:--------------------------|:--------------|:----------|:--------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| appStatus                 | string        | Y         | Y                         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>- **NOT_RUNNING**<br/>- **NORMAL** : 정상 상태 디폴트<br/>- **...** : 지정된 에러코드                                       |
| playerActivity            | string        | Y         | Y                         | 앱의 현재 재생 상태<br/>- **STOPPED**<br/>- **PLAYING**<br/>- **PAUSED**                                                                                        |
| user                      | object        | N         | N                         | 사용자 정보                                                                                                                                                  |
| user.isLogIn              | string        | Y         | N                         | 로그인 여부 (TRUE/FALSE)                                                                                                                                     |
| user.hasVoucher           | string        | Y         | N                         | 재생 가능 이용권 보유 여부 (TRUE/FALSE)                                                                                                                            |
| currentSong               | [Song](#song) | N         | N                         | 현재 재생 중이거나 마지막에 재생한 곡의 정보                                                                                                                               |
| playlist                  | object        | N         | N                         | Play List가 현재 재생 상태이거나 멈춰있는 경우                                                                                                                          |
| playlist.type             | string        | Y         | N                         | 현재 재생 리스트의 타입<br/>- **CHART** : 차트 리스트 재생 중<br/>- **PLAYLIST** : 사용자 저장 플레이리스트 재생 중<br/>- **THEMELIST** : 테마리스트의 경우<br/>- **DEFAULT** : 위에 해당 사항이 없는 경우 |
| playlist.name             | string        | Y         | N                         | 각 타입 내에서의 이름 (PLAYLIST, THEMELIST의 경우)                                                                                                                  |
| playlist.number           | string        | Y         | N                         | type이 "PLAYLIST"인 경우 mandantory 재생 중인 플레이리스트의 번호                                                                                                        |
| playlist.length           | string        | Y         | N                         | 전체 곡 수                                                                                                                                                  |
| playlist.currentSongOrder | string        | Y         | N                         | 현재 재생 곡 순서 (전체가 N이면, current 값은 1(첫곡), ... N(마지막곡) 까지 나올 수 있음)                                                                                          |
| toggle                    | object        | N         | N                         | Toggle Directive에서 지원하는 기능의 상태 정보 repeat, shuffle 중 지원하는 기능만 포함해야 함 (포함되지 않은 파라미터는 Play에서 미지원으로 판단)<br/>모두 지원하지 않으면 toggle 파라미터가 없어야 함                  |
| toggle.repeat             | string        | N         | N                         | **ALL** : 전체 반복<br/>**ONE** : 한곡 반복<br/>**NONE** : 반복 없음                                                                                                |
| toggle.shuffle            | string        | N         | N                         | 셔플 여부 (ON/OFF)                                                                                                                                          |

## Common Objects

### Song

{% code %}
```json
{
  "category": "{{STRING}}",
  "theme": "{{STRING}}",
  "genre": [String],
  "artist": [String],
  "album": "{{STRING}}",
  "title": "{{STRING}}",
  "duration": "{{STRING}}",
  "issueDate": "{{STRING}}",
  "etc": { # arbitrary object }
}
```
{% endcode %}

| parameter | type            | mandatory | description                                                                                                                                                                                                                                                                                                       |
|:----------|:----------------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| category  | string          | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>- **NONE**<br/>- **RECOMMEND**<br/>- **POPULAR**<br/>- **NEW**<br/>- **CHART**<br/>- **RECENT_PLAYED**<br/>- **FAVORITE**<br/>- **LIKE_SONG**<br/>- **LIKE_ALBUM**<br/>- **LIKE_ARTIST**<br/>- **LIKE_THEME**<br/>- **PLAYLIST**<br/>- **NOWPLAYING**<br/>- **SIMILAR** |
| theme     | string          | N         | 테마                                                                                                                                                                                                                                                                                                                |
| genre     | array of string | N         | 장르                                                                                                                                                                                                                                                                                                                |
| artist    | array of string | N         | 아티스트                                                                                                                                                                                                                                                                                                              |
| album     | string          | N         | 앨범                                                                                                                                                                                                                                                                                                                |
| title     | string          | N         | 제목                                                                                                                                                                                                                                                                                                                |
| duration  | string          | N         | 재생 시간 (단위: msec)                                                                                                                                                                                                                                                                                                  |
| issueDate | string          | N         | ISO 8601 포맷 (2020-06-01)                                                                                                                                                                                                                                                                                          |
| etc       | object          | N         | 기타 정보를 key:value 형태로 추가 가능                                                                                                                                                                                                                                                                                        |

## Directives

### Play

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Play",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "action": "{{STRING}}",
    "asrText": "{{STRING}}",
    "song": Song,
    "toggle": {
      "repeat": "{{STRING}}",
      "shuffle": "{{STRING}}"
    },
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter      | type          | mandatory | description                                                                                                                                 |
|:---------------|:--------------|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------|
| token          | string        | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함                                                                     |
| action         | string        | Y         | 앱의 동작 가능 여부를 모를 수 있기 때문에 상태를 파악하고 실행하는 동작을 구분하기 위해 정의<br/>- **CHECK** : 최초 호출 시<br/>- **EXECUTE** : suspended를 통해 상태가 확인되고 난 후 다시 요청하는 경우   |
| asrText        | string        | N         | 요청된 발화문                                                                                                                                     |
| song           | [Song](#song) | N         | -                                                                                                                                           |
| toggle         | object        | N         | repeat, shuffle 중 지원하는 기능만 포함해야 함 (포함되지 않은 파라미터는 Play에서 미지원으로 판단)<br/>모두 지원하지 않으면 toggle 파라미터가 없어야 함                                        |
| toggle.repeat  | string        | N         | **ALL** : 전체 반복<br/>**ONE** : 한곡 반복<br/>**NONE** : 반복 없음                                                                                    |
| toggle.shuffle | string        | N         | 셔플 여부 (ON/OFF)                                                                                                                              |
| data           | obejct        | N         | Play Directive 처리 결과에 따라 Suspended 이벤트를 받을 수 있는데, 연속된 요청을 위해 최초 요청에서 사용된 정보를 이후 flow에서 사용하는 용도로 사용                                          |

### Stop

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Stop",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

### Search

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Search",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "asrText": "{{STRING}}",
    "song": Song
  }
}
```
{% endcode %}

| parameter | type          | mandatory | description                                                         |
|:----------|:--------------|:----------|:--------------------------------------------------------------------|
| token     | string        | Y         | 전달하는 Directive를 식별하기 위한 unique string 결과 이벤트에 이 token을 그대로 전달해주어야 함 |
| asrText   | string        | N         | 요청된 발화문                                                             |
| song      | [Song](#song) | N         | -                                                                   |

### Previous

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Previous",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "action": "{{STRING}}",
    "target": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                               |
|:----------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함                                                                   |
| action    | string | Y         | 앱의 동작 가능 여부를 모를 수 있기 때문에 상태를 파악하고 실행하는 동작을 구분하기 위해 정의<br/>- **CHECK** : 최초 호출 시<br/>- **EXECUTE** : suspended를 통해 상태가 확인되고 난 후 다시 요청하는 경우 |
| target    | string | Y         | **TRACK**, **PLAYLIST**                                                                                                                   |
| data      | object | N         | Previous Directive 처리 결과에 따라 Suspended 이벤트를 받을 수 있는데, 연속된 요청을 위해 최초 요청에서 사용된 정보를 이후 flow에서 사용하는 용도로 사용                                    |

### Next

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Next",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "action": "{{STRING}}",
    "target": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                               |
|:----------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함                                                                   |
| action    | string | Y         | 앱의 동작 가능 여부를 모를 수 있기 때문에 상태를 파악하고 실행하는 동작을 구분하기 위해 정의<br/>- **CHECK** : 최초 호출 시<br/>- **EXECUTE** : suspended를 통해 상태가 확인되고 난 후 다시 요청하는 경우 |
| target    | string | Y         | **TRACK**, **PLAYLIST**                                                                                                                   |
| data      | object | N         | Next Directive 처리 결과에 따라 Suspended 이벤트를 받을 수 있는데, 연속된 요청을 위해 최초 요청에서 사용된 정보를 이후 flow에서 사용하는 용도로 사용                                        |

### Move

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Move",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "direction": "{{STRING}}",
    "sec": {{LONG}}
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description               |
|:----------|:-------|:----------|:--------------------------|
| direction | string | Y         | **FORWARD**, **BACKWARD** |
| sec       | string | Y         | 이동 시간 (단위 - 초)            |

### Pause

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Pause",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                             |
|:----------|:-------|:----------|:------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함 |

### Resume

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Resume",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                             |
|:----------|:-------|:----------|:------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함 |

### Rewind

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Rewind",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                             |
|:----------|:-------|:----------|:------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함 |

### Toggle

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "Toggle",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "repeat": "{{STRING}}",
    "like": "{{STRING}}",
    "shuffle": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter     | type   | mandatory | description                                                             |
|:--------------|:-------|:----------|:------------------------------------------------------------------------|
| version       | string | Y         | 인터페이스 버전, 기본 값은 1.0                                                     |
| playServiceId | string | Y         | Directive 를 전달한 Play 정보.<br/>PlayRouter가 생성하기 때문에 NPK 규격에는 포함되지 않음.     |
| token         | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함 |
| repeat        | string | N         | **ALL** : 전체 반복<br/>**ONE** : 한곡 반복<br/>**NONE** : 반복 없음                |
| like          | string | N         | 좋아요 여부 (TRUE/FALSE)                                                     |
| shuffle       | string | N         | 셔플 여부 (ON/OFF)                                                          |

### GetInfo

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "GetInfo",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                             |
|:----------|:-------|:----------|:------------------------------------------------------------------------|
| token     | string | Y         | 전달하는 Directive를 식별하기 위한 unique string<br/>결과 이벤트에 이 token을 그대로 전달해주어야 함 |

### HandlePlaylist

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandlePlaylist",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "action": "{{STRING}}",
    "target": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                             |
|:----------|:-------|:----------|:------------------------------------------------------------------------|
| action    | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>Playlist 제어 동작<br/>- **SHOW** |
| target    | string | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>특정 Playlist 지정                |

### HandleLyrics

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandleLyrics",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "action": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                            |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------|
| action    | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>Playlist 제어 동작<br/>- **SHOW**<br/>- **HIDE** |

## Events

### PlaySucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PlaySucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### PlaySuspended

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PlaySuspended",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "song": Song,
    "playlist": {
      "name": "{{STRING}}",
      "number": "{{STRING}}"
    },
    "issueCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter       | type          | mandatory | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|:----------------|:--------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token           | string        | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| song            | [Song](#song) | N         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| playlist        | object        | N         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| playlist.name   | string        | N         | 재생할 플레이리스트명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| playlist.number | string        | Y         | 재생할 플레이리스트의 번호                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| issueCode       | string        | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>- 재생을 수행하지만, 아래와 같은 특수 동작 및 prompt를 분기하는 경우<br/>• **onlyAdult** : 첫곡이 '성인 인증'이 필요한 음악으로, > skip하여 재생<br/>• **disable** : 첫곡이 서비스가 중지된 곡 > skip하여 재생<br/>• **notAllowed** : 첫 곡이 제공사 사정으로 재생할 수 없음. > skip하여 재생<br/>• **onlyPreview** : 첫 곡이 권리사 요청으로 미리듣기만 가능한 음악 > 미리듣기만 재생<br/>• **noRecentPlayed** : 최근들은 곡 요청시, 최근들은 이력이 없어서 실시간 차트로 대안 재생하는 경우<br/>• **noFavoritePlayed** : 많이 들은 곡 요청시, 많이들은 이력이 없어서 실시간 차트로 대안 재생하는 경우<br/>• **excludeSong**: 첫 곡이 안듣기 설정한 곡이어서 skip 하여 재생 |
| data            | object        | N         | Play Directive에서 data 파라미터가 존재하면 그 object를 그대로 보내줘야 함                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### PlayFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PlayFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|:----------|:-------|:----------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **noPlaylist** : 재생 가능 플레이리스트 없음<br/>- **toBeReleased** : 음악이 발매될 예정, 현재는 미발매 상태<br/>- **searchFailed** : 검색 실패, 메타상에 없음<br/>- **disableAll** : 재생 목록에 재생가능 상태 음원이 없음<br/>- **noLikeSong** : 좋아요한 곡이 없음<br/>- **noNowlist** : 현재재생목록 요청했으나 목록에 곡없음<br/>- **noLikeAlbum** : 좋아요한 앨범 없음<br/>- **noLikeTheme** : 좋아요한 테마 없음<br/>- **noLikeArtist** : 좋아요한 가수없음<br/>- **multiPlayingStop** : 멀티 디바이스 중복 재생으로 인한 autonext 시 재생 중단 발생 시<br/>- **requireLogin** : 로그인 기능이 필수인 동작이나, 비로그인상태로 인한 실패<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시<br/>- **noSimilarSong** : 유사곡(SIMILAR) 요청 시, 유사곡이 없는, 지원하지 않는 곡일 경우 |
| data      | object | N         | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### StopSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "StopSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description           |
|:----------|:-------|:----------|:----------------------|
| token     | string | Y         | Directive에서 전달한 token |

### StopFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "StopFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                               |
|:----------|:-------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                     |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시  |
| data      | object | N         | -                                                                                                                                                         |

### SearchSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "SearchSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### SearchFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "SearchFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                               |
|:----------|:-------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                     |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시  |
| data      | object | N         | -                                                                                                                                                         |

### PreviousSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PreviousSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### PreviousSuspended

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PreviousSuspended",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "song": Song,
    "target": "{{STRING}}",
    "playlist": {
      "name": "{{STRING}}",
      "number": "{{STRING}}"
    },
    "data": { # arbitrary object}
  }
}
```
{% endcode %}

| parameter       | type          | mandatory | description                                                  |
|:----------------|:--------------|:----------|:-------------------------------------------------------------|
| token           | string        | Y         | Directive에서 전달한 token                                        |
| song            | [Song](#song) | N         | 재생하는 음원의 정보                                                  |
| target          | string        | Y         | **PLAYLIST** : 플레이리스트 이동 성공한 경우<br/>**TRACK** : 트랙 이동 성공한 경우 |
| playlist        | object        | N         | -                                                            |
| playlist.name   | string        | N         | 재생할 플레이리스트명                                                  |
| playlist.number | string        | Y         | 재생할 플레이리스트의 번호                                               |
| data            | object        | N         | Play Directive에서 data 파라미터가 존재하면 그 object를 그대로 보내줘야 함        |

### PreviousFailed

{% code %}
```json
{
  "header": {
    "namespace": "PreviousFailed",
    "name": "PlayFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                                                                                                                                                            |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                                                                                  |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **noPreviousPlaylist** : 다음 플레이리스트 요청 시, 재생 가능한 플레이리스트가 없는 경우<br/>- **noPreviousTrack** : 다음 곡 요청 시, 재생 가능한 다음곡이 없는 경우,<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시 |
| data      | object | N         | -                                                                                                                                                                                                                                                                                                                                      |

### NextSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "NextSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### NextSuspended

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "NextSuspended",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "song": "{ #Song object }",
    "target": "{{STRING}}",
    "playlist": {
      "name": "{{STRING}}",
      "number": "{{STRING}}"
    },
    "data": "{ # arbitrary object}"
  }
}
```
{% endcode %}

| parameter       | type          | mandatory | description                                                   |
|:----------------|:--------------|:----------|:--------------------------------------------------------------|
| token           | string        | Y         | Directive에서 전달한 token                                         |
| song            | [Song](#song) | N         | 재생하는 곡 정보                                                     |
| target          | string        | Y         | **PLAYLIST** : 플레이리스트 이동 성공한 경우<br/>**TRACK** : 트랙 이동 성공한 경우  |
| playlist        | object        | N         | -                                                             |
| playlist.name   | string        | N         | 재생할 플레이리스트명                                                   |
| playlist.number | string        | Y         | 재생할 플레이리스트의 번호                                                |
| data            | object        | N         | Play Directive에서 data 파라미터가 존재하면 그 object를 그대로 보내줘야 함         |

### NextFailed

{% code %}
```json
{
  "header": {
    "namespace": "NextFailed",
    "name": "PlayFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                                                                                                                                                    |
|:----------|:-------|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                                                                          |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **noNextPlaylist** : 다음 플레이리스트 요청 시, 재생 가능한 플레이리스트가 없는 경우<br/>- **noNextTrack** : 다음 곡 요청 시, 재생 가능한 다음곡이 없는 경우,<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시 |
| data      | object | N         | -                                                                                                                                                                                                                                                                                                                              |

### MoveSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "MoveSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### MoveFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "MoveFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                               |
|:----------|:-------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                     |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시  |
| data      | object | N         | -                                                                                                                                                         |

### PauseSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PauseSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### PauseFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "PauseFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                               |
|:----------|:-------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                     |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태  |
| data      | object | N         | -                                                                                                                                                                                                         |

### ResumeSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "ResumeSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### ResumeFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "ResumeFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                              |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                    |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태 |
| data      | object | N         | -                                                                                                                                                                                                        |

### RewindSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "RewindSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                       |
|:----------|:-------|:----------|:--------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                             |
| message   | string | N         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능 |

### RewindFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "RewindFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                              |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                    |
| errorCode | string | Y         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태 |
| data      | object | N         | -                                                                                                                                                                                                        |

### ToggleSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "ToggleSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "message": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                                                                                                      |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                            |
| message   | string | Y         | 임의의 string으로 특정 정보를 전달하여 Play에서 활용하고자 하는 경우 사용 가능<br/>- **shuffleOn** : 셔플 on<br/>- **shuffleOff** : 셔플 off<br/>- **repeatSongOn** : 곡 반복 on<br/>- **repeatAllOn** : 전체 반복 on<br/>- **repeatOff** : 반복 해제<br/>- **addLikeSong** : 좋아요 추가 성공<br/>- **removeLikeSong** : 좋아요 제거 성공 |

### ToggleFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "ToggleFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                                                                                                                                                                                                                                                                                         |
|:----------|:-------|:----------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                                                                                                                                                                                                                                                                               |
| errorCode | string | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **addLikeAlreadySong** : 이미 좋아요한 곡을 좋아요 추가<br/>- **addLikeExceedSong** : 좋아요 최대등록 수량 초과<br/>- **removeLikeNoSong** : 좋아요 상태가 아닌 곡 좋아요 해제 시도<br/>- **noTargetSong** : 플레이어에 재생가능한 곡이 없는 대기상태<br/>- **requireLogin** : 로그인 기능이 필수인 동작이나, 비로그인상태로 인한 실패<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시 |
| data      | object | N         | -                                                                                                                                                                                                                                                                                                                                                                                                                   |

### GetInfoSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "GetInfoSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "info": {
      "song": "{ #Song name }",
      "issueDate": "{{STRING}}",
      "playTime": "{{STRING}}",
      "playlistName": "{{STRING}}"
    }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                   |
|:----------|:-------|:----------|:----------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                         |
| info      | object | Y         | GetInfo directive에 전달된 "info"의 리스트에 포함된 필드 정보 |

### GetInfoFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "ResponseInfo",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                              |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| token     | string | Y         | Directive에서 전달한 token                                                                                                                                    |
| errorCode | string | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시 |
| data      | object | N         | -                                                                                                                                                        |

### HandlePlaylistSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandlePlaylistSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

### HandlePlaylistFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandlePlaylistFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                              |
|:----------|:-------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| errorCode | string | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시 |
| data      | object | N         | -                                                                                                                                                        |

### HandleLyricsSucceeded

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandleLyricsSucceeded",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}"
  }
}
```
{% endcode %}

### HandleLyricsFailed

{% code %}
```json
{
  "header": {
    "namespace": "MediaPlayer",
    "name": "HandleLyricsFailed",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "errorCode": "{{STRING}}",
    "data": { # arbitrary object }
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description                                                                                                                                               |
|:----------|:-------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| errorCode | string | N         | **(임의의 String으로 SDK에서 enum 처리하면 안됨)**<br/>실패 원인을 의미하며, 여기에 전달하는 string 값을 기반으로 응답 TTS 생성<br/>- **appInternalServerError** : CP의 내부 서버 연동간의 이슈로 응답실패 발생 시  |
| data      | object | N         | -                                                                                                                                                         |
