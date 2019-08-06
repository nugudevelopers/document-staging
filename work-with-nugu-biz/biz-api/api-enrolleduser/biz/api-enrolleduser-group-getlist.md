---
depth_order: 4
---

# Biz 사용자 그룹 목록 조회

퍼블리셔가 보유한 Biz 사용자 그룹의 목록 조회하는 기능입니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/enrolledUser/group?page=1&pageSize=20
```
{% endcode %}

## 2. Request

| 이름              | 유형          | 필수    | 설명           |
|:----------------|:------------|:------|:-------------|
| Publisher-Token | Header      | Y     | 퍼블리셔가 보유한 토큰 |
| page            | query param |       | default : 1  |
| pageSize        | query param |       | default : 20 |

## 3. Response

### 3.1 Http Status

| HTTP Status | 설명                             |
|:------------|:-------------------------------|
| 200         | 정상 응답                          |
| 403         | 퍼블리셔 API Token이 유효하지 않을 경우의 응답 |

### 3.2 Body

{% code %}
```json
{
  "totalPages": 10,
  "totalElements": 100,
  "unmappedUserCount": 3,
  "groups": [
    {
      "id": "XXX",
      "name": "XXX",
      "token": "XXX",
      "alias": "XXX",
      "playCount": 3,
      "userCount": 3,
      "createdDateTime": "2021-0804T16:34:30.388"
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                         | 속성              | 설명                      |
|:---------------------------|:----------------|:------------------------|
| 이름                         | 속성              | 설명                      |
| totalPages                 | int             | 총 페이지 갯수                |
| totalElements              | long            | 총 그룹 갯수                 |
| unmappedUserCount          | long            | 그룹에 속하지 않은 사용자 수        |
| groups                     | array of object | 그룹 목록                   |
| groups\[\].id              | string          | 그룹 ID                   |
| groups\[\].name            | string          | 그룹 이름                   |
| groups\[\].token           | array of string | 그룹 API 토큰               |
| groups\[\].alias           | array of object | 그룹 추가 정보                |
| groups\[\].playCount       | int             | 그룹에 할당된 private play 갯수 |
| groups\[\].userCount       | long            | 그룹에 속한 사용자 수            |
| groups\[\].createdDateTime | string          | 생성일(ISO-8601)           |

