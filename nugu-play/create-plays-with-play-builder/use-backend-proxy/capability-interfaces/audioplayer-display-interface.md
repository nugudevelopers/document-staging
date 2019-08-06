---
depth_order: 2
---

# AudioPlayer를 위한 Display Interface

이 페이지에서는 AudioPlayer Interface를 사용할 때, 화면이 있는 디바이스에서 AudioPlayer 제어 화면을 제공할 때 사용하는 Display Interface를 안내합니다.

AudioPlayer Interface를 위한 Display Interface를 사용하기 위해서는 `General` > `기본 정보` > `Capability Interface`에서 `AudioPlayer` 만 체크하면 됩니다.

![](../../../../assets/images/audioplayer-display-interface-01.jpg)

#### 지원 디바이스

현재 AudioPlayer용 Display Interface를 지원하는 디바이스는 다음과 같으며, 지원 디바이스는 확장될 예정입니다.

* T map
* Btv
* NU300

## AudioPlayer Interface를 위한 확장 Template <a id="audioplayer-display-interface"></a>

AudioPlayer를 지원하는 Play가 화면을 가진 디바이스에서 사용될 때 보여지는 Template으로 Play를 개발할 때 다음의 두 작업을 꼭 해야 합니다.

1. Play Directive의 'metadata' 필드에 Template 정보 전달
2. Display Interface용 Event를 처리하는 Action 생성

### 1. Play Directive의 'metadata' 필드에 Template 정보 전달

AudioPlayer를 위한 확장 Template의 타입은 두 가지이며, 타입에 따라 Play Directive의 metadata 필드에 담을 정보는 다음과 같습니다.

* AudioPlayer.Template1
* AudioPlayer.Template2

#### AudioPlayer.Template1

![](../../../../assets/images/audioplayer-display-interface-02.png)

{% code %}
```json
{
  "metadata": {
    "template": {
      "type": "AudioPlayer.Template1",
      "title": {
        "iconUrl": "https://nugu.sk.com/music_icon.png",
        "text": "FLO Music"
      },
      "content": {
        "title": "NONO",
        "subtitle1": "Loopy",
        "subtitle2": "Prod. Code Kunst",
        "imageUrl": "https://nugu.sk.com/flo.jpg",
        "durationSec": "329"
      }
    }
  }
}
```
{% endcode %}

| Parameter           | Type   | Required | Description                                                                         |
|---------------------|--------|----------|-------------------------------------------------------------------------------------|
| type                | string | Y        | AudioPlayer template type<br/>1) AudioPlayer.Template1<br/>2) AudioPlayer.Template2 |
| title               | object | Y        | title object                                                                        |
| title.iconUrl       | string | N        | icon image url                                                                      |
| title.text          | string | Y        | title text                                                                          |
| content             | object | Y        | content object                                                                      |
| content.title       | string | Y        | content 영역의 title                                                                   |
| content.subtitle1   | string | Y        | subtitle1                                                                           |
| content.subtitle2   | string | Y        | subtitle2                                                                           |
| content.imageUrl    | string | Y        | image url                                                                           |
| content.durationSec | string | N        | 오디오 콘텐츠의 길이로 단위는 초이며, 0보다 큰 값을 가질 경우 Progress Bar가 활성화됩니다.                          |

#### AudioPlayer.Template2

![](../../../../assets/images/audioplayer-display-interface-03.png)

{% code %}
```json
{
  "metadata": {
    "template": {
      "type": "AudioPlayer.Template2",
      "title": {
        "iconUrl": "https://nugu.sk.com/news_icon.png",
        "text": "11월 8일 주요뉴스"
      },
      "content": {
        "title": "문대통령 \"BTS 꿈/열정에 세계 젊은 이들 용기... 빌보드 1위 축하\"",
        "subtitle": "T map을 위해 추가됨",
        "imageUrl": "https://nugu.sk.com/news_bg.jpg",
        "durationSec": "123"
      }
    }
  }
}
```
{% endcode %}

