---
depth_order: 6
---

# Biz API

## 1.Biz API 기능 소개

정식판에서 제공하는 Biz 전용디바이스, Biz 사용자를 위한 API입니다. 다음과 같은 기능이 있습니다.

* [Biz 사용자 API](./biz-api/api-enrolleduser)
* [BIZ 전용 디바이스 API](./biz-api/api-shareddevice)
* [API 발송 (Announcement)](./biz-api/api-announcement)

## 2.Biz API 사용 권한

Biz API는 제휴를 통한 정식판 권한 사용자에게 제공되며, API의 사용을 위해 발급받은 "퍼블리셔 토큰 (Publisher-Token) "이 필요합니다. 퍼블리셔 토큰은 정식판 권한 퍼블리셔의 "Biz Kit 기본 정보"에서 확인 가능합니다.

## 3.표준응답코드

| HTTP Status | 설명                                              |
|:------------|:------------------------------------------------|
| 200         | 조회/수정 시 정상적인 응답                                 |
| 201         | 생성 시 정상적인 응답                                    |
| 204         | 삭제 시 정상적인 응답                                    |
| 400         | 잘못된 요청에 의한 응답값                                  |
| 403         | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴 |
| 415         | 지원하지 않는 컨텐츠(미디어) 오류                             |
| 500         | 기타 서버 오류                                        |

## 4.오류 : 400 응답시

성공응답, 400응답을 제외한 나머지의 Http Status 응답값은 body를 가지고 있지 않는다.

### 4.1 body

{% code %}
```json
{
  "errorCode": "XXX"
}
```
{% endcode %}

### 4.2 errorCode

| errorCode | 설                                              |
|:----------|:-----------------------------------------------|
| PUB001    | Biz Kit 기본 필수정보 없이 초대하는 경우                     |
| PLAY001   | 요청한 play의 playServiceId가 없거나 잘못된 경우            |
| PLAY002   | 요청한 play가 서비스중이 아닌 경우                          |
| PLAY003   | 퍼블리셔의 소유가 아닌 play를 요청한 경우                      |
| GROUP001  | 그룹이 존재하지 않거나, 퍼블리셔의 소유가 아닌 경우                  |
| GROUP002  | 그룹생성/수정시 그룹명이 없거나, 사이즈를 초과할 경우                 |
| GROUP003  | 그룹생성/수정시 alias의 사이즈를 초과한 경우                    |
| GROUP004  | targetPlayServiceIds, targetGroupId 중복 요청하는 경우 |
| GROUP005  | 그룹에 Private Play 설정 없이 초대하는 경우                 |
| USER001   | Biz사용자 초대/수정시 email이 없거나 사이즈를 초과한 경우           |
| USER002   | Biz사용자 초대/수정시 name이 없거나 사이즈를 초과한 경우            |
| USER003   | Biz사용자 초대/수정시 alias의사이즈를 초과한 경우                |
| USER004   | Bizt사용자 초대/수정시 기존에 중복된 email이 존재할 경우           |
| USER005   | Biz사용자 초대/수정시 phone 정보가 불 충분할 경우               |
| USER006   | Biz사용자 초대/수정시 초대 사유(reason) 정보가 불 충분할 경우       |
| USER007   | 체험판 회원의 경우 허용 사용자를 초과하는 경우                     |
| V1ANN001  | body 값을 파싱할 수 없음                               |
| V1ANN002  | playServiceId 없음                               |
| V1ANN101  | tts, display 객체가 모두 존재하지 않음                    |
| V1ANN102  | tts.text 없음                                    |
| V1ANN103  | tts.speed 값이 잘못됨                               |
| V1ANN104  | tts.pause1 값이 잘못됨                              |
| V1ANN105  | tts.pause2 값이 잘못됨                              |
| V1ANN201  | display.type 값이 잘못됨                            |
| V1ANN202  | display.title 값이 없음                            |
| V1ANN203  | display.header 값이 없음                           |
| V1ANN204  | display.body 값이 없음                             |

