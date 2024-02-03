import React, { useState } from 'react'
import './login.css'
// import { LOGIN_URL } from '../../config/urls';
import { Storage } from '@capacitor/storage';
import axios from 'axios';
import { Alert, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();

  const history = useHistory();

  
  const onSubmet = async () => {
    const bassData = {
      email,
      password
    }
    
    try {
      setLoading(true)
      await axios.post('http://localhost:4000/login', bassData).then(res => {
        Storage.set({
          key: 'accessToken',
          value: res.data.accessToken
        })
      })
      setLoading(false)
      history.push('/get-all-post')
    } catch (e) {
      setLoading(false)
      setStatus(e.response.status)
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
                <input  name='email' value={email} type='text' onChange={(e) => setEmail(e.target.value)} required/>
                <label for='password'>كلمه المرور</label>
                <input name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' required/>
                <button onClick={() =>  onSubmet() }>تسجيل</button>
                <a href='register'>انشاء حساب</a>
                {
                  status == 401 ?  <Alert style={{fontSize: '20px', maxHeight: '50px', maxWidth: 'auto'}} className='alert' severity="error">كلمه المرور او البريد غير صحيحه</Alert> 
                  : status == 500 ? <Alert style={{fontSize: '20px', maxHeight: '50px', maxWidth: 'auto'}} className='alert' severity="error">املأ جميع الخانات</Alert> : ''
                }
              </div>
            </div>
          </>
      }
    </>
  )
}

export default Login