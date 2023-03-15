---
depth_order: 2
---

# 구동 시 빈화면 출력되는 경우

## 오류 증상

Device Set Up Tool 설치 후 구동하였으나, 아래와 같이 빈 화면이 출력되는 경우입니다.

![](../../assets/images/empty-screen-error.png)

## 오류 환경   

* OS : Windows 10
* CPU & GPU : Intel 11th Gen Xe Graphics

## 오류 원인

Intel 11th. 그래픽 드라이버에  버그 존재 (닷넷프로그램에서 화면 그리기 오류)

## 오류 해결 방안

최신 드라이버(Windows* DCH 드라이버) 설치가 필요합니다. (2021.12월 이후 드라이버)

아래의 링크에서 드라이버를 다운받아 설치 완료 및 재부팅 후, Tool 사용시 해결됩니다.

[링크](https://www.intel.co.kr/content/www/kr/ko/download/19344/intel-graphics-windows-dch-drivers.html)