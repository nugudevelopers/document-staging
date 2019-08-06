---
depth_order: 10
---

# Backend proxy 개발 가이드

이 페이지는 Backend proxy 개발/구축을 가이드합니다.

Backend proxy는 다음의 경우에 NUGU 플랫폼에서 REST API를 통해 호출하는 서버입니다.

* Play Builder에서 응답을 생성하기 위해 필요한 정보를 외부 서버로부터 가져오는 경우
* 특정 값에 대한 서버의 판단이 필요한 경우
* Directive를 사용하여 디바이스의 기능을 동작시켜야 하는 경우  
* 예외 상황에 대한 판단이 필요할 때  

