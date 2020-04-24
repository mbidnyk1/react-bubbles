import React,{ useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState(
    {
      username: '',
      password: ''
    }
  )

  const handleChange = e => {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.payload))
      props.history.push('/bubblePage')
    })
    .catch(err => console.log({err}))

  }
  return (
       <div>
            <form onSubmit={login}>
                <label htmlFor='username'>username:</label>
                <input
                    type='text'
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}
                    />
                <label htmlFor='password'>password:</label>
                <input
                    type='text'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    />
                    <button>Log in</button>
            </form>
        </div>
  );
};

export default Login;
