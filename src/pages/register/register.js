import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./register.css";
import Alert from '@mui/material/Alert';
import { CircularProgress } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Preferences } from '@capacitor/preferences';
import { url } from '../../config/url';
import * as yup from 'yup';
import{ Formik } from 'formik';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [seePassword, setSeePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState();
  const history = useHistory();


  const registerSchema = yup.object({
    name: yup.string().required("يجب عليك ادخال اسم مستخدم").nullable(),
    email: yup.string().required("عليك ادخال بريد الكتروني").email("عليك ادخال بريد الكتروني صحيح").nonNullable(),
    password: yup.string().nonNullable().required("عليك ادخال كلمة مرور").min(5, 'يجب عليك ادخال 5 حروف على الاقل'),
    seePassword: yup.string().oneOf([yup.ref('password')], 'يجب تأكيد كلمه السر').required("لا بد من التحقق من كلمه المرور"),
  });

  function setSubmet(values){
    setName(values.name)
    setEmail(values.email)
    setPassword(values.email)
    setSeePassword(values.seePassword)
  };

  const onSubmet = async (values) => {
    setSubmet(values)
    const form = new FormData()
    form.append('name', name)
    form.append('email', email)
    form.append('password', email)
    form.append('avatar', avatar)
    try {
      
      setLoading(true)
      await axios.post(url + 'register', form)
      await autoLogin()
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setStatus(e.response.status)
    }
  }
  const autoLogin = async ()=> {
      const formLogin ={ 
        email: email,
        password: password
      }
    
    try {
        await axios.post(url +'login', formLogin).then(res => {
          Preferences.set({
          key: 'accessToken',
          value: res.data.accessToken
        })
      })
      history.push('/get-all-post')
    } catch (e) {

    }
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(typeof file == 'png' || 'jpg' || 'jpeg'){
      setAvatar(file);
    }else{

    }
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
        <Formik
          initialValues={{
            name: name,
            email: email,
            password: '',
            seePassword: '',
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            onSubmet(values)
          }}
          >
        
        {
          formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
             <div className='register-contianer'  >
            <div className='input-contianer'>
                {avatar ?
                        <img alt='Error' style={{borderRadius: '50%', width: '80px',height: '80px'}} src={URL.createObjectURL(avatar)} />
                        :
                        <>
                          ادخل صوره الملف الشخصي
                          <label style={{fontSize: "50px"}} for="file-upload" class="custom-file-upload">
                           +
                          </label>
                        <input id="file-upload"  onChange={handleFileChange} type='file'/>
                        </> 
                }
                {/* name */}
              <label htmlFor='name'>اسم المستخدم</label>
              <input  name='name' value={formikProps.values.name} onChange={formikProps.handleChange} type='text' placeholder='ادخل اسم المستخدم' />
              <div style={{color: 'red', fontSize: '10px'}}>{formikProps.touched.name && formikProps.errors.name}</div>

              <label htmlFor="email">البريد الاكتروني</label>
              <input  name='email' value={formikProps.values.email} onChange={formikProps.handleChange} type='text'  placeholder='ادخل البريد الاكتروني'/>
              <div style={{color: 'red', fontSize: '10px'}}>{formikProps.touched.email && formikProps.errors.email}</div>
              {/* password */}
              <label htmlFor="password">كلمة المرور</label>
              <input  name='password' value={formikProps.values.password} onChange={formikProps.handleChange} type='password' placeholder='ادخل كلمه المرور'  />
              <div style={{color: 'red', fontSize: '10px'}}>{formikProps.touched.password && formikProps.errors.password}</div>
                {/* compire with main pass */}
              <label htmlFor="seePassword">تأكيد كلمة المرور</label>
              <input  name='seePassword' value={formikProps.values.setPassword} onChange={formikProps.handleChange} type='password'  placeholder='أكد كلمه المرور'/>
              <div style={{color: 'red'}}>{formikProps.touched.seePassword && formikProps.errors.seePassword} </div>

              <button type='sunmet'>انشاء الحساب</button>
              <br/>
 
               {
                  status === 401 ? <Alert style={{fontSize: 'auto', Height: 'auto'}} className='alert' severity="error">البريد المراد انشاء حاسب به مسجل مسبقا انقر على لدي حساب بالفعل</Alert> :
                  ''
                }
              <a href='/login'>لدي حساب بالفعل</a>
            </div>
          </div>
         
            </form>
          )
        }
      </Formik>
    </>
    }
    </>

  )
}

export default Register