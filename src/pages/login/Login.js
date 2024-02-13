import React, { useState } from 'react'
import './login.css'
// import { LOGIN_URL } from '../../config/urls';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import { Alert, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { url } from '../../config/url';

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
      await axios.post( url +'login', bassData).then(res => {
        Preferences.set({
          key: 'accessToken',
          value: res.data.accessToken
        })
      })
      setLoading(false)
      history.push('/get-all-post')
      window.location.reload();
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
                <label htmlFor='email'>البريد الكترني</label>
                <input  name='email' value={email} type='text' onChange={(e) => setEmail(e.target.value)} required/>
                <label htmlFor='password'>كلمه المرور</label>
                <input name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' required/>
                <button onClick={() =>  onSubmet() }>تسجيل</button>
                <a href='register'>انشاء حساب</a>
                {
                  status === 401 ?  <Alert style={{fontSize: '40px', Height: '60px'}} className='alert' severity="error">كلمه المرور او البريد غير صحيحه</Alert> 
                  : status === 500 ? <Alert style={{fontSize: '40px', Height: '60px'}} className='alert' severity="error">املأ جميع الخانات وتأكد من المعلومات</Alert> : ''
                }
              </div>
            </div>
          </>
      }
    </>
  )
}

export default Login