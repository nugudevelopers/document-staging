---
depth_order: 1
---

# Display-Directive

### Close

화면 종료 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Close",
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

### ControlFocus

List item 의 포커스 이동 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "ControlFocus",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "direction": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description    |
|:----------|:-------|:----------|:---------------|
| direction | string | Y         | PREVIOUS, NEXT |

### ControlScroll

List 의 스크롤 이동 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "ControlScroll",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "direction": "{{STRING}}"
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description    |
|:----------|:-------|:----------|:---------------|
| direction | string | Y         | PREVIOUS, NEXT |

### Update

화면 갱신 요청입니다.

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Update",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    ...
  }
}
```
{% endcode %}

| parameter | type   | mandatory | description               |
|:----------|:-------|:----------|:--------------------------|
| token     | string | Y         | 변경된 template 의 token      |
| -         | -      | Y         | template payload 중 변경된 부분 |

## Directive - Template <a id="directive-template"></a>

### FullText1/2/3, ImageText1/2/3/4

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "FullText1" | "FullText2" | "FullText2" | "FullText3" | "ImageText1" | "ImageText2" | "ImageText3" | "ImageText4",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "image": ImageObject,
      "imageAlign": "{{STRING}}"
      "header": TextObject,
      "body": TextObject,
      "footer": TextObject
    },
    "grammarGuide": GrammarGuide,
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                            | mandatory | description                                  |
|:------------------------|:------------------------------------------------|:----------|:---------------------------------------------|
| token                   | string                                          | Y         | template을 식별하기 위한 unique identifier          |
| contextLayer            | [ContextLayer](../display#contextlayer)         | N         | -                                            |
| duration                | [Duration](../display#duration)                 | N         | -                                            |
| title                   | [TitleObject](../display#titleobject)           | Y         | -                                            |
| background              | [BackgroundObject](../display#backgroundobject) | N         | -                                            |
| content                 | object                                          | Y         | -                                            |
| content.image           | [ImageObject](../display#imageobject)           | N         | -                                            |
| content.imageAlign      | string                                          | N         | LEFT, RIGHT                                  |
| content.header          | [TextObject](../display#textobject)             | N         | 본문 제목<br/>- 줄바꿈 가능 ('\n')                    |
| content.body            | [TextObject](../display#textobject)             | N         | 본문 내용<br/>- 줄바꿈 가능 ('\n')<br/>- Scrollable   |
| content.footer          | [TextObject](../display#textobject)             | N         | 보조 설명                                        |
| grammarGuide            | [GrammarGuide](../display#grammarguide)         | N         | -                                            |
| supportFocusedItemToken | bool                                            | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부   |
| supportVisibleTokenList | bool                                            | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부   |

### TextList1/2, ImageList1/2/3

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "TextList1" | "TextList2" | "ImageList1" | "ImageList2" | "ImageList3",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "badgeNumber": {{BOOLEAN}},
    "badgeNumberMode": "{{STRING}}",
    "focusable": {{BOOLEAN}},
    "anchorItemToken": "{{STRING}}",
    "listItems": [
      {
        "token": "{{STRING}}",
        "image": ImageObject,
        "icon": ImageObject,
        "header": TextObject,
        "body": TextObject,
        "footer": TextObject,
        "type": "{{STRING}}",
        "toggle": ToggleButtonObject,
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        }
      }
    ]
    "grammarGuide": GrammarGuide,
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                                | mandatory | description                                                                                                                                                                                |
|:----------------------------------|:----------------------------------------------------|:----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                              | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                        |
| contextLayer                      | [ContextLayer](../display#contextlayer)             | N         | -                                                                                                                                                                                          |
| duration                          | [Duration](../display#duration)                     | N         | -                                                                                                                                                                                          |
| title                             | [TitleObject](../display#titleobject)               | Y         | -                                                                                                                                                                                          |
| background                        | [BackgroundObject](../display#backgroundobject)     | N         | -                                                                                                                                                                                          |
| badgeNumber                       | bool                                                | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음)<br/>default - false                                                                                         |
| badgeNumberMode                   | string                                              | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                       |
| focusable                         | bool                                                | N         | List Template의 item들이 focus 가능한지 여부<br/>default - true                                                                                                                                     |
| anchorItemToken                   | string                                              | N         | display 될 때 첫 번째로 보여지는 아이템의 토큰                                                                                                                                                             |
| listItems                         | array                                               | Y         | Scrollable                                                                                                                                                                                 |
| listItems.token                   | string                                              | Y         | 클릭은 한 item 전체에서 가능                                                                                                                                                                         |
| listItems.image                   | [ImageObject](../display#imageobject)               | N         | -                                                                                                                                                                                          |
| listItems.icon                    | [ImageObject](../display#imageobject)               | N         | -                                                                                                                                                                                          |
| listItems.header                  | [TextObject](../display#textobject)                 | N         | 본문 제목 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                           |
| listItems.body                    | [TextObject](../display#textobject)                 | N         | 본문 내용 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                           |
| listItems.footer                  | [TextObject](../display#textobject)                 | N         | 보조설명 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                            |
| listItems.type                    | string                                              | N         | list item의 type을 의미하며, 정의하지 않으면 위의 예시와 같은 일반형을 의미함.<br/>"SEPARATOR"로 정의할 경우에는 아래와 같은 header만이 유효한 구분용 타이틀 항목이 표시됨.                                                                         |
| listItems.toggle                  | [ToggleButtonObject](../display#togglebuttonobject) | N         | 리스트아이템의 우측에 표시되는 토글 버튼                                                                                                                                                                     |
| listItems.eventType               | string                                              | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- Display.ElementSelected<br/>-  default (eventType 값이 없는 경우 기본값)<br/>- Text.TextInput -  default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                              | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                          |
| listItems.textInput.text          | string                                              | Y         | 전달할 텍스트                                                                                                                                                                                    |
| listItems.textInput.playServiceId | string                                              | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                  |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)             | N         | -                                                                                                                                                                                          |
| supportFocusedItemToken           | bool                                                | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                 |
| supportVisibleTokenList           | bool                                                | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                 |

### TextList3/4

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "TextList3" | "TextList4",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.3"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "badgeNumber": {{BOOLEAN}},
    "badgeNumberMode": "{{STRING}}",
    "focusable": {{BOOLEAN}},
    "anchorItemToken": "{{STRING}}",
    "listItems": [
      {
        "token": "{{STRING}}",
        "image": ImageObject,
        "icon": ImageObject,
        "header": TextObject,
        "body": [TextObject],
        "footer": TextObject,
        "button": ToggleButtonObject,
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        }
      }
    ]
    "caption": TextObject,
    "grammarGuide": GrammarGuide,
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                             | mandatory | description                                                                                                                                                                                    |
|:----------------------------------|:-------------------------------------------------|:----------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                           | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                            |
| contextLayer                      | [ContextLayer](../display#contextlayer)          | N         | -                                                                                                                                                                                              |
| duration                          | [Duration](../display#duration)                  | N         | -                                                                                                                                                                                              |
| title                             | [TitleObject](../display#titleobject)            | Y         | -                                                                                                                                                                                              |
| background                        | [BackgroundObject](../display#backgroundobject)  | N         | -                                                                                                                                                                                              |
| badgeNumber                       | bool                                             | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음)<br/>default - false                                                                                             |
| badgeNumberMode                   | string                                           | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                           |
| focusable                         | bool                                             | N         | List Template의 item들이 focus 가능한지 여부 default - true                                                                                                                                             |
| anchorItemToken                   | string                                           | N         | display 될 때 첫 번째로 보여지는 아이템의 토큰                                                                                                                                                                 |
| listItems                         | array                                            | Y         | Scrollable                                                                                                                                                                                     |
| listItems.token                   | string                                           | Y         | 클릭은 한 item 전체에서 가능                                                                                                                                                                             |
| listItems.image                   | [ImageObject](../display#imageobject)            | N         | -                                                                                                                                                                                              |
| listItems.icon                    | [ImageObject](../display#imageobject)            | N         | -                                                                                                                                                                                              |
| listItems.header                  | [TextObject](../display#textobject)              | N         | 본문 제목 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                               |
| listItems.body                    | array of [TextObject](../display#textobject)     | N         | 본문 내용 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                               |
| listItems.footer                  | [TextObject](../display#textobject)              | N         | 보조설명 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                                |
| listItems.button                  | [ButtonObject](../display#buttonobject)          | N         | List 아이템의 버튼 body가 2줄인 경우에 최적화 되어 있음.                                                                                                                                                          |
| listItems.eventType               | string                                           | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** :  default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** :  default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                           | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                              |
| listItems.textInput.text          | string                                           | Y         | 전달할 텍스트                                                                                                                                                                                        |
| listItems.textInput.playServiceId | string                                           | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                      |
| caption                           | [TextObject](../display#textobject)              | N         | 전체 리스트 아이템들에 대한 보조설명 텍스트 길이 : 최대 2줄(단말에 따라 1줄)                                                                                                                                                 |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)          | N         | -                                                                                                                                                                                              |
| supportFocusedItemToken           | bool                                             | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                     |
| supportVisibleTokenList           | bool                                             | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                     |

### Weather1/2

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Weather1" | "Weather2",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "header": TextObject,
      "image": ImageObject,
      "temperature": {
        "current": TextObject,
        "max": TextObject,
        "min": TextObject
      },
      "body": TextObject,
      "footer": TextObject,
      "listItems": [
        {
          "header": TextObject,
          "image": ImageObject,
          "body": TextObject,
          "footer": TextObject
        }
      ]
    },
    "grammarGuide": GrammarGuide,
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                   | type                                            | mandatory | description                                |
|:----------------------------|:------------------------------------------------|:----------|:-------------------------------------------|
| token                       | string                                          | Y         | template을 식별하기 위한 unique identifier        |
| contextLayer                | [ContextLayer](../display#contextlayer)         | N         | -                                          |
| duration                    | [Duration](../display#duration)                 | N         | -                                          |
| title                       | [TitleObject](../display#titleobject)           | Y         | -                                          |
| background                  | [BackgroundObject](../display#backgroundobject) | N         | -                                          |
| content.header              | [TextObject](../display#textobject)             | N         | 날씨정보를 나타내는 헤더 문자열                          |
| content.image               | [TextObject](../display#textobject)             | N         | 날씨정보를 나타내는 이미지                             |
| content.temperature.current | [TextObject](../display#textobject)             | N         | 현재 온도                                      |
| content.temperature.max     | [TextObject](../display#textobject)             | N         | 최고 온도                                      |
| content.temperature.min     | [TextObject](../display#textobject)             | N         | 최저 온도                                      |
| content.body                | [TextObject](../display#textobject)             | N         | 미세먼지, 오전, 건조주의보 등의 날씨에 대한 설명 HTML 표현 가능    |
| content.footer              | [TextObject](../display#textobject)             | N         | body 아래 표현되는 텍스트(html 가능)                  |
| content.listItems           | list                                            | N         | 시간별 날씨 정보 표현을 위한 리스트                       |
| content.listItems.header    | [TextObject](../display#textobject)             | N         | -                                          |
| content.listItems.image     | [ImageObject](../display#imageobject)           | N         | -                                          |
| content.listItems.body      | [TextObject](../display#textobject)             | N         | -                                          |
| content.listItems.footer    | [TextObject](../display#textobject)             | N         | -                                          |
| grammarGuide                | [GrammarGuide](../display#grammarguide)         | N         | -                                          |
| supportFocusedItemToken     | bool                                            | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부 |
| supportVisibleTokenList     | bool                                            | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부 |

### Weather3/4

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Weather3" | "Weather4",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
      "playServiceId": "{{STRING}}",
      "token": "{{STRING}}",
      "contextLayer": "{{STRING}}",
      "duration": "{{STRING}}",
      "title": TextObject,
      "background": BackgroundObject,
      "content": {
        "listItems": [
          {
            "header": TextObject,
            "body": TextObject,
            "image": ImageObject,
            "temperature": {
              "max": TextObject,
              "min": TextObject
            },
            "footer": TextObject,
            "focus": {{Boolean}}
          }
        ]
      },
    "grammarGuide": GrammarGuide,
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                 | type                                            | mandatory | description                                |
|:--------------------------|:------------------------------------------------|:----------|:-------------------------------------------|
| token                     | string                                          | Y         | template을 식별하기 위한 unique identifier        |
| contextLayer              | [ContextLayer](../display#contextlayer)         | N         | -                                          |
| duration                  | [Duration](../display#duration)                 | N         | -                                          |
| title                     | [TitleObject](../display#titleobject)           | Y         | -                                          |
| background                | [BackgroundObject](../display#backgroundobject) | N         | -                                          |
| listItems                 | list                                            | N         | 현재는 최대 2개의 아이템을 보여주고 있음                    |
| listItems.header          | [TextObject](../display#textobject)             | N         | item의 최상위 텍스트                              |
| listItems.body            | [TextObject](../display#textobject)             | N         | item의 주요내용 텍스트                             |
| listItems.image           | [ImageObject](../display#imageobject)           | N         | item의 주 이미지                                |
| listItems.temperature.max | [TextObject](../display#textobject)             | N         | 최대 온도                                      |
| listItems.temperature.min | [TextObject](../display#textobject)             | N         | 최저 온도                                      |
| listItems.footer          | [TextObject](../display#textobject)             | N         | 기타정보를 위한 텍스트                               |
| listItems.focus           | boolean                                         | N         | focus 여부(bold 처리)                          |
| grammarGuide              | [GrammarGuide](../display#grammarguide)         | N         | -                                          |
| supportFocusedItemToken   | bool                                            | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부 |
| supportVisibleTokenList   | bool                                            | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부 |

### Weather5

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Weather5",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "header": TextObject,
      "body": TextObject,
      "footer": TextObject,
      "progress": {{LONG}},
      "min": TextObject,
      "max": TextObject,
      "icon": ImageObject
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                            | mandatory | description                                |
|:------------------------|:------------------------------------------------|:----------|:-------------------------------------------|
| token                   | string                                          | Y         | template을 식별하기 위한 unique identifier        |
| contextLayer            | [ContextLayer](../display#contextlayer)         | N         | -                                          |
| duration                | [Duration](../display#duration)                 | N         | -                                          |
| title                   | [TitleObject](../display#titleobject)           | Y         | -                                          |
| background              | [BackgroundObject](../display#backgroundobject) | N         | -                                          |
| content. header         | [TextObject](../display#textobject)             | N         | 헤더 문자열                                     |
| content. body           | [TextObject](../display#textobject)             | N         | 게이지 중앙의 문자열                                |
| content. footer         | [TextObject](../display#textobject)             | N         | 게이지 중앙 하단의 부연 문자열                          |
| content. progress       | long                                            | N         | 게이지 진행도(0에서 1사이의 값)                        |
| content. progressColor  | String                                          | N         | 게이지의 색(default는 red)                       |
| content. min            | [TextObject](../display#textobject)             | N         | 게이지 최저값                                    |
| content. max            | [TextObject](../display#textobject)             | N         | 게이지 최고값                                    |
| content. icon           | [ImageObject](../display#imageobject)           | N         | 게이지 아이콘 이미지                                |
| grammarGuide            | [GrammarGuide](../display#grammarguide)         | N         | -                                          |
| supportFocusedItemToken | boolean                                         | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부 |
| supportVisibleTokenList | boolean                                         | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부 |

### FullImage

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "FullImage",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.1"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "image": ImageObject
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                            | mandatory | description                                |
|:------------------------|:------------------------------------------------|:----------|:-------------------------------------------|
| token                   | string                                          | Y         | template을 식별하기 위한 unique identifier        |
| contextLayer            | [ContextLayer](../display#contextlayer)         | N         | -                                          |
| duration                | [Duration](../display#duration)                 | N         | -                                          |
| title                   | [TitleObject](../display#titleobject)           | Y         | -                                          |
| background              | [BackgroundObject](../display#backgroundobject) | N         | -                                          |
| content.image           | [ImageObject](../display#imageobject)           | Y         | -                                          |
| grammarGuide            | [GrammarGuide](../display#grammarguide)         | N         | -                                          |
| supportFocusedItemToken | boolean                                         | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부 |
| supportVisibleTokenList | boolean                                         | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부 |

### Score1

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Score1",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "schedule": TextObject,
      "status": TextObject,
      "match": [
        {
          "header": TextObject,
          "body": TextObject,
          "footer": TextObject,
          "image": ImageObject,
          "score": TextObject
        }
      ]
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                            | mandatory | description                                |
|:------------------------|:------------------------------------------------|:----------|:-------------------------------------------|
| token                   | string                                          | Y         | template을 식별하기 위한 unique identifier        |
| contextLayer            | [ContextLayer](../display#contextlayer)         | N         | -                                          |
| duration                | [Duration](../display#duration)                 | N         | -                                          |
| title                   | [TitleObject](../display#titleobject)           | Y         | -                                          |
| background              | [BackgroundObject](../display#backgroundobject) | N         | -                                          |
| content.schedule        | [TextObject](../display#textobject)             | N         | 경기 스케줄 정보                                  |
| content.status          | [TextObject](../display#textobject)             | Y         | 경기 상태                                      |
| content.match           | list                                            | Y         | 팀정보를 노출하기 위한 리스트                           |
| content.match.header    | [TextObject](../display#textobject)             | Y         | 본문 제목(1줄)                                  |
| content.match.body      | [TextObject](../display#textobject)             | N         | 본문 내용(1줄)                                  |
| content.match.footer    | [TextObject](../display#textobject)             | N         | 보조 설명(2줄)                                  |
| content.match.image     | [ImageObject](../display#imageobject)           | Y         | 팀로고                                        |
| content.match.score     | [TextObject](../display#textobject)             | Y         | 스코어                                        |
| grammarGuide            | [GrammarGuide](../display#grammarguide)         | N         | -                                          |
| supportFocusedItemToken | boolean                                         | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부 |
| supportVisibleTokenList | boolean                                         | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부 |

### **Score2**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Score2",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "listItems": [
      {
        "token": "{{STRING}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "schedule": TextObject,
        "status": TextObject,
        "match": [
          {
            "header": TextObject,
            "body": TextObject,
            "footer": TextObject,
            "image": ImageObject,
            "score": TextObject
          }
        ]
      }
    ],
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                            | mandatory | description                                                                                                                                                                                   |
|:----------------------------------|:------------------------------------------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                          | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                           |
| contextLayer                      | [ContextLayer](../display#contextlayer)         | N         | -                                                                                                                                                                                             |
| duration                          | [Duration](../display#duration)                 | N         | -                                                                                                                                                                                             |
| title                             | [TitleObject](../display#titleobject)           | Y         | -                                                                                                                                                                                             |
| background                        | [BackgroundObject](../display#backgroundobject) | N         | -                                                                                                                                                                                             |
| listItems                         | list                                            | Y         | -                                                                                                                                                                                             |
| listItems.token                   | string                                          | Y         | -                                                                                                                                                                                             |
| listItems.eventType               | string                                          | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** :  default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                          | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                             |
| listItems.textInput.text          | string                                          | Y         | 전달할 텍스트                                                                                                                                                                                       |
| listItems.textInput.playServiceId | string                                          | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                     |
| listItems.schedule                | [TextObject](../display#textobject)             | N         | 경기 스케줄 정보                                                                                                                                                                                     |
| listItems.status                  | [TextObject](../display#textobject)             | Y         | 경기 상태                                                                                                                                                                                         |
| listItems.match                   | list                                            | Y         | 팀정보                                                                                                                                                                                           |
| listItems.match.header            | [TextObject](../display#textobject)             | Y         | 본문 제목(1줄)                                                                                                                                                                                     |
| listItems.match.body              | [TextObject](../display#textobject)             | N         | 본문 내용(2줄)                                                                                                                                                                                     |
| listItems.match.image             | [ImageObject](../display#imageobject)           | Y         | 팀로고                                                                                                                                                                                           |
| listItems.match.score             | [TextObject](../display#textobject)             | Y         | 스코어                                                                                                                                                                                           |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)         | N         | -                                                                                                                                                                                             |
| supportFocusedItemToken           | boolean                                         | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                    |
| supportVisibleTokenList           | boolean                                         | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                    |

### **SearchList1**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "SearchList1",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "listItems": [
      {
        "token": "{{STRING}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "title": TextObject,
        "subtitle": TextObject,
        "description": TextObject,
        "image": ImageObject,
        "category": "{{String}}",
        "badge": TextObject,
        "subBadge": TextObject,
        "subIcon": ImageObject
      }
    ],
    "grammarGuide": [],
    "metadata": {},
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                             | mandatory | description                                                                                                                                                                                  |
|:----------------------------------|:-------------------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                           | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                          |
| contextLayer                      | [ContextLayer](../display#contextlayer)          | N         | -                                                                                                                                                                                            |
| duration                          | [Duration](../display#duration)                  | N         | -                                                                                                                                                                                            |
| title                             | [TitleObject](../display#titleobject)            | Y         | -                                                                                                                                                                                            |
| background                        | [BackgroundObject](../display#backgroundobject)  | N         | -                                                                                                                                                                                            |
| badgeNumber                       | bool                                             | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음) default : false                                                                                               |
| badgeNumberMode                   | string                                           | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                         |
| listItems.token                   | string                                           | Y         | -                                                                                                                                                                                            |
| listItems.eventType               | string                                           | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                           | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                            |
| listItems.textInput.text          | string                                           | Y         | 전달할 텍스트                                                                                                                                                                                      |
| listItems.textInput.playServiceId | string                                           | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                    |
| listItems.title                   | [TextObject](../display#textobject)              | Y         | item의 제목 텍스트                                                                                                                                                                                 |
| listItems.subtitle                | [TextObject](../display#textobject)              | N         | category가 people, epg인 경우에만 표시됨.                                                                                                                                                             |
| listItems.description             | [TextObject](../display#textobject)              | N         | category가 people인 경우에만 표시됨.                                                                                                                                                                  |
| listItems.image                   | [ImageObject](../display#imageobject)            | N         | item의 배경 이미지 vod, epg인 경우는 필수.                                                                                                                                                               |
| listItems.category                | [TextObject](../display#textobject)              | Y         | item의 종류. vod, epg, people 중 한가지 값을 가져야 함.                                                                                                                                                   |
| listItems.badge                   | [TextObject](../display#textobject)              | N         | 아이템 우상단에 표시되는 뱃지                                                                                                                                                                             |
| listItems.subBadge                | [TextObject](../display#textobject)              | N         | 아이템 좌상단에 표시되는 뱃지                                                                                                                                                                             |
| listItems.subIcon                 | [ImageObject](../display#imageobject)            | N         | epg category인 경우, subtitle 좌측에 표시되는 icon                                                                                                                                                     |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)          | N         | -                                                                                                                                                                                            |
| metadata                          | jsonObject                                       | N         | display에 대한 임의의 부가정보                                                                                                                                                                         |
| supportFocusedItemToken           | boolean                                          | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                   |
| supportVisibleTokenList           | boolean                                          | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                   |

### **SearchList2**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "SearchList2",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "content": {
      "body": TextObject,
      "footer": TextObject,
      "listItems": [
        {
          "token": "{{STRING}}",
          "eventType": "{{STRING}}",
          "textInput": {
            "text": "{{STRING}}",
            "playServiceId": "{{STRING}}"
          },
          "header": TextObject
        }
      ]
    },
    "grammarGuide": [],
    "metadata": {},
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                            | mandatory | description                                                                                                                                                                                  |
|:----------------------------------|:------------------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                          | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                          |
| contextLayer                      | [ContextLayer](../display#contextlayer)         | N         | -                                                                                                                                                                                            |
| duration                          | [Duration](../display#duration)                 | N         | -                                                                                                                                                                                            |
| title                             | [TitleObject](../display#titleobject)           | Y         | -                                                                                                                                                                                            |
| background                        | [BackgroundObject](../display#backgroundobject) | N         | -                                                                                                                                                                                            |
| content.body                      | [TextObject](../display#textobject)             | Y         | 본문 텍스트                                                                                                                                                                                       |
| content.footer                    | [TextObject](../display#textobject)             | Y         | -                                                                                                                                                                                            |
| content.listItems                 | list                                            | N         | -                                                                                                                                                                                            |
| content.listItems.token           | string                                          | Y         | -                                                                                                                                                                                            |
| content.listItems.eventType       | string                                          | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                          | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                            |
| listItems.textInput.text          | string                                          | Y         | 전달할 텍스트                                                                                                                                                                                      |
| listItems.textInput.playServiceId | string                                          | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                    |
| content.listItems.header          | [TextObject](../display#textobject)             | Y         | -                                                                                                                                                                                            |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)         | N         | -                                                                                                                                                                                            |
| metadata                          | jsonObject                                      | N         | display에 대한 임의의 부가정보                                                                                                                                                                         |
| supportFocusedItemToken           | boolean                                         | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                   |
| supportVisibleTokenList           | boolean                                         | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                   |

### **UnifiedSearch1**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "UnifiedSearch1",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "listItems": [
      {
        "type": "{{STRING}}",
        "token": "{{STRING}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "title": TextObject,
        "titleIcon": ImageObject,
        "subtitle": TextObject,
        "description": TextObject,
        "image": ImageObject
      }
    ],
    "grammarGuide": [],
    "metadata": {},
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                            | mandatory                      | description                                                                                                                                                                                                          |
|:----------------------------------|:------------------------------------------------|:-------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                          | Y                              | template을 식별하기 위한 unique identifier                                                                                                                                                                                  |
| contextLayer                      | [ContextLayer](../display#contextlayer)         | N                              | -                                                                                                                                                                                                                    |
| duration                          | [Duration](../display#duration)                 | N                              | -                                                                                                                                                                                                                    |
| title                             | [TitleObject](../display#titleobject)           | Y                              | -                                                                                                                                                                                                                    |
| titltIcon                         | [TextObject](../display#textobject)             | N                              | -                                                                                                                                                                                                                    |
| background                        | [BackgroundObject](../display#backgroundobject) | N                              | -                                                                                                                                                                                                                    |
| badgeNumber                       | bool                                            | N                              | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음) default : false                                                                                                                       |
| badgeNumberMode                   | string                                          | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                                                 |
| listItems                         | object                                          | Y                              | -                                                                                                                                                                                                                    |
| listItems.type                    | string                                          | Y                              | 아이템의 타입<br/>- **MAIN** : 현재 처리 중인 도메인의 아이템 (ex. 비디오)<br/>- **TOPIC** : 다른 리스트 아임템과 동일하게 스크롤<br/>- **SEPARATOR** : 리스트 아이템간의 구분자 (클릭할 수 없음)<br/>- **ETC** : 다른 도메인에서 처리하기 위한 아이템 (ex. 음악)                             |
| listItems.token                   | string                                          | N                              | - **MAIN** : mandatory<br/>- **TOPIC** : optional (포함되는 경우 해당 항목을 클릭할 수 있음)<br/>- token을 포함하지 않으면 클릭할 수 없고, focus도 이동하지 않으며, context의 visibleTokenList에도 포함되지 않음<br/>- **SEPARATOR** : 포함하면 안됨 - **ETC** : mandatory |
| listItems.eventType               | string                                          | N                              | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값)                         |
| listItems.textInput               | object                                          | N                              | eventType == TextTextInput인 경우 필수                                                                                                                                                                                    |
| listItems.textInput.text          | string                                          | N                              | 전달할 텍스트                                                                                                                                                                                                              |
| listItems.textInput.playServiceId | string                                          | N                              | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                                            |
| listItems.title                   | [TextObject](../display#textobject)             | Y                              | item의 제목 텍스트                                                                                                                                                                                                         |
| listItems.subtitle                | [TextObject](../display#textobject)             | N                              | category가 people, epg인 경우에만 표시됨.                                                                                                                                                                                     |
| listItems.description             | [TextObject](../display#textobject)             | N                              | category가 people인 경우에만 표시됨.                                                                                                                                                                                          |
| listItems.image                   | [ImageObject](../display#imageobject)           | N                              | item의 배경 이미지 vod, epg인 경우는 필수.                                                                                                                                                                                       |
| listItems.category                | [TextObject](../display#textobject)             | N (listItems.type == MAIN이면 Y) | type이 MAIN인 경우는 꼭 포함해야 함 item의 종류.<br/>vod, epg, people 중 한가지 값을 가져야 함.                                                                                                                                              |
| listItems.subIcon                 | [ImageObject](../display#imageobject)           | N                              | epg category인 경우, subtitle 좌측에 표시되는 icon                                                                                                                                                                             |
| listItems.progress                | long                                            | N                              | epg category인 경우, image 아래에 표시되는 프로그레스바<br/>- 0~100의 값을 가지며 %를 의미                                                                                                                                                    |
| listItems.topLeft                 | [BadgeObject](../display#badgeobject)           | N                              | 아이템 좌상단에 표시되는 뱃지                                                                                                                                                                                                     |
| listItems.topRight                | [BadgeObject](../display#badgeobject)           | N                              | 아이템 우상단에 표시되는 뱃지                                                                                                                                                                                                     |
| listItems.bottomLeft              | [BadgeObject](../display#badgeobject)           | N                              | 아이템 좌하단에 표시되는 뱃지                                                                                                                                                                                                     |
| listItems.bottomRight             | [BadgeObject](../display#badgeobject)           | N                              | 아이템 우하단에 표시되는 뱃지                                                                                                                                                                                                     |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)         | N                              | -                                                                                                                                                                                                                    |
| metadata                          | jsonObject                                      | N                              | display에 대한 임의의 부가정보                                                                                                                                                                                                 |
| supportFocusedItemToken           | boolean                                         | N                              | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                                           |
| supportVisibleTokenList           | boolean                                         | N                              | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                                           |

### **CommerceList**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "CommerceList",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "focusable": {{Boolean}},
    "anchorItemToken": "{{STRING}}",
    "listItems": [
      {
        "token": "{{STRING}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "image": ImageObject,
        "header": TextObject,
        "body": TextObject,
        "footer": TextObject,
        "detail": TextObject,
        "price": TextObject,
        "priceDesc": TextObject
      }
    ],
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                    | mandatory | description                                                                                                                                                                                  |
|:----------------------------------|:----------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                  | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                          |
| contextLayer                      | [ContextLayer](../display#contextlayer) | N         | -                                                                                                                                                                                            |
| duration                          | [Duration](../display#duration)         | N         | -                                                                                                                                                                                            |
| title                             | [TitleObject](../display#titleobject)   | Y         | -                                                                                                                                                                                            |
| badgeNumber                       | bool                                    | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음) default : false                                                                                               |
| badgeNumberMode                   | string                                  | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                         |
| focusable                         | bool                                    | N         | List Template의 item들이 focus 가능한지 여부 default - true                                                                                                                                           |
| anchorItemToken                   | string                                  | N         | display 될 때 첫 번째로 보여지는 아이템의 토큰                                                                                                                                                               |
| listItems                         | list                                    | Y         | -                                                                                                                                                                                            |
| listItems.token                   | string                                  | Y         | -                                                                                                                                                                                            |
| listItems.eventType               | string                                  | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                  | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                            |
| listItems.textInput.text          | string                                  | Y         | 전달할 텍스트                                                                                                                                                                                      |
| listItems.textInput.playServiceId | string                                  | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                    |
| listItems.image                   | [ImageObject](../display#imageobject)   | Y         | 상품 이미지                                                                                                                                                                                       |
| listItems.header                  | [TextObject](../display#textobject)     | Y         | 제목 (상품명-최대 2줄 노출)                                                                                                                                                                            |
| listItems.body                    | [TextObject](../display#textobject)     | N         | 본문 내용 (옵션/상세 설명-최대 1줄)                                                                                                                                                                       |
| listItems.footer                  | [TextObject](../display#textobject)     | N         | 보조 설명1 (최상단에 노출)                                                                                                                                                                             |
| listItems.detail                  | [TextObject](../display#textobject)     | N         | 보조 설명2                                                                                                                                                                                       |
| listItems.price                   | [TextObject](../display#textobject)     | Y         | 가격 정보1                                                                                                                                                                                       |
| listItems.priceDesc               | [TextObject](../display#textobject)     | N         | 가격 정보2                                                                                                                                                                                       |
| grammarGuide                      | [GrammarGuide](../display#grammarguide) | N         | -                                                                                                                                                                                            |
| supportFocusedItemToken           | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                   |
| supportVisibleTokenList           | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                   |

### **CommerceOption**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "CommerceOption",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "focusable": {{Boolean}},
    "anchorItemToken": "{{STRING}}",
    "content": {
      "image": ImageObject,
      "header": TextObject,
      "body": TextObject,
      "price": TextObject,
      "priceDesc": TextObject,
      "listItems": [
        {
          "token": "{{STRING}}",
          "eventType": "{{STRING}}",
          "textInput": {
            "text": "{{STRING}}",
            "playServiceId": "{{STRING}}"
          },
          "header": TextObject
        }
      ]
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                    | mandatory | description                                                                                                                                                                                   |
|:----------------------------------|:----------------------------------------|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                  | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                           |
| contextLayer                      | [ContextLayer](../display#contextlayer) | N         | -                                                                                                                                                                                             |
| duration                          | [Duration](../display#duration)         | N         | -                                                                                                                                                                                             |
| title                             | [TitleObject](../display#titleobject)   | Y         | -                                                                                                                                                                                             |
| badgeNumber                       | bool                                    | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음) default : false                                                                                                |
| badgeNumberMode                   | string                                  | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                          |
| focusable                         | bool                                    | N         | List Template의 item들이 focus 가능한지 여부<br/>default : true                                                                                                                                        |
| anchorItemToken                   | string                                  | N         | display 될 때 첫 번째로 보여지는 아이템의 토큰                                                                                                                                                                |
| content.image                     | [ImageObject](../display#imageobject)   | Y         | 상품 이미지                                                                                                                                                                                        |
| content.header                    | [TextObject](../display#textobject)     | Y         | 제목 (상품명-최대 2줄 노출)                                                                                                                                                                             |
| content.body                      | [TextObject](../display#textobject)     | N         | 본문 내용 (상품 옵션/상세 설명-최대 2줄 노출)                                                                                                                                                                  |
| content.price                     | [TextObject](../display#textobject)     | Y         | 가격 정보1                                                                                                                                                                                        |
| content.priceDesc                 | [TextObject](../display#textobject)     | N         | 가격 정보2                                                                                                                                                                                        |
| content.listItems                 | list                                    | Y         | 옵션 정보                                                                                                                                                                                         |
| listItems.token                   | string                                  | Y         | 옵션 토큰                                                                                                                                                                                         |
| listItems.eventType               | string                                  | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값)  |
| listItems.textInput               | object                                  | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                             |
| listItems.textInput.text          | string                                  | Y         | 전달할 텍스트                                                                                                                                                                                       |
| listItems.textInput.playServiceId | string                                  | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                     |
| listItems.header                  | [TextObject](../display#textobject)     | Y         | 보조설명(옵션명-최대 4줄)                                                                                                                                                                               |
| grammarGuide                      | [GrammarGuide](../display#grammarguide) | N         | -                                                                                                                                                                                             |
| supportFocusedItemToken           | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                    |
| supportVisibleTokenList           | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                    |

### **CommercePrice**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "CommercePrice",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "content": {
      "image": ImageObject,
      "header": TextObject,
      "body": TextObject,
      "price": TextObject,
      "priceDesc": TextObject,
      "icon": ImageObject,
      "subText": TextObject,
      "totalPrice": TextObject,
      "totalPriceDesc": TextObject,
      "confirm": ButtonObject,
      "cancel": ButtonObject,
      "next": ButtonObject,
      "prev": ButtonObject
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                    | mandatory | description                                 |
|:------------------------|:----------------------------------------|:----------|:--------------------------------------------|
| token                   | string                                  | Y         | template을 식별하기 위한 unique identifier         |
| contextLayer            | [ContextLayer](../display#contextlayer) | N         | -                                           |
| duration                | [Duration](../display#duration)         | N         | -                                           |
| title                   | [TitleObject](../display#titleobject)   | Y         | -                                           |
| content.image           | [ImageObject](../display#imageobject)   | Y         | 상품 이미지                                      |
| content.header          | [TextObject](../display#textobject)     | Y         | 제목 (상품명-최대 2줄)                              |
| content.body            | [TextObject](../display#textobject)     | N         | 본문 내용 (상품 옵션/상세 설명-최대 2줄)                   |
| content.price           | [TextObject](../display#textobject)     | Y         | 가격 정보1                                      |
| content.priceDesc       | [TextObject](../display#textobject)     | N         | 가격 정보2                                      |
| content.icon            | [ImageObject](../display#imageobject)   | N         | 결제 정보 아이콘 (ex. sk pay 이미지)                  |
| content.subText         | [TextObject](../display#textobject)     | N         | 보조 설명                                       |
| content.totalPrice      | [TextObject](../display#textobject)     | Y         | 가격정보3 (최종 결제 금액)                            |
| content.totalPriceDesc  | [TextObject](../display#textobject)     | N         | 가격정보4 (최종 결제 금액 설명)                         |
| content.confirm         | [ButtonObject](../display#buttonobject) | Y         | 확인(결제) 버튼                                   |
| content.cancel          | [ButtonObject](../display#buttonobject) | N         | 취소 버튼                                       |
| content.prev            | [ButtonObject](../display#buttonobject) | N         | 이전 페이지 이동(포커스 이동은 안되며 리모콘 '&lt;' 키로만 호출 가능) |
| content.next            | [ButtonObject](../display#buttonobject) | N         | 다음 페이지 이동(포커스 이동은 안되며 리모콘 '&gt;' 키로만 호출 가능) |
| grammarGuide            | [GrammarGuide](../display#grammarguide) | N         | -                                           |
| supportFocusedItemToken | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부  |
| supportVisibleTokenList | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부  |

### **CommerceInfo**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "CommerceInfo",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "content": {
      "image": ImageObject,
      "header": TextObject,
      "body": TextObject,
      "price": TextObject,
      "priceDesc": TextObject,
      "subText1": TextObject,
      "subText2": TextObject,
      "subText3": TextObject,
      "button": ButtonObject,
      "prev": ButtonObject,
      "next": ButtonObject
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                    | mandatory | description                                 |
|:------------------------|:----------------------------------------|:----------|:--------------------------------------------|
| token                   | string                                  | Y         | template을 식별하기 위한 unique identifier         |
| contextLayer            | [ContextLayer](../display#contextlayer) | N         | -                                           |
| duration                | [Duration](../display#duration)         | N         | -                                           |
| title                   | [TitleObject](../display#titleobject)   | Y         | -                                           |
| content.image           | [ImageObject](../display#imageobject)   | Y         | 상품 이미지                                      |
| content.header          | [TextObject](../display#textobject)     | Y         | 제목 (상품명-최대 1줄)                              |
| content.body            | [TextObject](../display#textobject)     | N         | 본문 내용 (상품 옵션/상세 설명-최대 1줄)                   |
| content.price           | [TextObject](../display#textobject)     | Y         | 가격 정보1                                      |
| content.priceDesc       | [TextObject](../display#textobject)     | N         | 가격 정보2                                      |
| content.subText1        | [TextObject](../display#textobject)     | N         | 우측 보조설명1 (최대 2줄)                            |
| content.subText2        | [TextObject](../display#textobject)     | N         | 우측 보조설명2 (최대 2줄)                            |
| content.subText3        | [TextObject](../display#textobject)     | N         | 우측 보조설명3 (최대 2줄)                            |
| content.button          | [ButtonObject](../display#buttonobject) | N         | -                                           |
| content.prev            | [ButtonObject](../display#buttonobject) | N         | 이전 페이지 이동(포커스 이동은 안되며 리모콘 '&lt;' 키 이벤트만 적용) |
| content.next            | [ButtonObject](../display#buttonobject) | N         | 다음 페이지 이동(포커스 이동은 안되며 리모콘 '&gt;' 키 이벤트만 적용) |
| grammarGuide            | [GrammarGuide](../display#grammarguide) | N         | -                                           |
| supportFocusedItemToken | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부  |
| supportVisibleTokenList | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부  |

### **Call1**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Call1",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "listItems": [
      {
        "token": "{{String}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "image": ImageObject,
        "title": TextObject,
        "subtitle": TextObject,
        "newBadge": {{Boolean}},
        "icon": ImageObject,
        "inactive": {{Boolean}}
      }
    ],
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                         | type                                    | mandatory | description                                                                                                                                                                                  |
|:----------------------------------|:----------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                  | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                          |
| contextLayer                      | [ContextLayer](../display#contextlayer) | N         | -                                                                                                                                                                                            |
| duration                          | [Duration](../display#duration)         | N         | -                                                                                                                                                                                            |
| title                             | [TitleObject](../display#titleobject)   | Y         | -                                                                                                                                                                                            |
| listItems.token                   | string                                  | Y         | -                                                                                                                                                                                            |
| listItems.eventType               | string                                  | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                  | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                            |
| listItems.textInput.text          | string                                  | Y         | 전달할 텍스트                                                                                                                                                                                      |
| listItems.textInput.playServiceId | string                                  | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                    |
| listItems.image                   | [ImageObject](../display#imageobject)   | Y         | 프로필 이미지                                                                                                                                                                                      |
| listItems.title                   | [TextObject](../display#textobject)     | N         | -                                                                                                                                                                                            |
| listItems.subtitle                | [TextObject](../display#textobject)     | N         | -                                                                                                                                                                                            |
| listItems.newBadge                | bool                                    | N         | 좌측 상단 붉은 점 표시 여부                                                                                                                                                                             |
| listItems.icon                    | [ImageObject](../display#imageobject)   | N         | 이미지 후측하단의 아이콘 이미지                                                                                                                                                                            |
| listItems.inactive                | bool                                    | N         | dimmed 및 focus 이동시 무시 여부                                                                                                                                                                     |
| grammarGuide                      | [GrammarGuide](../display#grammarguide) | N         | -                                                                                                                                                                                            |
| badgeNumber                       | bool                                    | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음) default : false                                                                                               |
| badgeNumberMode                   | string                                  | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                         |
| supportFocusedItemToken           | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                   |
| supportVisibleTokenList           | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                   |

### **Call2**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Call2",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "content": {
      "image": ImageObject,
      "icon": ImageObject,
      "header": TextObject,
      "body": TextObject,
      "footer": TextObject,
      "description": TextObject,
      "headerIcon": ImageObject,
      "footerIcon": ImageObject,
      "rightArea": {
        "button": {
          "icon": ImageObject,
          "text": TextObject,
          "token": "{{String}}"
        },
        "headerIcon": ImageObject,
        "header": TextObject,
        "body": TextObject
      },
      "prevButton": {
        "token": "{{String}}"
      },
      "nextButton": {
        "token": "{{String}}"
      }
    },
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter                       | type                                    | mandatory | description                                    |
|:--------------------------------|:----------------------------------------|:----------|:-----------------------------------------------|
| token                           | string                                  | Y         | template을 식별하기 위한 unique identifier            |
| contextLayer                    | [ContextLayer](../display#contextlayer) | N         | -                                              |
| duration                        | [Duration](../display#duration)         | N         | -                                              |
| title                           | [TitleObject](../display#titleobject)   | Y         | -                                              |
| content.image                   | [ImageObject](../display#imageobject)   | Y         | 프로필 이미지                                        |
| content.icon                    | [ImageObject](../display#imageobject)   | N         | 뱃지 이미지                                         |
| content.header                  | [TextObject](../display#textobject)     | N         | 이름 영역                                          |
| content.body                    | [TextObject](../display#textobject)     | N         | 전화변호 영역                                        |
| content.footer                  | [TextObject](../display#textobject)     | N         | 주소 영역                                          |
| content.description             | [TextObject](../display#textobject)     | N         | 부연설명 영역                                        |
| content.headerIcon              | [ImageObject](../display#imageobject)   | N         | header 우측 아이콘                                  |
| content.footerIcon              | [ImageObject](../display#imageobject)   | N         | footer 좌측 아이콘                                  |
| content.rightArea               | -                                       | N         | 우측 부가정보 영역                                     |
| content.rightArea.button        | -                                       | N         | 우측 부가정보 영역 내의 버튼                               |
| content.rightArea.button. icon  | [ImageObject](../display#imageobject)   | N         | 버튼 아이콘 이미지                                     |
| content.rightArea.button. text  | [TextObject](../display#textobject)     | N         | 버튼 텍스트                                         |
| content.rightArea.button. token | string                                  | Y         | button 객체를 정의한 경우에는 필수                         |
| content.rightArea.headerIcon    | [ImageObject](../display#imageobject)   | N         | header 좌측 아이콘 이미지                              |
| content.rightArea.header        | [TextObject](../display#textobject)     | N         | header text                                    |
| content.rightArea.body          | [TextObject](../display#textobject)     | N         | body text                                      |
| content.nextButton.token        | string                                  | Y         | nextButton 객체는 선택이지만, nextButton 객체가 정의된다면 필수. |
| content.prevButton.token        | string                                  | Y         | prevButton 객체는 선택이지만, prevButton객체가 정의된다면 필수.  |
| grammarGuide                    | [GrammarGuide](../display#grammarguide) | N         | -                                              |
| supportFocusedItemToken         | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부     |
| supportVisibleTokenList         | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부     |

### Call3

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Call3",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.2"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "profileImageUrl": "{{STRING}}",
    "mdn": "{{STRING}}",
    "name": "{{STRING}}",
    "nameImageUrl": "{{STRING}}",
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                    | mandatory | description                                                      |
|:------------------------|:----------------------------------------|:----------|:-----------------------------------------------------------------|
| token                   | string                                  | Y         | template을 식별하기 위한 unique identifier                              |
| contextLayer            | [ContextLayer](../display#contextlayer) | N         | -                                                                |
| profileImageUrl         | string                                  | Y         | 다른 사람과 통화일때 상대방의 profile image url(Device일 경우는 Device image URL) |
| nameImageUrl            | string                                  | N         | 상대방의 display name 우측에 표시되는 이미지URL (T114 일경우 이미지 아이콘 URL)         |
| name                    | string                                  | Y         | 상대방의 display name                                                |
| mdn                     | string                                  | N         | 상대방의 display mdn                                                 |
| supportFocusedItemToken | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                       |
| supportVisibleTokenList | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                       |

### **Timer**

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Timer",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.3"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "alertType": "{{STRING}}",
    "scheduledTime": "{{STRING}}",
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}}
  }
}
```
{% endcode %}

