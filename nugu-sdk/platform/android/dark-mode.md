---
depth_order: 7
description: 어두운 테마
---

# Dark Mode 지원

NUGU의 UI component는 어두운 테마를 지원합니다.

아래 가이드를 따라 테마를 변경하면 [Template](../../../nugu-sdk/platform/android/nugu-display), [ChromeWindow](https://developers-doc.nugu.co.kr/nugu-sdk/platform/android/nugu-user-interface#chromewindow)에 어두운 테마를 적용 수 있습니다.

## 테마 설정

ThemeManager 객체의 theme 변수에 원하는 테마를 설정합니다.   

ThemeManager는 NuguAndroidClient에서 얻을 수 있습니다.

{% code %}
```kotlin
(NuguAndroidClient Object).themeManager.theme = ThemeManagerInterface.THEME.DARK
```
{% endcode %}

* **THEME.LIGHT (default)**    - 밝은 테마로 표시 
* **THEME.DARK**                     - 어두운 테마로 표시
* **THEME.SYSTEM**                - 시스템 설정 (설정 > 디스플레이 > 야간모드) on/off 에 따라 표시



