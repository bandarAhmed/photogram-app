import axios from 'axios';
import React, { useState } from 'react'
import "./register.css";
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';

// import useHistory from 'react-router-dom'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState('');
  const [loading, setLoading] = useState(false)


  // const history = useHistory()

  const onSubmet = async () => {
    const bassData = {
      name,
      email,
      password
    }
    try {
      setLoading(true)
      await axios.post('http://localhost:4000/register', bassData).then(res => console.log(res));
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.error(e);
    }
  }
  return (
    <>
    {
      loading ? <CircularProgress  size={70}
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2}}/> 
      :    
      <>
      <div className='register-contianer'>
        <div className='input-contianer'>
          <label for='name'>اسم المستخدم</label>
          <input name='name' value={name} onChange={(e) => setName(e.target.value)} type='text' />

          <label for="email">البريد الاكتروني</label>
          <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='text' />

          <label for="password">كلمة المرور</label>
          <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
          <label for="password2">تأكيد كلمة المرور</label>
          <input name='password2' onChange={(e) => setSeePassword(e.target.value)} type='password' />
          <button type='sunmet' onClick={() => { onSubmet() }}>انشاء الحساب</button>
          <br/>
          {
            password !== seePassword ? <Alert  className='alert' severity="error">كلمه المرور غير متطابقه</Alert> : onSubmet
          }
          <a href='/login'>لدي حساب بالفعل</a>
        </div>
          {
            email == null || password == null || name == null ? <Alert className='alert' severity="error">جميع الحقول مطلوبه</Alert> : <></>
          }
      </div>
    </>
    }
    </>

  )
}

export default Register