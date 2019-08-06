---
depth_order: 1
---

# Biz 사용자 초대

Biz 사용자를 등록하기 위해, 초대 메일을 발송하는 기능입니다.

* Biz Service 초대장 발송 시에는, Biz Kit 기본 정보 필수값이 미리 입력되어 있어야 합니다. [Biz Kit 기본 정보 입력](../../../manage-enrolled-user/enrolled-user-invitation-biz) 를 참고해주세요.

## 1. URL

{% code %}
```text
[POST] https://biz-api.sktnugu.com/api/v1/enrolledUser/invitation
```
{% endcode %}

## 2. Request

### 2.1 Body

**body**

{% code %}
```json
{
  "reason": "서비스 사용을 위한 초대",
  "targetPlayServiceIds": [
    "aaa.bbb.ccc",
    "ddd.eee.fff"
  ],
  "targetGroupId": "XXX",
  "users": [
    {
      "email": "XXX",
      "name": "XXX",
      "phone": "XXX",
      "alias": "XXX"
    }
  ]
}
```
{% endcode %}

### 2.2 설명

| 이름                   | 유형     | 속성              | 길이      | 필수     | 설명                                                                      |
|:---------------------|:-------|:----------------|:--------|:-------|:------------------------------------------------------------------------|
| Publisher-Token      | Header | string          |         | Y      | 퍼블리셔가 보유한 토큰                                                            |
| reason               | body   | string          | 400     |        | 초대 사유                                                                   |
| targetPlayServiceIds | body   | array of string | 각각 100  |        | 초대 대상 play의 playServiceId targetGroupId 와 중복해서 요청할 수 없다.                |
| targetGroupId        | body   | string          | 100     |        | 초대 대상 그룹 ID targetPlayServiceIds 와 중복해서 요청할 수 없다.                       |
| users                | body   | array of object |         |        | 초대한 사용자의 정보                                                             |
| users\[\].email      | body   | string          | 350     | Y      | 초대한 사용자의 이메일 만일 초대된 리스트에 동일한 이메일이 존재할 경우 재초대가 이뤄지며, name, alias가 갱신된다.  |
| users\[\].name       | body   | string          | 100     | Y      | 초대한 사용자의 이름                                                             |
| users\[\].phone      | body   | string          | 12      | Y      | 초대한 사용자의 전화번호                                                           |
| users\[\].alias      | body   | string          | 100     |        | 초대한 사용자의 Alias                                                          |

## 3. Response

### 3.1 HTTP Status

| HTTP Status | errorCode  | 설명                                               |
|:------------|:-----------|:-------------------------------------------------|
| 201         |            | 정상 초대                                            |
| 403         |            | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴  |
| 400         | PUB001     | Biz Kit 기본 필수정보 없는 상태                            |
| 400         | PLAY001    | 요청한 play의 playServiceId가 없거나 잘못된 경우              |
| 400         | PLAY002    | 요청한 play가 서비스중이 아닌 경우                            |
| 400         | PLAY003    | 퍼블리셔의 소유가 아닌 play를 요청한 경우                        |
| 400         | GROUP001   | 그룹이 존재하지 않거나, 퍼블리셔의 소유가 아닌 경우                    |
| 400         | GROUP004   | targetPlayServiceIds, targetGroupId 중복 요청하는 경우   |
| 400         | GROUP005   | 그룹에 Private Play 설정 없이 초대하는 경우                   |
| 400         | USER001    | Biz사용자 초대/수정시 email이 없거나 사이즈를 초과한 경우             |
| 400         | USER002    | Biz사용자 초대/수정시 name이 없거나 사이즈를 초과한 경우              |
| 400         | USER003    | Biz사용자 초대/수정시 alias의사이즈를 초과한 경우                  |
| 400         | USER005    | Biz사용자 초대/수정시 phone 정보가 불 충분할 경우                 |
| 400         | USER006    | Biz사용자 초대/수정시 초대 사유(reason) 정보가 불 충분할 경우         |
| 400         | USER007    | 체험판 회원의 경우 허용 사용자를 초과하는 경우                       |

### 3.2 Body

{% code %}
```json
{
  "id": 333
}
```
{% endcode %}

### 3.3 설명

| 이름    | 속성    | 설명             |
|:------|:------|:---------------|
| id    | int   | 생성한 초대에 대한 식별자 |

