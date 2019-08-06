---
depth_order: 4
---

# Authentication

NUGU 플랫폼 인증은 [OAuth 2.0](https://tools.ietf.org/html/rfc6749)의 규격을 지원하고, NUGU의 회원 체계는 SK텔레콤의 [T아이디](https://www.skt-id.co.kr)를 따릅니다.

플랫폼 인증을 위해서는 NUGU에서 별도로 발급하는 `Client Id, Client Secret`과 제휴사에서 등록한 `Redirect Uri` 정보가 필요합니다. 인증 정보는 체험판 신청으로 발급 받을 수 있으며, 정식판 제휴 시에는 PoC 관리 메뉴에서 발급 받은 정보를 확인 할 수 있습니다.

## Authorize Endpoint

`response_type=code` 만 사용 됩니다.

`data` 파라미터를 사용하여 디바이스 일련번호를 전달 할 수 있습니다.

> {"deviceSerialNumber":"DEVICE_SERIAL_NUMBER"}

{% api base_url="https://api.host.domain" path="/v1/auth/oauth/authorize" method="get" summary="인증 요청 (Authorize Endpoint)" %}
{% api::description %}
NUGU계정 미사용, 체험판 사용 시에는 불필요합니다.
{% endapi::description %}

{% api::parameter name="client_id" type="string" category="query" required="true" %}
발급받은 ClientId를 사용 합니다.
{% endapi::parameter %}

{% api::parameter name="response_type" type="string" category="query" required="true" %}
code 만 사용 됩니다.
{% endapi::parameter %}

{% api::parameter name="redirect_uri" type="string" category="query" required="true" %}
설정한 RedirectUri를 사용합니다.
{% endapi::parameter %}

{% api::parameter name="scope" type="string" category="query" %}
(TODO)
{% endapi::parameter %}

{% api::parameter name="data" type="string" category="query" %}
추가적인 데이터를 포함됩니다.
{% endapi::parameter %}

{% api::parameter name="state" type="string" category="query" %}
CSRF를 위해 사용 되는 값입니다.
{% endapi::parameter %}

{% api::response status="302" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 302 
Date: Mon, 14 Oct 2019 02:24:58 GMT
Location: {redirect_uri}?code={code}&state={state}
```
{% endcode %}
{% endapi::response %}
{% endapi %}

## Token Endpoint

`grant_type=refresh_token`, `grant_type=authorization_code` , `grant_type=client_credentials` 가사용 됩니다.

NUGU계정 미사용, 체험판은 `grant_type=client_credentials` 을 사용합니다.

Client 인증 정보는 Body Parameter(application/x-www-form-urlencoded)를 사용 합니다.

{% api base_url="https://api.host.domain" path="/v1/auth/oauth/token" method="post" summary="토큰 요청 (Token Endpoint)" %}
{% api::description %}
NUGU계정 미사용, 체험판 사용 시에는 code와 redirect_url 입력이 불필요합니다.
{% endapi::description %}

{% api::parameter name="data" type="string" category="body" %}
추가적인 데이터가 포함 됩니다. ex) {"deviceSerialNumber":"DEVICE_SERIAL_NUMBER"}
{% endapi::parameter %}

{% api::parameter name="grant_type" type="string" category="body" required="true" %}
authorization_code (신규), client_credentials (NUGU 회원 미사용, 체험판)
{% endapi::parameter %}

{% api::parameter name="code" type="string" category="body" %}
응답 받은 code 값을 사용 합니다.
{% endapi::parameter %}

{% api::parameter name="redirect_uri" type="string" category="body" %}
인증 요청 시 사용된 redirect_uri를 사용합니다.
{% endapi::parameter %}

{% api::parameter name="client_id" type="string" category="body" required="true" %}
발급 받은 ClientId를 사용합니다.
{% endapi::parameter %}

{% api::parameter name="client_secret" type="string" category="body" required="true" %}
발급 받은 ClientSecret을 사용합니다.
{% endapi::parameter %}

{% api::response status="200" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 200 
Date: Mon, 14 Oct 2019 02:24:59 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM3MTg1MDM1NDYsInVzZXJfbmFtZSI6IkFMREZBS0sxQjhaUjU2MzE1QzVEIiwianRpIjoiYWU4ZWQ0MTEtZTljYy00NGRjLThlYjUtODc4NTdjM2QzNmFlIiwiY2xpZW50X2lkIjoic3BlYWtlci5udWd1Lm51MTEwIiwic2NvcGUiOltdLCJleHQiOnsidXNyIjoiQUxERkFLSzFCOFpSNTYzMTVDNUQiLCJwb2MiOiJzcGVha2VyLm51Z3UubnUxMTAiLCJkdmMiOiJBTERGRzU1WU1ZUkE5RTUyN0VCRCIsInRrbiI6IjNDNzMxMzEwOUIyQTQ1RTZCQjhBRUQ2MjBGRjNBMThGIn19.DrmLXJXBF9YL7-R7gtEg5dOLQ7UfYMlPKGp1WHNfx8M",
  "token_type" : "Bearer",
  "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM2MTE4OTksInVzZXJfbmFtZSI6IkFMREZBS0sxQjhaUjU2MzE1QzVEIiwianRpIjoiNjAzYTkyNjUtNTJmNS00ZDE2LWEzOWYtMTVkMGZhM2IxMTgyIiwiY2xpZW50X2lkIjoic3BlYWtlci5udWd1Lm51MTEwIiwic2NvcGUiOltdLCJhdGkiOiJhZThlZDQxMS1lOWNjLTQ0ZGMtOGViNS04Nzg1N2MzZDM2YWUiLCJleHQiOnsidXNyIjoiQUxERkFLSzFCOFpSNTYzMTVDNUQiLCJkdmMiOiJBTERGRzU1WU1ZUkE5RTUyN0VCRCIsInBvYyI6InNwZWFrZXIubnVndS5udTExMCIsInRrbiI6IjNDNzMxMzEwOUIyQTQ1RTZCQjhBRUQ2MjBGRjNBMThGIn19.F29whyNRE6LN3c9yfNTH3F9uN3W04aP2Jxav3rSSFoY",
  "expires_in" : 2147483646,
  "jti" : "ae8ed411-e9cc-44dc-8eb5-87857c3d36ae"
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="400" description="" %}
{% code title="Header"%}
```scheme
HTTP/1.1 400 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_grant",
  "error_description": "Invalid authorization code: 0rrbEjnOfqxIv6uNic6C"
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="401" description="" %}
{% code title="Header"%}
```scheme
HTTP/1.1 401 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
WWW-Authenticate: Form realm="NUGU", error="invalid_client", error_description="Bad client credentials"
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_client",
  "error_description": "Bad client credentials"
}
```
{% endcode %}
{% endapi::response %}
{% endapi %}

{% api base_url="https://api.host.domain" path="/v1/auth/oauth/token" method="post" summary="토큰 갱신 요청 (Token Endpoint)" %}
{% api::description %}
NUGU계정 미사용, 체험판 사용 시에는 불필요합니다.
{% endapi::description %}

{% api::parameter name="data" type="string" category="body" %}
추가적인 데이터가 포함 됩니다. ex) {"deviceSerialNumber":"DEVICE_SEERIAL_NUMBER"}
{% endapi::parameter %}

