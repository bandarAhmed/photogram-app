import React, { useState } from 'react'
import './login.css'
// import { LOGIN_URL } from '../../config/urls';
import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const onSubmet = async () => {
    const bassData = {
      email,
      password
    }

    try {
      setLoading(true)
      await axios.post('http://192.168.8.112:4000/login', bassData).then(res => {
        Storage.set({
          key: 'accessToken',
          value: res.data.accessToken
        })
      })
      setLoading(false)
      history.push('/get-all-post')
    } catch (e) {
      setLoading(false)
      console.log(e)
    }

  }

  return (
    <>
      {
        loading ? <CircularProgress size={70}
          sx={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2
          }} />
          :
          <>
            <div className='login-contianer'>
              <div className='inpus-continer'>
                <label for='email'>البريد الكترني</label>
                <input name='email' value={email} type='text' onChange={(e) => setEmail(e.target.value)} />

                <label for='password'>كلمه المرور</label>
                <input name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' />
                <button onClick={() => { onSubmet() }}>تسجيل</button>
                <a href='register'>انشاء حساب</a>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default Login