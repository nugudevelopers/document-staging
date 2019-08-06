---
depth_order: 2
---

# Biz 사용자 그룹 수정

Biz 사용자 그룹의 정보를 수정하는 기능입니다.

## 1. URL

{% code %}
```text
[PUT] https://biz-api.sktnugu.com/api/v1/enrolledUser/group/{groupId}
```
{% endcode %}

## 2. Request

### 2.1 body

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
| groupId         | path   | string          |        | Y     | 수정하고자 하는 그룹 ID                    |
| name            | body   | string          | 100    | Y     | 생성할 그룹 이름                         |
| alias           | body   | string          | 100    |       | 생성할 그룹의 Alias                     |
| playServiceIds  | body   | array of string | 각각 100 |       | 퍼블리셔가 소유한 그룹에 할당할 private play 목록 |

## 3. Response

### 3.1 HTTP Status

| HTTP Status | errorCode | 설명                                              |
|:------------|:----------|:------------------------------------------------|
| 200         |           | 정상 수정                                           |
| 403         |           | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴 |
| 404         |           | 수정요청한 그룹이 존재하지 않을 때 응답값                         |
| 401         |           | 변경하고자 하는 그룹이름이 기존재할 경우의 응답                      |
| 400         | PLAY001   | 요청한 play의 playServiceId가 없거나 잘못된 경우             |
| 400         | PLAY002   | 요청한 play가 서비스중이 아닌 경우                           |
| 400         | PLAY003   | 퍼블리셔의 소유가 아닌 play를 요청한 경우                       |
| 400         | GROUP002  | 그룹생성/수정시 그룹명이 없거나, 사이즈를 초과할 경우                  |
| 400         | GROUP003  | 그룹생성/수정시 alias의 사이즈를 초과한 경우                     |

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
| id             | string          | 수정한 그룹 ID                           |
| name           | string          | 수정한 그룹 이름                           |
| token          | string          | 수정한 그룹 API 토큰                       |
| alias          | string          | 수정한 그룹의 Alias                       |
| playServiceIds | array of string | 그룹에 할당된 private play의 playServiceId |