{% api::parameter name="grant_type" type="string" category="body" required="true" %}
refresh_token (갱신)
{% endapi::parameter %}

{% api::parameter name="refresh_token" type="string" category="body" required="true" %}
신규 발급 시 응답 받은 refresh_token을 사용합니다.
{% endapi::parameter %}

{% api::parameter name="client_id" type="string" category="body" required="true" %}

{% endapi::parameter %}

{% api::parameter name="client_secret" type="string" category="body" required="true" %}

{% endapi::parameter %}

{% api::response status="200" description="" %}
{% code title="Header"%}
```scheme
HTTP/1.1 200 
Date: Mon, 14 Oct 2019 03:01:27 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM3MTg1MDU3MzQsInVzZXJfbmFtZSI6IkFMREZBS0sxQjhaUjU2MzE1QzVEIiwianRpIjoiNzcyNWVmNGYtNzc4Yy00NDUyLTk3ZWItODE0NWVmNWIyOTNkIiwiY2xpZW50X2lkIjoic3BlYWtlci5udWd1Lm51MTEwIiwic2NvcGUiOltdLCJleHQiOnsidXNyIjoiQUxERkFLSzFCOFpSNTYzMTVDNUQiLCJkdmMiOiJBTERGRzU1WU1ZUkE5RTUyN0VCRCIsInBvYyI6InNwZWFrZXIubnVndS5udTExMCIsInRrbiI6IjNDNzMxMzEwOUIyQTQ1RTZCQjhBRUQ2MjBGRjNBMThGIn19.pKy2WqIWtKCybQT8jGZsYUyvGg3ZdtQ4zzTSj7IeRYQ",
  "token_type" : "Bearer",
  "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzM2MTE4OTksInVzZXJfbmFtZSI6IkFMREZBS0sxQjhaUjU2MzE1QzVEIiwianRpIjoiNjAzYTkyNjUtNTJmNS00ZDE2LWEzOWYtMTVkMGZhM2IxMTgyIiwiY2xpZW50X2lkIjoic3BlYWtlci5udWd1Lm51MTEwIiwic2NvcGUiOltdLCJhdGkiOiI3NzI1ZWY0Zi03NzhjLTQ0NTItOTdlYi04MTQ1ZWY1YjI5M2QiLCJleHQiOnsidXNyIjoiQUxERkFLSzFCOFpSNTYzMTVDNUQiLCJkdmMiOiJBTERGRzU1WU1ZUkE5RTUyN0VCRCIsInBvYyI6InNwZWFrZXIubnVndS5udTExMCIsInRrbiI6IjNDNzMxMzEwOUIyQTQ1RTZCQjhBRUQ2MjBGRjNBMThGIn19.AkXWHMuUlKYKs3wP92roaBWQaFmuW7e4kKmlhmrWDZc",
  "expires_in" : 2147483646,
  "jti" : "7725ef4f-778c-4452-97eb-8145ef5b293d"
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="400" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 400 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_grant",
  "error_description": ""
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="401" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 401 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
WWW-Authenticate: Form realm="NUGU", error="invalid_client", error_description="Bad client credentials"
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_client",
  "error_description": "Bad client credentials"
}
```
{% endcode %}
{% endapi::response %}
{% endapi %}

