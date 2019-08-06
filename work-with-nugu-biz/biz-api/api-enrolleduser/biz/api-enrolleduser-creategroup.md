---
depth_order: 1
---

# Biz 사용자 그룹 생성

Biz 사용자를 관리하기 위한 그룹을 생성하는 기능입니다.

## 1. URL

{% code %}
```text
[POST] https://biz-api.sktnugu.com/api/v1/enrolledUser/group
```
{% endcode %}

## 2. Request

### 2.1 Body

**body**

{% code %}
```json
{
  "name": "XXX",
  "alias": "XXX",
  "playServiceIds": [
    "aaa.bbb.ccc",
    "ddd.eee.fff"
  ]
}
```
{% endcode %}

### 2.2 설명

| 이름              | 유형     | 속성              | 길이     | 필수    | 설명                                |
|:----------------|:-------|:----------------|:-------|:------|:----------------------------------|
| Publisher-Token | Header | string          |        | Y     | 퍼블리셔가 보유한 토큰                      |
| name            | body   | string          | 100    | Y     | 생성할 그룹 이름                         |
| alias           | body   | string          | 100    |       | 생성할 그룹의 Alias                     |
| playServiceIds  | body   | array of string | 각각 100 |       | 퍼블리셔가 소유한 그룹에 할당할 private play 목록 |

## 3. Response

### 3.1 Http Status

| HTTP Status | errorCode | 설명                                  |
|:------------|:----------|:------------------------------------|
| 201         |           | 정상 생성                               |
| 403         |           | 퍼블리셔 API Token이 유효하지 않을 경우의 응답      |
| 401         |           | 생성하고자 하는 그룹이름이 기존재할 경우의 응답          |
| 400         | PLAY001   | 요청한 play의 playServiceId가 없거나 잘못된 경우 |
| 400         | PLAY002   | 요청한 play가 서비스중이 아닌 경우               |
| 400         | PLAY003   | 퍼블리셔의 소유가 아닌 play를 요청한 경우           |
| 400         | GROUP002  | 그룹명이 없거나, 사이즈를 초과할 경우               |
| 400         | GROUP003  | alias의 사이즈를 초과한 경우                  |

### 3.2 Body

{% code %}
```json
{
  "id": "XXX",
  "name": "XXX",
  "token": "XXX",
  "alias": "XXX",
  "playServiceIds": [
    "aaa.bbb.ccc",
    "ddd.eee.fff"
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름             | 속성              | 설명                                  |
|:---------------|:----------------|:------------------------------------|
| id             | string          | 생성한 그룹 id                           |
| name           | string          | 생성한 그룹 이름                           |
| token          | string          | 생성한 그룹 API 토큰                       |
| alias          | string          | 생성한 그룹의 Alias                       |
| playServiceIds | array of string | 그룹에 할당된 private play의 playServiceId |

