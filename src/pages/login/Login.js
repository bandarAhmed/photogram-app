import React, { useEffect, useState } from 'react'
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
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const history = useHistory();

  
  const onSubmet = async () => {
    const bassData = {
      email,
      password
    }
    
    try {
      setLoading(true)
      await axios.post( url + 'login', bassData).then(res => {
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
    }
    valdatie()
    
  };

// هنا يتم التحقق من ما اذا كان البريد بريدا فعليا ام لا والتاكد من المدخلات انها ليست فارغه
  const valdatie = ()=>{
    if(email === ''){
      setEmailError('يحب ادخال البريد')
    }else if(email.includes('@') == false){
      setEmailError('يجب ادخال بريد الكتروني حقيقي')
    }
    else {
      setEmailError(" ")
    }
    if(password === ''){
      setPasswordError('عليك ادخال كلمه المرور')
    }else{
      setPasswordError('')
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
          <form>
            <div className='login-contianer'>
              <div className='inpus-continer'>
                <label htmlFor='email'>البريد الكترني</label>
                <input  name='email' value={email} type='text' onChange={(e) => setEmail(e.target.value)} placeholder='ادخل البريد الاكتروني' required/>
                <div style={{color: 'red'}}>{emailError}</div>
                <label htmlFor='password'>كلمه المرور</label>
                <input name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='ادخل كلمه المرور' required/>
                <div style={{color: 'red'}}>{passwordError}</div>
                <button onClick={()=>  onSubmet()}>تسجيل</button>
                {
                  status === 401 ? <Alert style={{fontSize: 'auto', Height: 'auto'}} className='alert' severity="error">كلمة المرور او البريد الاكتروني غير صحيح</Alert> :
                  ''
                }
                {
                   status == 500 ? <Alert style={{fontSize: 'auto', Height: 'auto'}} className='alert' severity="error">البريد الاكتروني غير موجود انقر على انشاء حساب جديد</Alert> :
                   ''
                }
                <a href='register'>انشاء حساب</a>
              </div>
            </div>
          </form>
          </>
      }
    </>
  )
}

export default Login