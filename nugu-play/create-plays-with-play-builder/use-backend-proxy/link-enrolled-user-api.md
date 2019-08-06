---
depth_order: 4
---

# Biz 사용자(Enrolled user) 정보 수신 연동

Private Play에 한하여, [Biz 사용자 관리](../../../work-with-nugu-biz/manage-enrolled-user)를 통해 초대, 등록된 Biz 사용자 (Enrolled User) 정보를 Backend proxy에서 확인 할 수 있습니다. 연동규격에서 제공하는 사용자 정보는 다음과 같습니다.

{% code %}
```bash
POST /action.name
Host: backend.proxy.host.domain
Accept: application/json
Content-Length: 85
Content-Type: application/json
```
{% endcode %}

{% code %}
```json
{
  "version": "2.0",
  "action": {
    ...
  },
  "context": {
    ...
  }
  "profile": {
    "privatePlay": {
      "deviceUniqueId": "NU200_XXXXXX",
      "userKey": "user.0.A3JFAD5YQ59L4WYJ146BMJG5Q49I1QAFU22HZSJV9MEDP46KNFDF05YNPAY1P22G",
      "deviceKey": "device.0.6L273EAELW0EK2ZY4C2Z47Z2SD9VM8CTS6CFVR1DQD355W6ZUD92L01ZIQXPRRSD",
      "enrolledUser": {
        "name": "홍길동",
        "phoneNo": "01011112222",
        "email": "gilodng@email-domain.com",
        "tag": "율도국",
        "userToken": "L4WYJEK2ZP42SD9VM8CTS6CFVR1DQDYQ59L4WYJ146BMJG5Q49I1QAFU2",
        "serviceType": "SERVICE"
      }
    }
  }
}
```
{% endcode %}

| Parameter                                     | Type    | Mandatory  | 설명                                                                                                                                                              |
|-----------------------------------------------|---------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| profile.privatePlay                           | json    | N          | Private Play인 경우에만 추가                                                                                                                                           |
| profile.privatePlay.deviceUniqueId            | string  | N          | 스피커 하단에 표기된 등록번호                                                                                                                                                |
| profile.privatePlay.userKey                   | string  | Y          | 익명 처리한 user id                                                                                                                                                  |
| profile.privatePlay.deviceKey                 | string  | Y          | 익명 처리한 device id                                                                                                                                                |
| profile.privatePlay.enrolledUser              | json    | N          | 초대 사용자(enrolled user)인 경우의 정보<br/>Biz 전용 디바이스로 연결된 Private Play 경우 deviceUniqueId, userKey, deviceKey만 수신할 수 있습니다.                                              |
| profile.privatePlay.enrolledUser.name         | string  | Y          | 초대 사용자 이름                                                                                                                                                       |
| profile.privatePlay.enrolledUser.phoneNo      | string  | Y          | 초대 사용자 전화번호                                                                                                                                                     |
| profile.privatePlay.enrolledUser.email        | string  | Y          | 초대 사용자 이메일                                                                                                                                                      |
| profile.privatePlay.enrolledUser.tag          | string  | N          | 초대 사용자 추가 정보 (대리점 코드, 사번, 인트라넷 사용자 아이디 등 필요한 정보를 넣어서 이용)                                                                                                        |
| profile.privatePlay.enrolledUser.userToken    | string  | N          | 초대 사용자에게 [Biz 사용자 API Token 생성](../../../work-with-nugu-biz/biz-api/api-enrolleduser/biz-1/api-enrolleduser-createtoken) 과정에 생성한 Token 정보, Biz Kit 정식판 퍼블리셔 전용  |
| profile.privatePlay.enrolledUser.serviceType  | string  | N          | 초대 받아 등록된 사용자의 초대 유형, Biz Kit 정식판 퍼블리셔 전용 (PLAY, SERVICE)                                                                                                       |

{% alerts style="danger" %}
연동 규격에 사용자 개인 정보를 포함하고 있으므로 Private Play의 Backend proxy server는 HTTPS를 사용해야 합니다. Private Play에서 HTTP를 이용해 Backend proxy server를 개발할 경우 심사 반려됩니다.
{% endalerts %}
