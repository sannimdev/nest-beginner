# 따라하며 배우는 NestJS 실습

-   [따라하며 배우는 Nest.js](https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4/dashboard)

-   Service ➡ Controller ➡ Repository

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

### 커스텀 파이프 구현 방법

-   PipeTransform이란 인터페이스를 새롭게 만들 커스텀 파이프에 구현해줘야 한다.
-   그리고 이것과 함께 모든 파이프는 transform() 메서드가 필요하다.
-   이 메서드는 NestJS가 인자(arguments)를 처리하기 위해서 사용된다.

    ```ts
    import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

    export class BoardStatusValidationPipe implements PipeTransform {
        transform(value: any, metadatA: ArgumentMetadata) {
            console.log('value', value);
            console.log('metadata', metadata);

            return value;
        }
    }
    ```

#### transform 메서드

-   두 개의 파라미터를 가진다
-   1번재 파라미터는 인잣값(value)
-   두 번재 파라미터는 인자에 대한 메타 데이터를 포함한 객체이다.
-   transform()메서드에서 returnm 된 값은 route 핸들러로 전해진다.
-   exception이 발생하면 클라이언트로 바로 전해진다.

## ORM (Object Relational Mapping)

-   객체와 관계형 데이터베이스의 데이터를 자도응로 변형하고 연결하는 작업을 수행한다.
-   ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하다.

```js
// ORM 사용
const boards = Board.find({ title: 'Hello', status: 'PUBLIC' });

// Pure Javascript Code
db.query('SELECT * FROM boards WHERE title = "Hello" AND status = "PUBLIC', (err, result) => {
    if (err) {
        throw new Error('Error');
    }
    boards = result.rows;
});
```

### 특징과 이점

-   모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성
-   데이터베이스에서 개체를 쉽게 삽입, 업데이트, 삭제가 가능함.
-   테이블 간의 매핑(일대 일, 일대 다 및 다대 다)을 만듦.
-   간단한 CLI 명령을 제공
-   TypeORM은 간단한 코딩으로 ORM 프레임워크를 사용하기 쉽다.
-   TypeORM은 다른 모듈과 쉽게 통합된다.

### ORM 설치하기

-   @nestjs/typeorm
    -   NestJS에서 TypeORM을 사용하기 위해 연동시켜주는 모듈
-   typeorm
-   pg
    -   Postgres 모듈

```
npm install pg typeorm @nestjs/typeorm --save
```

### Entity ?

-   TypeORM을 사용할 때는 class를 데이터베이스 테이블로 변환해야 하므로 클래스를 생성하고 속성을 컬럼으로 정의하는 것이다.

-   `@EntityRepository`: 클래스를 사용자 정의(CUSTOM) 저장소로 선언하는 데 사용된다.
-   사용자 지정 저장소는 일부 특정 엔티티를 관리하거나 일반 저장소일 수 있다.

### Remove vs Delete

