---
depth_order: 3
---

# Biz 사용자 그룹 삭제

그룹을 삭제 하는 기능입니다. 만일 삭제하는 그룹내 사용자가 존재할 경우, 기존 사용자는 그룹 미분류 상태로 변경됩니다.

## 1. URL

{% code %}
```text
[DELETE] https://biz-api.sktnugu.com/api/v1/enrolledUser/group/{groupId}
```
{% endcode %}

## 2. Request

| 이름              | 유형     | 필수    | 설명             |
|:----------------|:-------|:------|:---------------|
| Publisher-Token | Header | Y     | 퍼블리셔가 보유한 토큰   |
| groupId         | path   | Y     | 삭제하고자 하는 그룹 ID |

## 3. Response

### 3.1 HTTP Status

| HTTP Status | 설명                                              |
|:------------|:------------------------------------------------|
| 204         | 정상 삭제시 응답                                       |
| 403         | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴 |
| 404         | 삭제대상 그룹을 찾을 수 없을 때 응답                           |

