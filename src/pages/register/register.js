import axios from 'axios';
import React, { useState } from 'react'
import "./register.css";
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Storage } from '@capacitor/storage';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [seePassword, setSeePassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [Status, setStatus] = useState()


  const history = useHistory();

  const onSubmet = async () => {
    const form = new FormData()
   form.append('name', name)
   form.append('email', email)
   form.append('password', password)
   form.append('avatar', avatar)
    try {
      setLoading(true)
      await axios.post('http://localhost:4000/register', form)
      setLoading(false)
      
    } catch (e) {
      setStatus(e.response.status)
      setLoading(false)
      console.error(e);
    }
    await autoLogin()
  }
  const autoLogin = async ()=> {
      const formLogin ={ 
        email: email,
        password: password
      }
    
    try {
        await axios.post('http://localhost:4000/login', formLogin).then(res => {
        Storage.set({
          key: 'accessToken',
          value: res.data.accessToken
        })
      })
     
      history.push('/get-all-post')
    } catch (e) {
      setStatus(e.response.status)
      console.log(e)
    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
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
            {avatar ?
                    <img alt='Error' style={{borderRadius: '50%', width: '80px',height: '80px'}} src={URL.createObjectURL(avatar)} />
                    :
                    <input className='imgFile' onChange={handleFileChange} type='file' />
            }
          <label htmlFor='name'>اسم المستخدم</label>
          <input  name='name' value={name} onChange={(e) => setName(e.target.value)} type='text' required/>

          <label htmlFor="email">البريد الاكتروني</label>
          <input  name='email' value={email} onChange={(e) => setEmail(e.target.value)} type='text' required/>

          <label htmlFor="password">كلمة المرور</label>
          <input  name='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' required/>
          <label htmlFor="password2">تأكيد كلمة المرور</label>
          <input  name='password2' onChange={(e) => setSeePassword(e.target.value)} type='password' required/>
          <button type='sunmet' onClick={()=> onSubmet()}>انشاء الحساب</button>
          <br/>
          {
            password !== seePassword ? <Alert style={{fontSize: '20px'}} className='alert' severity="error">كلمه المرور غير متطابقه</Alert> : ''
          }
          {
            Status === 401 ? <Alert style={{fontSize: '20px', marginTop: '30px'}} className='alert' severity="error">الحساب مسجل اذهب الى لدي حساب بالفعل</Alert> 
            : 
            Status === 500 ? <Alert style={{fontSize: '20px', maxHeight: '50px', maxWidth: 'auto'}} className='alert' severity="error">املأ جميع الخانات</Alert> : ''
          }
          <a href='/login'>لدي حساب بالفعل</a>
        </div>
      </div>
    </>
    }
    </>

  )
}

export default Register