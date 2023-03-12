import React, { useState } from 'react'

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

interface Userinfo {
  name: string,
}

interface User {
  username: string,
  password: string,
  userInfo: Userinfo,
}

const secret: string = '1234!@#$';

const userList: User[] = [
  {
    username: 'kms',
    password: '1234',
    userInfo: { name: 'kim'}
  },
  {
    username: 'kju',
    password: '1234',
    userInfo: { name: 'kim'}
  },
  {
    username: 'lim',
    password: '1234',
    userInfo: { name: 'kim'}
  },
  {
    username: 'kjj',
    password: '1234',
    userInfo: { name: 'kim'}
  },
]

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  const user: User | undefined = userList.find((user: User) => {
    return user.username === username && user.password === password;
  })
  return user ? {message: 'SUCCESS', token: JSON.stringify({user: user.userInfo, secret: secret})}
  : null;
}

const getUserInfo = async (token: string): Promise<Userinfo | null> => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  const parsedToken = JSON.parse(token)
  if(!parsedToken?.secret || parsedToken.secret !== secret) return null;

  const loggedUser: User | undefined = userList.find((user: User) => {
    if(user.userInfo.name === parsedToken.user.name) return user
  })

  return loggedUser ? loggedUser.userInfo : null;
}

const LoginWithMockAPI = () => {

  const [userInfo, setUserInfo] = useState<Userinfo>({name: ''});

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    const loginRes = await login(formData.get('username') as string, formData.get('password') as string);
    if(!loginRes) return
    
    const userInfo = await getUserInfo(loginRes.token);
    if(!userInfo) return;

    setUserInfo(userInfo);

  }

  return (<div>
    <h1>
      Login with Mock API
    </h1>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <input type="submit" value="Submit" />
      {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
    </form>
    <div>
      <h2>
        User info
      </h2>
      {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default LoginWithMockAPI
