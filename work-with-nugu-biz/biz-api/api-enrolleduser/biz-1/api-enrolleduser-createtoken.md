---
depth_order: 7
---

# Biz 사용자 API Token 생성

Biz 사용자를 대상으로 Announcement 등 API를 발송할 때, 제휴사 계정을 인증하여 해당 계정 기준으로 토큰을 발급하고 발송 할 수 있도록 합니다.

유의사항

* Developers는 Biz 사용자를 식별하는 키로 email을 사용한다.
  * **email이 다르지만 Biz Api Token이 같은 경우를 허용하지 않는다.**
* Developers는 초대받은 Biz 사용자가 모든 초대과정을 정상적으로 마친 경우에만 정상적인 Biz 사용자로서 식별하며, 사용자에 의한 페이지 이탈등의 행위로 초대과정이 중단된 경우 상태를 유지하지 않는다.
  * **제휴사는 userApiToken을 전달했으나(제휴사 서비스에 저장했으나), 사용자가 초대행위를 마치지 않고 중단했다면, 생성한 userApiToken은 사용할 수 없다.**

## 1. 절차 <a id="biz-apitoken-v1-1."></a>

1. Biz 사용자는 초대 링크로 진입할 경우 NUGU ID 로그인을 수행한다.
2. Developers는 기등록된 제휴사의 인증 URL로 status, callBackUrl. email을 전달한다.
   1. status, email 은 Developers에서 생성된 값으로서 수정되어서는 안된다.
3. 제휴사는 인증과정을 통해 사용자 API Token을 생성하고, 전달받은 callBackUrl에 userApiToken과 status를 전달한다.

## 2. 인증 요청 [Developers 요청] <a id="biz-apitoken-v1-2.-developers"></a>

* Developers에서 기등록된 제휴사의 인증 URL로 인증을 요청한다.
* 인증 URL을 통해 로그인 등의 행위들로 사용자를 식별하여, Biz 사용자 API Token을 생성한후, 요청시 전달한 callBackUrl로 결과를 리턴한다.

### 2.1 Request <a id="biz-apitoken-v1-2.1request"></a>

| 이름          | 유형          | 속성     | 필수  | 설명                                                     |
|-------------|-------------|--------|-----|--------------------------------------------------------|
| status      | query param | string | Y   | Developers에서 사용자를 식별하는 키값으로서 전달된 값을 바꾸어서는 안된다.         |
| callBackUrl | query param | string | Y   | 인증을 마친후 생성한 Biz 사용자 API Token과 status를 전달할 URL         |
| email       | query param | string | Y   | Developers에서 초대한 사용자 이메일을 식별하는 키값으로서 전달된 값을 변경해서는 안된다. |

### 2.2 Response <a id="biz-apitoken-v1-2.2response"></a>

## 3. 인증 결과 수신 \[제휴사 요청] <a id="biz-apitoken-v1-3."></a>

* Developers에서 사용자 API Token을 저장하는 API로서 POST 방식로 전송한다.
* Developers는 전달받은 파라미터가 유효하지 않을 경우, confirmUrl로 결과코드를 전송한다.

### 3.1 Request <a id="biz-apitoken-v1-2.1request.1"></a>

| 이름           | 유형          | 속성     | 필수  | 설명                                                           |
|--------------|-------------|--------|-----|--------------------------------------------------------------|
| status       | query param | string | Y   | Developers에서 사용자를 식별하는 키값으로서 인증 요청에 전달된 값을 바꾸어서는 안된다.        |
| userApiToken | query param | string | Y   | 인증을 마친후 생성한 Biz 사용자 API Token                                |
| confirmUrl   | query param | string |     | 사용자가 정상적인 초대행위를 마친 경우 제휴사에 성공결과를 전달하기 위한 URL 없을 경우 전송하지 않는다. |

### 3.2 Response <a id="biz-apitoken-v1-2.2response.1"></a>

## 4. 인증 결과 전송 [Developers 요청] <a id="biz-apitoken-v1-4.-developers"></a>

* 제휴사에서 인증 결과를 전송받고자 confirmUrl을 입력했다면, 입력한 URL로 처리결과를 POST로 전송한다.

### 4.1 Request <a id="biz-apitoken-v1-4.1request"></a>

#### 4.1.1 Body <a id="biz-apitoken-v1-4.1.1body"></a>

**body**

{% code %}
```json
{
  "userApiToken": "XXX",
  "resultCode": "OK"
}
```
{% endcode %}

| 이름             | 유형     | 속성       | 필수   | 설명                                                                |
|----------------|--------|----------|------|-------------------------------------------------------------------|
| userApiToken   | body   | string   | Y    | 진행중인 Biz 사용자 API Token                                            |
| resultCode     | body   | enum     | Y    | OK : 사용자 생성 완료 CONFLICT : 생성한 Biz Api Token이 다른 Biz 사용자에 중복된 경우   |
