# 따라하며 배우는 NestJS 실습

-   [따라하며 배우는 Nest.js](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4/dashboard)

## Module

-   App Module 안에 BoardModule과 AuthModule이 있으면 각 모듈 안에 Controller Entity Service 등이 있다.
-   NestJS 앱은 반드시 1개 이상의 `App Module`을 가진다.
-   `@Module` 데코레이터가 달린 클래스.
-   모듈은 기본적으로 싱글톤이므로 모듈 간에 쉽게 공급자의 동일한 인스턴스를 공유할 수 있음.

### 모듈 생성하기

-   모듈을 생성하는 방법은 다음과 같다.
    ```
    nest g module 생성할모듈이름
    ```

## Controller

-   컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환한다.
-   컨트롤러 생성하는 방법은 다음과 같다.
    ```
    nest g controller boards --no-spec
    ```
    -   `--no-spec`: boards 컨트롤러를 테스트하는 부분까지 자동으로 생성해주는 것을 비활성화

## Provider

-   Nest의 클래스 (프로바이더)
    -   서비스
    -   리포지터리
    -   팩토리
    -   헬퍼
-   프로바이더의 주요 아이디어는 종속성으로 주입할 수 있음
    -   객체를 서로 다양한 관계를 만들 수 있다
    -   객체의 인스턴스를 연결하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있음.
-   Provider 등록하기
    -   사용하기 위해서는 Nest에 등록해야 사용할 수 있다.
    -   module 파일에서 할 수 있음.
    -   providers 항목 안에 해당 모듈에서 사용하고자 하는 `Provider`를 넣어주면 된다.

## Service

-   서비스는 소프트웨어 개발 내의 공통 개념이다.
-   `@Injectable` 이라는 데코레이터로 감싸여 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있다.
-   서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 작업을 하는 부분을 처리한다.
-   즉, 서비스를 컨트롤러에서 사용하려면 종속성 주입을 해야 한다는 뜻이다.

## Model

-   필요한 데이터가 어떤 것인지 정의하기 위해 규격을 정의
-   Interface: 변수의 타입만 체크
-   Classes: 변수의 타입도 체크하고 인스턴스도 생성 가능

## DTO (Data Transfer Object)

-   계층 간 데이터 교환을 위한 객체
-   DB에서 데이터를 얻어 Service나 Controller로 보낼 때 사용하는 객체
-   DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체
-   interface나 class를 이용하여 정의될 수 있다. (NestJS에서는 Class를 이용하는 것을 권장한다.)
-   데이터 유효성 체크할 때 사용한다.
-   타입스크립트의 타입으로도 사용된다.

## Pipe

-   파이프는 `@Injectable` 데코레이터 주석이 달린 클래스이다
-   파이프는 `데이터 변환(data transformation)`과 `데이터 검증(data validation)`을 위해 사용된다.
    -   유효성 검사의 성공/실패 여부에 따라 다음 처리 메서드로 보내거나 오류를 발생시킬 수 있음
-   파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동한다.
-   Nest는 메서드가 호출되기 직전에 파이프를 삽입하고 파이프는 메서드로 향하는 인수를 수신하고 이에 대해 작동한다.

### 파이프를 사용하는 방법

1. Handler-level Pipes
    - 핸들러 레벨에서 작동 `@UsePipes` 어노테이션
2. Parameter-level Pipes
    - 파라미터 레벨의 파이프이므로 특정 파라미터에만 적용되는 파이프이다.
3. Global-level Pipes
    - Application level의 파이프이다.
    - 가장 상단 영역인 main.ts에 넣어주는 것이다.

### Built-In Pipes

-   ValidationPipe
-   ParseIntPipe
-   ParseBoolPipe
-   ParseArrayPipe
-   ParseUUIDPipe
-   DefaultValuePipe

### 필요한 모듈

```
npm install class-validator, class-transformer
```

-   [유효성 확인과 관련된 사항 참고](https://github.com/typestack/class-validator#manual-validation)