| Parameter            | Type    | Required  | Description                                                                                                         |
|----------------------|---------|-----------|---------------------------------------------------------------------------------------------------------------------|
| type                 | string  | Y         | AudioPlayer template type<br/>1) AudioPlayer.Template1<br/>2) AudioPlayer.Template2                                 |
| title               | object | Y        | title object                                                                                   |
| title.iconUrl        | string  | N         | icon image url                                                                                                      |
| title.text           | string  | Y         | title text                                                                                                          |
| content             | object | Y        | content object                                                                                 |
| content.title        | string  | Y         | content 영역의 title                                                                                                   |
| content.subtitle     | string  | Y         | T map용 Template은 기본으로 title, subtitle만 제공                                                                           |
| content.imageUrl     | string  | Y         | image url                                                                                                           |
| content.durationSec  | string  | N         | 오디오 콘텐츠의 길이로 단위는 초이며, 0보다 큰 값을 가질 경우 Progress Bar가 활성화됩니다.                                                          |

#### Template Type을 지정하지 않은 경우 (Default Template)

'metadata' 필드에 Template 타입을 지정하지 않은 경우, Default Template으로 동작하게 되며, Play가 화면을 가진 디바이스에서 오디오 재생 시 Play 이름만 표시됩니다. AudioPlayer, Display Interface를 함께 사용하는 경우, Template1이나 Template2를 사용하기를 권장합니다.

![](../../../../assets/images/audioplayer-display-interface-04.png)

{% alerts style="info" %}
T map은 Default, AudioPlayer.Template1, AudioPlayer.Template2과 같은 type과는 상관없이 아래 그림과 같이 제공됩니다.

![](../../../../assets/images/audioplayer-display-interface-05.png)
{% endalerts %}

### 2. Display Interface용 Event를 처리하는 Action 생성

#### 버튼 클릭 관련 Event

AudioPlayer를 위한 Template은 오디오 재생을 제어하는 버튼이 있으며, 이 버튼에 의해 총 다섯 개의 이벤트가 발생할 수 있습니다. AudioPlayer/Display Interface를 함께 사용하기 위해서는, 총 5개의 Event를 처리하는 5개의 Action을 반드시 정의해야 합니다.

{% alerts style="info" %}
5개의 Event가 Trigger인 5개의 Custom Action을 만들어야 합니다.
{% endalerts %}

{% code %}
```json
{
  "type": "AudioPlayer.NextCommandIssued",
  "token": "{{STRING}}",
  "offsetInMilliseconds": {{LONG}}
}
```
{% endcode %}

| Event                 | Description                 | Action 생성                                                                                                                                              |
|-----------------------|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| NextCommandIssued     | next 버튼을 눌렀을 때 발생하는 이벤트     | NextCommandIssued 이벤트가 trigger인 Action을 정의해야 합니다.                                                                                                      |
| PreviousCommandIssued | previous 버튼을 눌렸을 때 발생하는 이벤트 | PreviousCommandIssued 이벤트가 trigger인 Action을 정의해야 합니다.                                                                                                  |
| PlayCommandIssued     | play 버튼을 눌렀을 때 발생하는 이벤트     | PlayCommandIssued 이벤트가 trigger인 Root Action 하위에 2개의 Branch Action을 만들어, AudioPlayer_playerActivity가 PAUSED인 Branch와 STOPPED/FINISHED 인 경우를 구분해주어야 합니다. |
| PauseCommandIssued    | pause 버튼을 눌렀을 때 발생하는 이벤트    | PauseCommandIssued 이벤트가 trigger인 Action을 정의해야 합니다.                                                                                                     |
| StopCommandIssued     | stop 버튼을 눌렀을 때 발생하는 이벤트     | StopCommandIssued 이벤트가 trigger인 Action을 정의해야 합니다.                                                                                                      |

#### PlaybackFinished Event

하나의 음원 스트리밍 재생이 끝난 경우 발생하는 PlaybackFinished Event를 처리할 Action을 정의해야 합니다. 이 Action에서는 Play Directive 또는 Stop Directive 중 하나를 전송해야 합니다.

* Play Directive : 다음 재생할 곡이 있는 경우
* Stop Directive : 한 곡만 재생하는 중이거나, Play List의 마지막 곡을 재생중이면서, 전체 반복을 하지 않는 경우