| parameter               | type                                    | mandatory | description                                             |
|:------------------------|:----------------------------------------|:----------|:--------------------------------------------------------|
| token                   | string                                  | Y         | timer 관련 token                                          |
| contextLayer            | [ContextLayer](../display#contextlayer) | N         | -                                                       |
| duration                | [Duration](../display#duration)         | N         | -                                                       |
| alertType               | string                                  | Y         | alert의 종류 (TIMER, SLEEP)                                |
| scheduledTime           | string                                  | Y         | alert이 동작하는 시간 정보(ISO 8601 포맷, ex. 2019-11-25T20:20:30) |
| supportFocusedItemToken | boolean                                 | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부              |
| supportVisibleTokenList | boolean                                 | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부              |

### **Dummy**

* Display Interface에서 제공하는 화면은 완성된 데이터를 클라이언트로 전송하여 Webview 또는 클라이언트에서 직접 화면을 그리기 위해 사용됨
* 이와 달리 Dummy는 리스트의 일부 데이터만 전달하고, 클라이언트에서 부족한 데이터를 직접 추가해서 그리기 위해 정의함
  * 클라이언트에서 정보 보안 이슈로 서버로 올릴 수 없는 데이터는 DummyTemplate을 받아 필요한 데이터를 채운 뒤에 Display할 수 있음
* Dummy는 데이터만을 전달하기 때문에 적절한 타입으로 변환하여 Webview를 호출해도 되고, 클라이언트에서 임의의 형식으로 그려도 관계없음

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "Dummy",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.5"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "token": "{{STRING}}",
    "subType": "{{STRING}}",
    "contextLayer": "{{STRING}}",
    "duration": "{{STRING}}",
    "title": TitleObject,
    "background": BackgroundObject,
    "badgeNumber": {{Boolean}},
    "badgeNumberMode": "{{STRING}}",
    "focusable": {{Boolean}},
    "anchorItemToken": "{{STRING}}",
    "listItems": [
      {
        "token": "{{STRING}}",
        "eventType": "{{STRING}}",
        "textInput": {
          "text": "{{STRING}}",
          "playServiceId": "{{STRING}}"
        },
        "image": ImageObject,
        "header": TextObject,
        "body": TextObject,
        "footer": TextObject,
        "data": {},
        "postback": {}
      }
    ],
    "buttonList": [],
    "grammarGuide": [],
    "supportFocusedItemToken": {{Boolean}},
    "supportVisibleTokenList": {{Boolean}},
    "data": {}
  }
}
```
{% endcode %}

| parameter                         | type                                                | mandatory | description                                                                                                                                                                                  |
|:----------------------------------|:----------------------------------------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                             | string                                              | Y         | template을 식별하기 위한 unique identifier                                                                                                                                                          |
| subType                           | string                                              | N         | 클라이언트에서 자체적으로 정의한 subType을 통해 Dummy를 어떻게 디스플레이해야 할지 식별 Dummy는 다양한 형태로 디스플레이될 수 있기 때문에 정의했으며, 임의의 값을 사용할 수 있음                                                                                 |
| contextLayer                      | [ContextLayer](../display#contextlayer)             | N         | -                                                                                                                                                                                            |
| duration                          | [Duration](../display#duration)                     | N         | -                                                                                                                                                                                            |
| title                             | [TitleObject](../display#titleobject)               | N         | -                                                                                                                                                                                            |
| background                        | [BackgroundObject](../display#backgroundobject)     | N         | -                                                                                                                                                                                            |
| badgeNumber                       | bool                                                | N         | 사용자가 숫자(순서)를 발화하여 item을 선택하도록 badge를 표시할지 여부<br/>(true - 표시함, false - 표시하지 않음)<br/>default : false                                                                                           |
| badgeNumberMode                   | string                                              | N         | badge 숫자를 설정하는 방법<br/>**IMMUTABILITY** : item의 위치가 변경되어도 badge 숫자는 유지됨<br/>**PAGE** : item의 위치가 변경되었을 때 첫 번째 보여지는 item의 badge 숫자가 1부터 시작됨<br/>default - IMMUTABILITY                         |
| focusable                         | bool                                                | N         | List Template의 item들이 focus 가능한지 여부 default : true                                                                                                                                           |
| anchorItemToken                   | string                                              | N         | display 될 때 첫 번째로 보여지는 아이템의 토큰                                                                                                                                                               |
| listItems                         | list                                                | N         | Scrollable (스크롤이 불가능한 디바이스에서는 짤림)                                                                                                                                                            |
| listItems.token                   | string                                              | N         | 클릭은 한 item 전체에서 가능                                                                                                                                                                           |
| listItems.eventType               | string                                              | N         | 클릭 시 플랫폼으로 전달하는 Event Type (Capability 명과 Event를 모두 명시해야 함)<br/>- **Display.ElementSelected** : default (eventType 값이 없는 경우 기본값)<br/>- **Text.TextInput** : default (eventType 값이 없는 경우 기본값) |
| listItems.textInput               | object                                              | N         | eventType == TextTextInput인 경우 필수                                                                                                                                                            |
| listItems.textInput.text          | string                                              | Y         | 전달할 텍스트                                                                                                                                                                                      |
| listItems.textInput.playServiceId | string                                              | N         | 특정 Play로 지정하여 라우팅하는 경우 사용                                                                                                                                                                    |
| listItems.image                   | [ImageObject](../display#imageobject)               | N         | -                                                                                                                                                                                            |
| listItems.header                  | [TextObject](../display#textobject)                 | N         | 본문 제목 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                             |
| listItems.body                    | [TextObject](../display#textobject)                 | N         | 본문 내용 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                             |
| listItems.footer                  | [TextObject](../display#textobject)                 | N         | 보조설명 최대 1줄까지 표현 (넘는 문자는 ... 처리)                                                                                                                                                              |
| listItems.type                    | string                                              | N         | list item의 type을 의미하며, 정의하지 않으면 위의 예시와 같은 일반형을 의미함. "SEPARATOR"로 정의할 경우에는 아래와 같은 header만이 유효한 구분용 타이틀 항목이 표시됨.                                                                               |
| listItem.toggle                   | [ToggleButtonObject](../display#togglebuttonobject) | N         | 리스트아이템의 우측에 표시되는 토글 버튼 [ToggleButtonObject](../display#togglebuttonobject) 참조                                                                                                                |
| listItem.data                     | Object                                              | N         | 각 item 별로 추가로 필요한 데이터를 JSON 포맷으로 추가 가능                                                                                                                                                       |
| listItem.postback                 | Object                                              | N         | 클릭 시 전달되는 임의의 Object  - 버튼 클릭 시 동작을 위해 필요한 정보를 임의의 JSON 포맷으로 추가 가능  - 기존에 token을 이 용도로 활용하는 경우가 많았는데, token은 identifier 역할을 하도록 하기 위해 추가                                                     |
| buttonList                        | list of [ButtonObject](../display#buttonobject)     | N         | Template 하단의 선택 버튼(ex&gt; "취소", "확인")                                                                                                                                                        |
| grammarGuide                      | [GrammarGuide](../display#grammarguide)             | N         | -                                                                                                                                                                                            |
| supportFocusedItemToken           | boolean                                             | N         | Context에 있는 focusedItemToken이 지원되어야 하는지 여부                                                                                                                                                   |
| supportVisibleTokenList           | boolean                                             | N         | Context에 있는 visibleTokenList가 지원되어야 하는지 여부                                                                                                                                                   |
| data                              | Object                                              | N         | 서비스에서 필요한 데이터를 JSON 포맷으로 추가 가능                                                                                                                                                               |

### RedirectTriggerChild

Display.TriggerChild Event를 생성

{% code %}
```json
{
  "header": {
    "namespace": "Display",
    "name": "RedirectTriggerChild",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.9"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "targetPlayServiceId": "{{STRING}}",
    "parentToken": "{{STRING}}",
    "data": {}
  }
}
```
{% endcode %}

| parameter           | type   | mandatory | description                             |
|---------------------|--------|-----------|-----------------------------------------|
| targetPlayServiceId | string | Y         | TriggerChild Event를 라우팅할 playServiceId  |
| parentToken         | string | Y         | Child를 trigger시킨 Parent template의 token |
| data                | object | Y         | TriggerChild Event의 data에 들어가는 정보       |
