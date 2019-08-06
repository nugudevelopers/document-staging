---
depth_order: 2
---

# Biz 사용자 수정

초대 완료되어 등록된 사용자의 정보를 수정하는 기능입니다.

## 1. URL

{% code %}
```text
[PUT] https://biz-api.sktnugu.com/api/v1/enrolledUser/user/{userId}
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
  "targetGroupId": "XXX"
}
```
{% endcode %}

### 2.2 설명

| 이름              | 유형     | 속성     | 길이     | 필수    | 설명                                                                                                                                                      |
|:----------------|:-------|:-------|:-------|:------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Publisher-Token | Header | string |        | Y     | 퍼블리셔가 보유한 토큰                                                                                                                                            |
| userId          | path   | string |        | Y     | 수정하고자 하는 사용자의 API 토큰                                                                                                                                    |
| name            | body   | string | 100    | Y     | 수정할 사용자의 이름                                                                                                                                             |
| alias           | body   | string | 각각 100 |       | 수정할 사용자의 Alias                                                                                                                                          |
| targetGroupId   | body   | string |        |       | 변경할 그룹 ID 미입력시 변경되지 않으며, 변경시 서비스 동의 사용자의 경우 별도의 과정없이 변경이 가능하나, Play 동의 사용자일 경우 해당 그룹으로 재초대되는 절차를 거친다.<br/>또한 Play 동의 사용자일 경우 동의를 완료하기 전까지 그룹이 변경되지 않는다. |

## 3. Response

### 3.1 HTTP Status

| HTTP Status | errorCode | 설명                                              |
|:------------|:----------|:------------------------------------------------|
| 200         |           | 정상 수정                                           |
| 403         |           | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴 |
| 404         |           | 수정요청한 그룹이 존재하지 않을 때 응답값                         |
| 401         |           | 변경하고자 하는 그룹이름이 기존재할 경우의 응답                      |
| 400         | USER002   | Biz사용자 초대/수정시 name이 없거나 사이즈를 초과한 경우             |
| 400         | USER003   | Biz사용자 초대/수정시 alias의사이즈를 초과한 경우                 |
| 400         | USER004   | Bizt사용자 초대/수정시 기존에 중복된 email이 존재할 경우            |
| 400         | USER008   | Biz Kit 기본 필수정보 없는 상태                           |
| 400         | GROUP001  | 그룹이 존재하지 않거나, 퍼블리셔의 소유가 아닌 경우                   |

### 3.2 Body

{% code %}
```json
{
  "id": "XXX",
  "email": "XXX",
  "name": "XXX",
  "alias": "XXX",
  "targetGroupId": "XXX"
}
```
{% endcode %}

### 3.3 설명

| 이름            | 속성              | 설명                 |
|:--------------|:----------------|:-------------------|
| id            | string          | 수정한 Biz 사용자의 ID    |
| email         | string          | 수정한 Biz 사용자의 이메일   |
| name          | string          | 수정한 Biz 사용자의 이름    |
| alias         | string          | 수정한 Biz 사용자의 Alias |
| targetGroupId | array of string | 변경할 그룹의 ID         |
