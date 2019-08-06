---
depth_order: 5
---

# Biz 사용자 상세 조회

초대되어 퍼블리셔에 등록된 Biz 사용자 상세정보를 조회하는 기능입니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/enrolledUser/user/{userId}
```
{% endcode %}

## 2. Request

| 이름              | 유형     | 필수    | 설명           |
|:----------------|:-------|:------|:-------------|
| Publisher-Token | Header | Y     | 퍼블리셔가 보유한 토큰 |
| userId          | path   | Y     | Biz 사용자 ID   |

## 3. Response

### 3.1 Http Status

| HTTP Status | 설명                             |
|:------------|:-------------------------------|
| 200         | 정상 응답                          |
| 403         | 퍼블리셔 API Token이 유효하지 않을 경우의 응답 |
| 404         | 대상 Biz 사용자를 찾을 수 없을 때 응답       |

### 3.2 Body

{% code %}
```json
{
  "id": "XXX",
  "name": "XXX",
  "token": "XXX",
  "email": "XXX",
  "alias": "XXX",
  "phone": "XXX",
  "group": {
    "id": "XXX",
    "name": "XXX"
  },
  "serviceType": "SERVICE",
  "serviceAgreeYn": "Y",
  "serviceApiAgreeYn": "Y",
  "serviceApiAllowedDeviceCount": 3,
  "serviceAcceptedDateTime": "2021-0804T16:34:30.388",
  "plays": [
    {
      "playServiceId": "a.b.c",
      "token": "XXX",
      "agreeYn": "Y"
      "apiAgreeYn": "Y",
      "apiAllowedDeviceCount": 3,
      "acceptedDateTime": "2021-0804T16:34:30.388"
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                              | 속성              | 설명                                                                           |
|:--------------------------------|:----------------|:-----------------------------------------------------------------------------|
| id                              | string          | Biz 사용자 ID                                                                   |
| name                            | string          | Biz 사용자 이름                                                                   |
| token                           | string          | Biz 사용자 토큰 사용자 초대 유형이 PLAY일 경우 null                                          |
| email                           | string          | Biz 사용자 이메일                                                                  |
| alias                           | string          | Biz 사용자 부가 정보                                                                |
| phone                           | string          | Biz 사용자 핸드폰 번호(-제외)                                                          |
| group                           | object          | 속한 그룹 정보                                                                     |
| group.id                        | string          | 그룹 ID                                                                        |
| group.name                      | string          | 그룹명                                                                          |
| serviceType                     | enum            | 사용자 초대 유형<br/>SERVICE : 서비스<br/>PLAY : play                                  |
| serviceAgreeYn                  | Y/N             | 서비스 이용동의 여부 사용자 초대 유형이 PLAY일 경우 N                                            |
| serviceApiAgreeYn               | Y/N             | 서비스 API 수신동의 여부 사용자 초대 유형이 PLAY일 경우 N                                        |
| serviceApiAllowedDeviceCount    | int             | 서비스 API 수신 허용 기기 수 사용자 초대 유형이 PLAY일 경우 0                                     |
| serviceAcceptedDateTime         | string          | 초대 승인일(ISO-8601)                                                             |
| plays                           | array of object | 승인된 private play 목록                                                          |
| plays\[\].playServiceId         | string          | play service id                                                              |
| plays\[\].token                 | string          | play별 토큰 사용자 초대 유형이 SERVICE일 경우 token                                        |
| plays\[\].agreeYn               | Y/N             | play별 이용동의 여부 사용자 초대 유형이 SERVICE일 경우 Y                                       |
| plays\[\].apiAgreeYn            | Y/N             | play별 API 수신 동의 여부 사용자 초대 유형이 SERVICE일 경우 Y                                  |
| plays\[\].apiAllowedDeviceCount | int             | play별 API 수신 허용 기기 수 사용자 초대 유형이 SERVICE일 경우 serviceApiAllowedDeviceCount     |
| plays\[\].acceptedDateTime      | string          | play별 초대 승인일(ISO-8601) 사용자 초대 유형이 SERVICE일 경우 serviceAcceptedDateTime        |

