---
depth_order: 6
---

# Release note

## Version 2.1.0

업데이트일 : 2021년 10월 21일

### 1. 2021년 Developers 고도화 내용 현행화

* NUGU biz kit 고도화에 의한 메뉴 위치, UI에 대한 내용 전체 현행화

### 2. 스마트홈 Play 등록, 테스트 가이드 추가

* Play 정보 등록 (smarthome play) 내용 추가 : [자세히 알아보기](./smarthome-play)

## Version 2.0.0

업데이트일 : 2021년 8월 12일

### 1. 향상/변경된 기능

* NUGU biz kit 고도화에 의한 용어, 기능변경 및 Biz API 지원 추가 : [자세히 알아보기](../work-with-nugu-biz)

## Version 1.9.0

업데이트일 : 2019년 12월 19일

### 1. 새로운 기능

* Fallback 시, 사용자 발화를 Backend proxy에서 분석할 수 있도록 \_UNRESOLVED\_ Entity 제공

### 2. 향상/변경된 기능

* Directive로 응답하는 Action의 응답 유형에 '대기'를 허용

## Version 1.8.0

업데이트일 : 2019년 11월 4일

### 1. 향상/변경된 기능

* Action 목록에서 Root Action 기준으로 접기 기능 추가
* Action name 글자 수 제한 확
* Root Action에서 정의한 예외 상황(exception code)가 Branch에서 노출되도록 변경
* Directive를 사용할 때도 '대기'를 output 유형으로 선택할 수 있도록 변

### 2. 버그 수정

* 파라미터에 조사 적용 시, 발화옵션 태그를 무시하도록 변경
* 훈련 데이터 검증 도구가 발견한 중의성 문장이 없는 경우, 안내 문구 수

## Version 1.7.0

업데이트일 : 2019년 9월 26일

### 1. 새로운 기능

* 실패 발화 분석 도구에 용언 분석 기능 추가 : [자세히 알아보기](./create-plays-with-play-builder/support-tools/log-mining#log-mining-verb)

### 2. 향상/변경된 기능

* Action명 수정
* Action 목록에서 Backend Proxy/Directive 사용 여부 표시

## Version 1.6.0

업데이트일 : 2019년 8월 20일

### 1. 새로운 기능

* Play 빌드 Export/Import 기능 추가

### 2. 향상/변경된 기능

* 저장 속도 향상

### 3. 버그 수정

* 좌측 LNB 화살표 방향 오류 수정
* Built-in Action breadcrumbs 링크 오류 수정

## Version 1.5.0

업데이트일 : 2019년 8월 8일

### 1. 새로운 기능

* Play 내에서 공통으로 사용할 수 있는 Global Utterance Parameter 추가

### 2. 향상/변경된 기능

* Welcome Action에서 Common Action을 output으로 선택할 수 있도록 변경
* Parameter에서 Array 형식 처리할 수 있도록 변경
* User Utterance Model Import시 Validation
* Entity 허용 문자에 . (dot) 추가
* Built-in Entity type 상세화면에서 동의어 노출
* NLU function 타입을 'DATE'에서 'DATETIME'으로 변경

### 3. 버그 수정

* 발화옵션 자동완성 '한글 숫자 읽기' 자동입력 오류 수정
* Action 생성 페이지에서, Intent 없을 경우 멈추는 현상 수정

## Version 1.4.0

업데이트일 : 2019년 7월 11일

### 1. 새로운 기능

* 실패 발화 분석 도구 추가 : [자세히 알아보기](./create-plays-with-play-builder/support-tools/log-mining)

### 2. 향상/변경된 기능

* Translator, Normalizer의 Source/Target 최대 글자수를 50에서 200으로 변경

### 3. 버그 수정

* Prompt 입력창에서 백스페이스 글자 삭제 버그 수정
* Translator 이름 중복 버그 수정 및 정렬 수정
* 학습 문장 분석 도구 내 Intent 미노출 현상 수정
* Play 구조에서 Common Action 하위 브랜치 노출

## Version 1.3.0

업데이트일 : 2019년 4월 23일

### 1. 새로운 기능

* User Utterance Model 학습 문장 분석 도구 추가 : [자세히 알아보기](./create-plays-with-play-builder/support-tools/corpus-inspection-1)
* 합성음 목소리 '벨' 추가 : [자세히 알아보기](./create-plays-with-play-builder/customize-a-play#setting)

### 2. 향상/변경된 기능

* 자동 처리 조사 추가 '예요/이에요'
* Common Action 내에서 Utterance Parameter 정의할 수 있도록 수정
* 학습문장 Export 파일 이름 변경
* Action의 Prompt 하나를 Silent Prompt로 지정하면, 모두 Silent Prompt로 변경되도록 수정
* Root Common Action끼리 Parameter 공유되지 않도록 변경

### 3. 버그 수정

* Intent 리스트 최종 수정 시간이 정확히 표시 안되는 현상 수정
* 자동완성 UI 수정
* 일부 단어 Entity 검색 안되는 버그 수정
* 여러 개의 Response Filter를 적용할 때 멈추는 현상 수정

## Version 1.2.0

업데이트일 : 2019년 3월 12일

### 1. 새로운 기능

* Action 중복 생성을 줄이기 위한 Common Action 추가 : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/use-common-actions)
* Play 내에서 공통으로 사용할 수 있는 Global Backend Parameter 추가 : [자세히 알아보기](./create-plays-with-play-builder/customize-a-play#setting-backend-proxy)
* Response에서 효과음 추가 : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/use-responses/use-prompts#skml-tag)

### 2. 향상/변경된 기능

* Utterance Parameter에 Entity mapping 방식 변경 : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/use-parameters/define-a-parameter#utterance-parameter-등록하기)
*   Entity value 및 동의어 입력 시 허용 특수기호 추가

    ' (Apostrophe), & (Ampersand), - (Hyphen)
* 저장 버튼 동작 수정
* Entity value 및 동의어 입력 시 띄어쓰기 허용
* 여러 Prompt 등록 후 하나를 Silent prompt로 지정하면 모두 Silent prompt로 변경
* 히스토리에 Snapshot ID 노출
* Exception prompt 3개 이상 입력 허용

### 3. 버그 수정

* Entity Type의 BID_QT에 숫자 보강
* Utterance parameter에 mapping할 Entity 사라지는 현상 수정

## Version 1.1.0

업데이트일 : 2018년 12월 13일

### 1. 새로운 기능

* 멀티턴 대화 지원 (Response + Branch Action) : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/response-with-branch-actions)
* AudioPlayer Interface용 Display Interface 추가 : [자세히 알아보기](./create-plays-with-play-builder/use-backend-proxy/capability-interfaces/audioplayer-display-interface)
* 다른 Intent 에서 Entity type 더 가져오기 기능 추가 : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/response-with-branch-actions#multi-turn-branch)
* Silent Prompt : [자세히 알아보기](./create-plays-with-play-builder/define-an-action/use-responses/use-prompts#silent-prompt)

### 2. 향상/변경된 기능

*   Entity value 및 동의어 입력 시 특수기호 허용 제외

    _ (Underbar)
* Entity value 및 동의어 입력 시 띄어쓰기 허용

### 3. 버그 수정

* Fallback 처리 되어야 하는 발화들이 특정 Custom Intent로 분석되는 현상 수정
* 상세 페이지에서 Ctrl(Cmd) + A 키가 동작하지 않는 현상 수정

### 4. 다음 업데이트 추가 예정 기능

*   Entity value 및 동의어 입력 시 허용 특수기호 추가

    ' (Apostrophe), & (Ampersand), - (Hyphen)
