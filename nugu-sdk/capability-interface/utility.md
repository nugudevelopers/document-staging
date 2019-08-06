---
depth_order: 21
description: Directive 의 실행 순서를 제어하기 위한 규격
---

# Utility

## Version

최신 버전은 1.0 입니다.

| Version | Date       | Description |
|:--------|:-----------|:------------|
| 1.0     | 2020.11.30 | 규격 추가       |

## SDK Interface

Utility 는 하나의 응답으로 전달되는 Directive들의 실행 순서 및 Blocking 처리 로직을 포함하고 있는 규격으로 Application 에서 처리할 별도의 interface 가 없습니다.

## Context

{% code %}
```json
{
  "Utility": {
    "version": "1.0"
  }
}
```
{% endcode %}

## Directives

### Block

Block Directive를 기준으로 이전 Directive들이 모두 실행된 후 이후 Directive들이 실행됨

{% code %}
```json
{
  "header": {
    "namespace": "Utility",
    "name": "Block",
    "messageId": "{{STRING}}",
    "dialogRequestId": "{{STRING}}",
    "version": "1.0"
  },
  "payload": {
    "playServiceId": "{{STRING}}",
    "sleepInMillisecond": {{LONG}}
  }
}
```
{% endcode %}

| parameter          | type  | mandatory | description                                                |
|:-------------------|:------|:----------|:-----------------------------------------------------------|
| sleepInMillisecond | long  | N         | 다음 Directive를 실행하기 전에 대기하는 시간 지정되지 않으면 바로 시작 (default - 0) |

