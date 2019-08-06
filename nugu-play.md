---
depth_order: 2
---

# NUGU play

![](https://www.youtube.com/watch?v=1PB5j7FM0EE)

NUGU play는 NUGU 플랫폼을 통하여 사용자의 요청에 응답하여 서비스의 단위이며, Play Builder에 Play를 만들 수 있습니다. 좋은 콘텐츠를 보유하고 있는 업체 또는 개인이  Play를 통하여, NUGU 사용자에게 자신의 서비스를 제공할 수 있도록 도와줍니다.

사용자의 발화를 이해하는 User Utterance Model, 그리고 이를 기반으로 기능을 수행하는 Action들을 조합하여 하나의 완결된 Play를 만듭니다. 하나의 Play를 완성하기 위해서는 크게

1. 사용자의 발화를 정확하게 분석하도록 Intent/Entity를 정의하여 NLU 엔진을 학습시키고,
2. Intent별로 Action을 정의하여 사용자의 요청에 대해 적절한 응답과 동작을 처리할 수 있어야 하며,
3. 실질적으로 사용자 발화에 대해 응답하거나 동작할 수 있는 Backend proxy API를 연동하는 것이 필요합니다.

Play Builder는 이 모든 기능들을 하나의 통합된 환경에서 GUI 기반으로 제공하고 있습니다. 따라서 개발자가 아니어도 Play Builder를 활용하여 자신만의 Play를 개발할 수 있습니다. Play Builder에서 Play를 만든 후, NUGU play kit에서 다음의 과정을 통해 Play를 이용할 수 있습니다.

1. Play 타입과 호출이름(Invocation name)을 정합니다.
2. 기본 정보/연동 정보 등을 입력하는 심사요청서를 작성합니다.
3. 심사가 완료되면, Play 타입에 맞는 환경에서 Play를 이용할 수 있게 됩니다.

## Play

Play는 NUGU 플랫폼의 엔진들과 통신해 서비스를 제공하는 단위로서, 사용자와 상호 작용하여 의도를 이해하고 그에 맞는 적절한 답변을 주거나 명령을 수행합니다.

Play로 서비스를 제공하기 위해서는 사용자의 발화를 이해하여 의도를 파악하고 그에 맞는 답변을 제공해야 합니다. 즉, 서비스 제공자는 사용자의 발화를 예상하고 이 발화들의 의도에 맞는 기능들을 정의해야 합니다.

![](./assets/images/nugu-play-01.png)

## Play 타입

NUGU play kit에서 만들 수 있는 Play는 사용 대상에 따라 다음 두 가지로 구분됩니다.

### Public Play

* NUGU 사용자 모두가 사용할 수 있는 Play입니다.
* 추후 공개 예정인 스토어에 Play가 등록되면 NUGU 사용자가 선택할 수 있습니다.
* 스토어가 공개되기 전까지는 선택 과정 없이 바로 사용할 수 있습니다.

### Private Play

* 등록된 디바이스 혹은 초대된 사용자만 사용할 수 있는 Play입니다.
* 예를 들어, 회사 내에서만 혹은 가족/친구끼리만 사용하는 Play로도 활용할 수 있습니다.
* 특정 디바이스를 등록하거나 제한된 사용자만 초대하는 것은 NUGU biz kit에서 설정할 수 있습니다.

## Play 호출 이름(Invocation name)

Play 호출 이름은 사용자가 Play를 호출하기 위해 발화하는 고유한 이름을 말합니다. 사용자가 Play 호출 이름을 발화하면 해당 Play의 세션으로 진입하여 해당 Play의 기능을 사용할 수 있게 됩니다. 호출 이름은 Play Builder를 통해 Play를 만든 후, NUGU play kit에서 심사요청서를 작성할 때 입력할 수 있으며, 심사 단계에서 호출이름을 검토합니다.

{% alerts style="info" %}
Play 생성 시에 이 호출 이름을 정의해야 하고, 호출 이름에 대한 자세한 내용은 [호출 이름 정의하기](./nugu-play/play-registration-and-review/register-a-play#define-an-invocation-name)를 참고하면 됩니다.
{% endalerts %}
