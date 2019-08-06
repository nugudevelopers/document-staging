---
depth_order: 3
description: Linux 환경에서 NUGU 서비스를 쉽게 사용할 수 있도록 NUGU SDK for Linux를 제공합니다.
---

# Linux

## 특징

* deb 패키지(Debian Package)로 배포하여 쉽게 설치가 가능합니다.
* SDK 자체에서 plug-in 구조를 지원하여, 디바이스 특성에 따라 쉽게 Porting이 가능합니다. (GStreamer, PortAudio, Opus decoder 등의 기본 plug-in 함께 제공)
* GMainloop 기반으로 구현되어 event-driven 방식의 Application 개발에 용이합니다.

## 지원하는 Linux 배포판

NUGU SDK for Linux는 Ubuntu Linux를 지원합니다.

* Version
  * Xenial(16.04)
  * Bionic(18.04)
  * Focal(20.04)
* CPU Architecture
  * 64bit x86(amd64)
  * arm(armhf, arm64)

{% alerts style="info" %}
사용중인 Linux가 Debian 계열의 Linux(deb 패키지 설치가 가능)일 경우, NUGU SDK for Linux 설치가 가능합니다.  
하지만, Ubuntu 이외의 타 배포판에 대한 지원은 하지 않습니다.
{% endalerts %}