-   remove: 존재하는 아이템을 remove를 이용해서 지운다. 그러나 존재하지 않으면 오류가 발생한다.(404 Error)
-   delete: 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없음
-   remove를 이용하면 아이템을 지울 때 두 번의 데이터베이스를 이용해야 하므로 (아이템 유무 + 지우기) 비효율적이므로 데이터베이스를 한 번만 접근해도 되는 delete 메서드를 사용할 것이다. ([참고](https://github.com/typeorm/typeorm/blob/master/docs/repository-api.md))

## 비밀번호 암호화

```
npm install bcryptjs --save
```

```js
import * as bcrypt from 'bcryptjs';
```

## JWT

Json Web Token의 약자로 당사자 간에 정보를 JSON 개체로 안전하게 전송하기 위한 컴팩트하고 독립적이 방식을 정의하는 개방형 표준.
이 정보는 디지털 서명이 되어 있으므로 확인하고 신뢰할 수 있다.
간단하게 이야기하면 정보를 안전하게 전달할 때나 유저의 권한을 체크할 때 체크를 하기 위해서 사용하는 데 유용한 모듈이다.

-   Header
    -   토큰에 대한 헤더 정보 포함
        -   타입
        -   해싱 알고리즘
        -   SHA-256
-   Payload
    -   사용자 정보
    -   만료 기간
    -   주제
-   Verify Signature
    -   JWT의 마지막 세그먼트는 보낸 사람에 의해 서명되었으며 어떤 식으로든 변경되지 않았는지 확인하는 데 사용되는 서명
    -   서명은 헤더 및 페이로드 세그먼트, 서명 알고리즘, 비밀 또는 공개키를 사용하여 생성된다.

### 절차

-   유저 로그인 → 토큰 생성 → 토큰 보관
-   서버에서는 클라이언트가 요청하여 같이 온 header와 payload를 가져오고 서버 안에 가지고 있는 Secret을 이용하여 서명을 다시 생성한다.
    그래서 그 둘이 일치하면 통과된다.

### 토큰 생성하기

-   필요한 모듈 설치하기

-   @nestjs/jwt
    -   nestjs에서 jwt를 사용하기 위해 필요한 모듈
-   @nestjs/passport
    -   nestjs에서 passport를 사용하기 위해 필요한 모듈
-   passport
    -   passport 모듈
-   passport-jwt
    -   jwt 모듈
    -   Strategy가 들어 있음
-   @types/passport-jwt
    -   jwt 모듈에 관한 타입을 정의한 모듈(for using typescript)

```
npm install @nestjs/jwt @nestjs/passport passport passport-jwt --save
```

### 애플리케이션에서 JWT 모듈 등록하기

-   [JWT 토큰 실습](https://jwt.io/)

1. auth 모듈 imports에 등록하기

    - Secret
        - 토큰을 만들 때 이용하는 Secret 텍스트 (아무 텍스트나 넣어도 된다)
    - ExpiresIn
        - 정해진 시간 이후에는 토큰이 만료됨

    ```js
    @Module({
        imports: [
            JwtModule.register({
                secret: 'Secret1234',
                signOptions: {
                    expiresIn: 60 * 60, // 1시간 이후 만료
                },
            }),
            TypeOrmModule.forFeature([UserRepository]),
        ],
        controllers: [AuthController],
        providers: [AuthService],
    })
    export class AuthModule {}
    ```

2. Passport 모듈을 애플리케이션에 등록하기

```js
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'Secret1234',
            signOptions: {
                expiresIn: 60 * 60, // 1시간 이후 만료
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
```

3. 로그인 성공 시 JWT 이용하여 토큰 생성하기

4. Service에서 SignIn 메서드에서 생성하면 된다.

-   액세스 토큰 예시
    ```json
    {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYWEiLCJpYXQiOjE2MzM5NDM3ODEsImV4cCI6MTYzMzk0NzM4MX0.EboyVxUbOuNGHNyzRCe5-vVrCctR62P8aEfnQq20H1A"
    }
    ```

### Passport, Jwt 이용해서 토큰 인증 후 유저 정보 가져오기

#### Passport의 역할

1. 유저가 요청할 때 요청 안에 있는 Header에 토큰을 넣어서 요청했는데 요청 안에 Payload가 있음.
2. 그리고 그 payload 안에 유저 이름을 넣었다.
3. 해당 토큰이 유효한지는 secret text를 이용하여 알아내면 payload 안에 유저 이름을 이용해서 데이터베이스 안에 있는 유저 이름에 해당하는 유저 정보를 모두 가져올 수 있다.

## Middlewares

-   NestJS에는 여러가지 미들웨어가 있다.
    -   Pipes
        -   유효성 체크를 하거나 페이로드 변환
    -   Filters
        -   오류 처리 미들웨어
    -   Guards
        -   인증 미들웨어
    -   Interceptors
        -   응답 매핑 및 캐시 관리와 함께 요청 로깅과 같은 전후 미들웨어

### 미들웨어가 불리는 순서

middleware → guard →
interceptor (before) → pipe → controller → service → controller →
interceptor(after) → filter(if applicable) → client

## 접근 제어

### 글쓰기

게시물 생성 요청 -> 헤더 안에 있는 토큰으로 유저 정보를 삽입 -> 유저 정보와 게시물 관계 형성하며 게시물 생성

## 로그

실제 개발할 때는 기능을 구현하기 이전에 로그 기능을 장착하고 기능을 구현할 때마다 로깅하는 것이 일반적이다.

-   Log: 중요한 정보의 범용 로깅
-   Warning: 치명적이거나 파괴되지 않은 처리 문제
-   Error: 치명적이거나 파괴적인 처리되지 않은 문제
-   Debug: 오류 발생 시 로직을 디버그하는 데 도움이 되는 유용한 정보
-   Verbose: 응용 프로그램의 동작에 대한 통찰력을 제공하는 정보

### built-in된 logger 클래스를 사용하기

## 설정

소스 코드 안에서 어떠한 코드들은 개발 환경이나 운영 환경에 따라 다르게 코드를 넣어야 할 때가 있다.
그중 남들에게 노출되지 않아야 하는 코드가 있다. 이러한 코드는 설정파일을 따로 만들어서 보관해야 한다.

### Codebase VS Exnvironment Variables(환경 변수)

설정할 때 여러 가지 형식으로 사용할 수 있다.
xml, json, yaml 같은 경우에는 Codebase에 해당한다.
그리고 다른 방법은 환경 변수로 할 수 있다. 주로 이 둘을 나눠서 하는 이유는 비밀번호와 API Key와 같은 남들에게 노출되면 안 되는 정보를 주로 환경 변수를 이용하여 처리한다.

-   Codebase: 일반적으로 Port와 같이 노출되어도 상관없는 정보
-   환경 변수: 남들에게 노출되지 말아야 하는 중요한 정보

### 설정하기 위해 필요한 모듈

```
-- 윈도우만 설치
npm install -g win-node-env
-- 모든 OS에서 설치
npm install config --save
```

### Config 모듈을 이용한 설정 파일 생성

-   물론.... `.gitignore`로 설정을 해두어야겠지...

1. 루트 디렉터리에 config라는 폴더를 만들고 그 폴더 안에 JSON이나 YAML 형식의 파일 만들기.
    - config/default.yaml
2. config 폴더 안에 default.yml, development.yml, production.yml 파일을 생성한다.
    - 각 개발/운영 환경에서 사용될 환경변수를 각각 다르게 설정할 수도 있음.
