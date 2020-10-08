import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => {
      Router.push('/');
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={submit}>
      <h1>Sign In</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      {errors}
      <button className='btn btn-primary'>Sign In</button>
    </form>
  );
};

export default SignIn;
