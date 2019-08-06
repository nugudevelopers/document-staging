---
depth_order: 4
---

# Biz 사용자 목록 조회

초대되어 퍼블리셔에 등록된 Biz 사용자 목록을 조회하는 기능입니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/enrolledUser/user?page=1&pageSize=20
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
  "users": [
    {
      "id": "XXX",
      "name": "XXX",
      "email": "XXX",
      "alias": "XXX",
      "phone": "XXX",
      "group": {
        "id": "XXX",
        "name": "XXX"
      },
      "serviceType": "SERVICE",
      "apiAgreeType": "AGREE",
      "authType": "ALL",
      "acceptedDateTime": "2021-0804T16:34:30.388"
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                          | 속성               | 설명                                                            |
|:----------------------------|:-----------------|:--------------------------------------------------------------|
| 이름                          | 속성               | 설명                                                            |
| totalPages                  | int              | 총 페이지 갯수                                                      |
| totalElements               | long             | 총 Biz 사용자 수                                                   |
| users                       | array of object  | Biz 사용자 목록                                                    |
| users\[\].id                | string           | Biz 사용자 ID                                                    |
| users\[\].name              | string           | Biz 사용자 이름                                                    |
| users\[\].email             | string           | Biz 사용자 이메일                                                   |
| users\[\].alias             | string           | Biz 사용자 추가 정보                                                 |
| users\[\].phone             | string           | Biz 사용자 전화번호                                                  |
| users\[\].group             | string           | Biz 사용자 소속 그룹 정보 미분류일 경우 null                                 |
| users\[\].group.id          | string           | Biz 사용자 소속 그룹 ID                                              |
| users\[\].group.name        | string           | Biz 사용자 소속 그룹 이름                                              |
| users\[\].serviceType       | enum             | 사용자 초대 유형<br/>SERVICE : 서비스<br/>PLAY : play                   |
| users\[\].apiAgreeType      | enum             | Biz API 수신 동의 유형<br/>ALL : 동의<br/>SOME : 일부 동의<br/>NONE : 미동의 |
| users\[\].authType          | enum             | 제휴사 인증 여부 유형<br/>ALL : 인증<br/>SOME : 일부 인증<br/>NONE : 미인증     |
| users\[\].acceptedDateTime  | string           | 초대 승인일(ISO-8601)                                              |

