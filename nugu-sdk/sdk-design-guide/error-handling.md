---
depth_order: 6
---

# Error handling

누구 서비스와 연결 실패하여 디바이스에 저장된 연결 오류 안내를 출력내야 하는 경우는 다음과 같습니다.

| Error 상황                                 | Error message                               | 음원 파일명              |
|:-----------------------------------------|:--------------------------------------------|:--------------------|
| Device G/W 접속 에러 (네트워크 사용 불가)            | 인터넷에 연결할 수 없습니다. 디바이스의 인터넷 연결 상태를 확인해주세요.   | device_GW_error_001 |
| Device G/W 접속 에러 (게이트웨이/인증 서버 장애로 접속 불가) | 누구 서비스와 연결할 수 없습니다. 잠시 후 다시 말씀해주세요.         | device_GW_error_002 |
| Device G/W 인증 에러 (Access 토큰 인증 에러)       | 누구 서비스와 연결할 수 없습니다. 디바이스 연결 정보를 변경 해주세요.    | device_GW_error_003 |
| Device G/W에 요청 후 응답 없음 (타임아웃)            | 누구 서비스와의 연결이 원활하지 않습니다. 잠시 후 다시 말씀해주세요.     | device_GW_error_004 |
| Device G/W에 요청 처리 안됨                     | 현재 누구 서비스와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요. | device_GW_error_005 |
| Device G/W에서 TTS 연동 실패                   | 누구 서비스 중에 문제가 발생했어요. 잠시 후 다시 말씀해주세요.        | device_GW_error_006 |
| Device G/W에서 PR 연동 실패                    | 누구 서비스 중에 문제가 발생했어요. 잠시 후 다시 말씀해주세요.        | device_GW_error_006 |

{% file src="assets/files/assets_error-message.zip" caption="Error Message" %}

