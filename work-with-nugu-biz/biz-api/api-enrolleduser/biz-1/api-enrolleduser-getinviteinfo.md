---
depth_order: 6
---

# Biz 사용자 초대 목록 조회

현재 진행중인 초대 건의 목록을 제공합니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/invitation
```
{% endcode %}

## 2. Request

| 이름              | 유형     | 속성     | 필수    | 설명           |
|:----------------|:-------|:-------|:------|:-------------|
| Publisher-Token | Header | string | Y     | 퍼블리셔가 보유한 토큰 |

## 3. Response

### 3.1 HTTP Status

| HTTP Status | 설명                             |
|:------------|:-------------------------------|
| 200         | 조회/수정시 정상적인 응답                 |
| 403         | 퍼블리셔 API Token이 유효하지 않을 경우의 응답 |

### 3.2 Body

{% code %}

```json
{
  "invitations": [
    {
      "id": 333,
      "cause": "서비스 사용을 위한 초대",
      "createdDate": "2017-11-06T06:00:00.000Z",
      "targetPlayServiceIds": [
        "aaa.bbb.ccc",
        "ddd.eee.fff"
      ],
      "targetGroupId": "XXX",
      "users": [
        {
          "email": "XXX",
          "name": "XXX",
          "alias": "XXX",
          "status": "ENABLE"
        }
      ]
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                                   | 속성              | 설명                                                        |
|:-------------------------------------|:----------------|:----------------------------------------------------------|
| invitations                          | array of object | 현재 진행중인 초대 목록                                             |
| invitations\[\].id                   | int             | 초대에 대한 식별자                                                |
| invitations\[\].cause                | string          | 초대 사유                                                     |
| invitations\[\].createdDate          | string          | ISO8601                                                   |
| invitations\[\].targetPlayServiceIds | array of string | 초대 대상 play의 playServiceId targetGroupId 와 중복해서 요청할 수 없다.  |
| invitations\[\].targetGroupId        | string          | 초대 대상 그룹 targetPlayServiceIds 와 중복해서 요청할 수 없다.            |
| invitations\[\].users                | array of object | 초대한 사용자의 정보                                               |
| invitations\[\].users\[\].email      | string          | 초대한 사용자의 이메일 퍼블리셔내 동일한 이메일을 초대받은 사용자가 있을 수 없다.            |
| invitations\[\].users\[\].name       | string          | 초대한 사용자의 이름                                               |
| invitations\[\].users\[\].token      | string          | 초대한 사용자의 API 토큰 신규 초대시 존재하지 않는다.                          |
| invitations\[\].users\[\].alias      | string          | 초대한 사용자의 Alias                                            |
| invitations\[\].users\[\].status     | enum            | 사용자에 대한 초대장 유효 여부<br/>ENABLE, DISABLE                     |

