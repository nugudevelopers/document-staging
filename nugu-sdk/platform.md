---
depth_order: 6
description: >-
  NUGU SDK는 iOS, Android, Linux 플랫폼을 지원합니다. 각각의 플랫폼에 맞는 언어와 특성을 따르고 있으며, 동일한 구조를
  가지고 있는 영역(Common)과 플랫폼 별로 다른 구조를 가진 영역(Depends on platform)이 구분되어 있습니다.
---

# Platform

## NUGU SDK Architecture

NUGU SDK를 더 자세히 알아보기 위해서는 각각의 플랫폼 별 페이지를 통해 확인하실 수 있습니다.

![](../assets/images/nugu-sdk-platform-01.png)

## System Requirements

| Requirement   | Android                                                                   | iOS                                                                       | Linux                                                                  |
|:--------------|:--------------------------------------------------------------------------|:--------------------------------------------------------------------------|:-----------------------------------------------------------------------|
| OS Version    | \\\>= Android 5.0(API level 21)                                           | \\\>= iOS 10.0+                                                           | \\\>= Ubuntu Linux 16.04                                               |
| Platform      | Android                                                                   | iOS                                                                       | Ubuntu Linux Raspberry Pi Generic Linux                                |
| Language      | Kotlin                                                                    | Swift                                                                     | C, C++                                                                 |
| Architecture  | arm7, arm64                                                               | arm7, arm64                                                               | x86_64, arm64, armhf                                                   |
| Repository    | Github                                                                    | Github                                                                    | Github                                                                 |
| Release       | Maven                                                                     | Cocoapods Carthage                                                        | APT repository                                                         |
| Storage       | Touch로만 wake up: 13MB<br/>Wake up word 1개: 14MB<br/>Wake up word 2개: 15MB | Touch로만 wake up: 14MB<br/>Wake up word 1개: 15MB<br/>Wake up word 2개: 16MB | Touch로만 wake up: 6MB<br/>Wake up word 1개: 7MB<br/>Wake up word 2개: 8MB |

{% link url="/nugu-sdk/platform/ios" %}

{% link url="/nugu-sdk/platform/android" %}

{% link url="/nugu-sdk/platform/linux" %}

