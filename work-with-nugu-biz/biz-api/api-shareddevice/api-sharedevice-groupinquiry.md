---
depth_order: 1
---

# 전용 디바이스 그룹 조회

퍼블리셔가 기 등록, 보유한 전용 디바이스 그룹을 조회하는 기능입니다.

## 1. URL

{% code %}
```text
[GET] https://biz-api.sktnugu.com/api/v1/sharedDevice/group
```
{% endcode %}

## 2. Request

| 이름              | 유형     | 필수    | 설명             |
|:----------------|:-------|:------|:---------------|
| Publisher-Token | Header | Y     | 퍼블리셔 API Token |

## 3. Response

### 3.1 Http Status

| HTTP Status | 설명                             |
|:------------|:-------------------------------|
| 200         | 정상 응답                          |
| 403         | 퍼블리셔 API Token이 유효하지 않을 경우의 응답 |

###  3.2 Body

{% code %}
```json
{
  "groups": [
    {
      "name": "XXX",
      "token": "XXX",
      "devices": [
        {
          "uniqueName": "XXX",
          "token": "XXX",
          "alias": "XXX"
        }
      ]
    }
  ]
}
```
{% endcode %}

### 3.3 설명

| 이름                                | 속성              | 필수여부  | 설명                 |
|:----------------------------------|:----------------|:------|:-------------------|
| groups                            | array           | Y     | 전용디바이스 그룹 목록       |
| groups\[\].name                   | string          | Y     | 그룹 이름              |
| groups\[\].token                  | string          | Y     | 그룹 API 토큰          |
| groups\[\].devices                | array of object | Y     | 그룹에 속한 전용디바이스 목록   |
| groups\[\].devices\[\].uniqueName | string          | Y     | 전용디바이스 unique name |
| groups\[\].devices\[\].token      | string          | Y     | 전용디바이스 기기 API 토큰   |
| groups\[\].devices\[\].name       | string          | Y     | 전용디바이스 이름          |
| groups\[\].devices\[\].alias      | string          | Y     | 전용디바이스 Alias       |

