---
depth_order: 5
---

# Biz 사용자 그룹 상세 조회

Biz 사용자 그룹 정보를 상세 확인 할 수 있는 기능입니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/enrolledUser/group/{groupId}
```
{% endcode %}

## 2. Request

| 이름              | 유형     | 필수    | 설명                                    |
|:----------------|:-------|:------|:--------------------------------------|
| Publisher-Token | Header | Y     | 퍼블리셔가 보유한 토큰                          |
| groupId         | path   | Y     | 그룹 ID or unmappedUser(그룹에 속하지 않은 사용자) |

## 3. Response

### 3.1 Http Status

| HTTP Status | 설명                             |
|:------------|:-------------------------------|
| 200         | 정상 응답                          |
| 403         | 퍼블리셔 API Token이 유효하지 않을 경우의 응답 |
| 404         | 대상 그룹을 찾을 수 없을 때 응답            |

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
    "a1.b1.c1"
  ],
  "users": [
    {
      "id": "XXX",
      "name": "XXX",
      "email": "XXX",
      "phone": "XXX",
      "alias": "XXX",
      "serviceType": "SERVICE",
      "apiAgreeType": "ALL",
      "authType": "ALL",
      "acceptedDateTime": "2021-0804T16:34:30.388"
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                         | 속성              | 설명                                                      |
|:---------------------------|:----------------|:--------------------------------------------------------|
| id                         | string          | 그룹 ID unmappedUser일 경우 null                             |
| name                       | string          | 그룹 이름 unmappedUser일 경우 null                             |
| token                      | string          | 그룹 API 토큰 unmappedUser일 경우 null                         |
| alias                      | string          | 그룹 부가 정보 unmappedUser일 경우 null                          |
| playServiceIds             | array of string | 그룹에 속한 private play service id 목록 unmappedUser일 경우 \[\] |
| users                      | array of object | 그룹에 속한 사용자 목록                                           |
| users\[\].id               | string          | 사용자 ID                                                  |
| users\[\].name             | string          | 사용자 이름                                                  |
| users\[\].email            | string          | 사용자 이메일                                                 |
| users\[\].alias            | string          | 사용자 추가 정보                                               |
| users\[\].serviceType      | enum            | 사용자 초대 유형 SERVICE : 서비스 PLAY : play                     |
| users\[\].apiAgreeType     | enum            | Biz API 수신 동의 유형 ALL : 동의 SOME : 일부 동의 NONE : 미동의       |
| users\[\].authType         | enum            | 제휴사 인증 여부 유형 ALL : 인증 SOME : 일부 인증 NONE : 미인증           |
| users\[\].acceptedDateTime | string          | 초대 승인일(ISO-8601)                                        |

