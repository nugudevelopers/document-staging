---
depth_order: 2
---

# Biz 사용자별 Announcement 전송

등록된 Biz 사용자가 Biz API 수신 및 제휴사 계정 인증을 한 경우, 계정 인증을 통해 생성된 토큰을 바탕으로 개인에게 특화된 Announcement 메세지를 사용자의 디바이스에 발송 할 수 있습니다.

## 1. URL <a id="biz-announcement-v1-1url"></a>

{% code %}
```text
[POST] https://biz-api.sktnugu.com/api/v1/enrolledUser/user/{userApiToken}/announcement
```
{% endcode %}

## 2. Request <a id="biz-announcement-v1-2request"></a>

### 2.1 Body <a id="biz-announcement-v1-2.1body"></a>

**body**

{% code %}
```json
{
  "playServiceId": "XXX",
  "tts": {
    "text": "발송 내용",
    "speed": "100",
    "pause1": "600",
    "pause2": "300"
  },
  "display": {
    "type": "imageText2",
    "title": "타이틀",
    "header": "헤더",
    "body": "본문",
    "footer": "부가설명",
    "image": "http://imageUrl",
    "grammarGuide": [
      "발화문1",
      "발화문2"
    ]
  }
}
```
{% endcode %}

### 2.2 설명 <a id="biz-announcement-v1-2.2"></a>

| 이름                    | 유형      | 속성               | 필수   | 설명                                                                                                                          |
|-----------------------|---------|------------------|------|-----------------------------------------------------------------------------------------------------------------------------|
| Publisher-Token       | Header  | string           | Y    | 퍼블리셔가 보유한 토큰                                                                                                                |
| userApiToken          | path    | string           | Y    | 발송할 사용자의 API 토큰                                                                                                             |
| playServiceId         | body    | string           | Y    | 발송 대상 play<br/>대상 play의 합성음, TTS Domain을 기준으로 SKML을 생성                                                                      |
| tts                   | body    | object           |      | TTS를 구성하는 객체                                                                                                                |
| tts.text              | body    | string           | Y    | 발화문장<br/>발화문장, Display 객체 중 반드시 1개 이상은 존재해야 한다.                                                                             |
| tts.speed             | body    | string           |      | 발화속도<br/>85, 90... 120까지의 5단위 값<br/>기본값은 100                                                                                |
| tts.pause1            | body    | string           |      | 문장 사이 묵음 구간 길이<br/>300, 400... 900까지의 100단위 값<br/>기본값은 600                                                                  |
| tts.pause2            | body    | string           |      | 100, 200... 500까지의 100단위 값<br/>기본값은 300                                                                                     |
| display               | body    | object           | Y    | Display 객체<br/>발화문장, Display 객체 중 반드시 1개 이상은 존재해야 한다.                                                                       |
| display.type          | body    | string           | Y    | 사용할 Display Template<br/>FullText1, ImageText2중 하나                                                                          |
| display.title         | body    | string           | Y    | 화면 타이틀                                                                                                                      |
| display.header        | body    | string           | Y    | 본문 제목                                                                                                                       |
| display.body          | body    | string           | Y    | 본문 내용                                                                                                                       |
| display.footer        | body    | string           |      | 본문 부가 설명                                                                                                                    |
| display.image         | body    | string           |      | 이미지<br/>ImageText Type에서 이미지가 없을 경우, 디폴트 이미지 노출<br/><img src="/assets/images/img_notification.png" alt="">                  |
| display.grammarGuide  | body    | array of string  |      | 가이드 발화문                                                                                                                     |

## 3. Response <a id="biz-announcement-v1-3response"></a>

### 3.1 HTTP Status <a id="biz-announcement-v1-3.1httpstatus"></a>

| HTTP Status  | errorCode  | 설명                                               |
|--------------|------------|--------------------------------------------------|
| 200          |            | 정상 요청                                            |
| 403          |            | 퍼블리셔 API Token이 유효하지 않거나, 유효하지 않은 자원에 접근할 경우 리턴  |
| 404          |            | 발송 요청한 사용자가 존재하지 않을 때 응답값                        |
| 400          | V1ANN001   | body 값을 파싱할 수 없음                                 |
| 400          | V1ANN002   | playServiceId 없음                                 |
| 400          | V1ANN101   | tts 객체가 모두 존재하지 않음                               |
| 400          | V1ANN102   | tts.text 없음                                      |
| 400          | V1ANN103   | tts.speed 값이 잘못됨                                 |
| 400          | V1ANN104   | tts.pause1 값이 잘못됨                                |
| 400          | V1ANN105   | tts.pause2 값이 잘못됨                                |
| 400          | V1ANN201   | display.type 값이 잘못됨                              |
| 400          | V1ANN202   | display.title 값이 없음                              |
| 400          | V1ANN203   | display.header 값이 없음                             |
| 400          | V1ANN204   | display.body 값이 없음                               |
| 400          | V1ANN301   | 허용되지 않는 playServiceId                            |

### 3.2 Body <a id="biz-announcement-v1-3.2body"></a>

{% code %}
```json
{
  "id": "XXX",
  "name": "XXX",
  "email": "XXX",
  "resultCode": "OK",
  "deviceResults": [
    {
      "code": "XXX"
    }
  ]
}
```
{% endcode %}

### 3.3 설명 <a id="biz-announcement-v1-3.3"></a>

| 이름                     | 속성              | 설명                                                                                                                                                                                                 |
|------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                     | string          | 발송 대상 Biz 사용자 ID                                                                                                                                                                                   |
| name                   | string          | 발송 대상 Biz 사용자 이름                                                                                                                                                                                   |
| email                  | string          | 발송 대상 Biz 사용자 이메일                                                                                                                                                                                  |
| resultCode             | enum            | 발송 결과OK : 발송 대상 기기 모두 성공SOME_OK : 발송 대상 기기 일부 성공FAIL : 발송 대상 기기 모두 실패NOT_AGREE : API 수신 거부NO_DEVICE : API 수신 허용 기기 없음                                                                              |
| deviceResults          | array of object | 기기별 응답값                                                                                                                                                                                            |
| deviceResults\[\].code | enum            | 기기별 발송 결과<br/>OK : 발송 성공<br/>NOT_CONNECTED : 사용자에 연결되지 않은 기기<br/>TIMEOUT : 기기와의 연결 실패<br/>CONNECT_ERROR : 기기가 꺼져 있거나, 네트워크에 문제가 있음<br/>NOT_SUPPORTED : 지원하지 않는 기기<br/>ERROR : 알 수 없는 에러(개발팀 문의 필요) |
