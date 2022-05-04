# dev-platform

> 학습한 내용을 직접 구현해 보는 프로젝트 공간 입니다.

# Base Stack

> 프로젝트의 주요 기술 배경은 다음과 같습니다.

## Front

- `React`
- `Next.js`
- `Typescript`
- `redux-toolkit`

## Back

- `Node.js`
- `MongoDB`

## Another

- design
  - `styled-components`
  - `Material UI`

# Implement 🖥

## 1. 회원가입 및 로그인

> 회원가입 및 로그인 기능에 대한 구현 내역입니다. Input value값에 대한 검증에 중점을 두고 구현했습니다.

<img src="public/static/screenshot/signup.jpeg" alt="signup" />

### 구현내용

- 검증값을 통해 에러 메시지를 출력하는 컴포넌트
- MongoDB 데이터 연동
- `styled-components`를 활용한 UI
- input value를 검증하는 validation 함수

```ts
// * password가 email이나 이름을 포함하는지 검증
const isPasswordHasNameOrEmail = useMemo(
  () =>
    !password ||
    !name ||
    password.includes(name) ||
    password.includes(email.split("@")[0]),
  [password, name, email]
);
```

<br />

## 2. 게시판

> 게시글 및 댓글 작성, 수정, 삭제 기능을 구현한 게시판 입니다. 데이터는 MongoDB에 저장됩니다.

<img src="public/static/screenshot/board.gif" alt="게시판" />

### 구현내용

- CRUD에 해당하는 API
- MongoDB 데이터 연동
- Material UI를 활용한 UI
- Next.js를 통한 SSR

```ts
// pages/board/[id].tsx

...
export const getServerSideProps = wrapper.getServerSideProps(
  (store: Store) => async (context: NextPageContext) => {
    const { id } = context.query;

    try {
      if (id) {
        const { data } = await getPostAPI(id as string);
        store.dispatch(boardActions.setDetail(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
...
```