## Revoke Endpoint

{% api path="/v1/auth/oauth/revoke" method="post" summary="연결 해제 (Revoke Endpoint)" %}
{% api::description %}

{% endapi::description %}

{% api::parameter name="data" type="string" category="body" %}

{% endapi::parameter %}

{% api::parameter name="token" type="string" category="body" required="true" %}

{% endapi::parameter %}

{% api::parameter name="client_id" type="string" category="body" required="true" %}

{% endapi::parameter %}

{% api::parameter name="client_secret" type="string" category="body" required="true" %}

{% endapi::parameter %}

{% api::response status="200" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 200 
Date: Mon, 14 Oct 2019 03:01:27 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{}
```
{% endcode %}
{% endapi::response %}

{% api::response status="400" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 400 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_token",
  "error_description": ""
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="401" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 401 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_client",
  "error_description": ""
}
```
{% endcode %}
{% endapi::response %}
{% endapi %}

## Introspect Endpoint

{% api path="/v1/auth/oauth/introspect" method="post" summary="연결 조회 (Introspect Endpoint)" %}
{% api::description %}

{% endapi::description %}

{% api::parameter name="data" type="string" category="body" %}

{% endapi::parameter %}

{% api::parameter name="token" type="string" category="body" %}

{% endapi::parameter %}

{% api::parameter name="client:id" type="string" category="body" %}

{% endapi::parameter %}

{% api::parameter name="client:secret" type="string" category="body" %}

{% endapi::parameter %}

{% api::response status="200" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 200 
Date: Mon, 14 Oct 2019 03:01:27 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "active": true
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="400" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 400 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_token",
  "error_description": ""
}
```
{% endcode %}
{% endapi::response %}

{% api::response status="401" description="" %}
{% code title="Header" %}
```scheme
HTTP/1.1 401 
Date: Mon, 14 Oct 2019 04:22:45 GMT
Content-Type: application/json;charset=UTF-8
```
{% endcode %}

{% code title="Body" %}
```json
{
  "error": "invalid_client",
  "error_description": ""
}
```
{% endcode %}
{% endapi::response %}
{% endapi %}
