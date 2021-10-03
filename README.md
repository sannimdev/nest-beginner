# 따라하며 배우는 NestJS 실습

-   [따라하며 배우는 Nest.js](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4/dashboard)

## NestJS 모듈이란?

-   App Module 안에 BoardModule과 AuthModule이 있으면 각 모듈 안에 Controller Entity Service 등이 있다.
-   NestJS 앱은 반드시 1개 이상의 `App Module`을 가진다.
-   `@Module` 데코레이터가 달린 클래스.
-   모듈은 기본적으로 싱글톤이므로 모듈 간에 쉽게 공급자의 동일한 인스턴스를 공유할 수 있음.

### 1. 모듈 생성하기

-   모듈을 생성하는 방법은 다음과 같다.
    ```
    nest g module 생성할모듈이름
    ```
