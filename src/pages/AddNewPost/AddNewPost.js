import React, { useContext, useState } from 'react';
import './AddNewPost.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert, Button, CircularProgress, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { url } from '../../config/url';


function AddNewPost() {
  const [img, setImgFile] = useState('');
  const [title, setTitle] = useState('');
  const [discraption, setDiscraption] = useState('');
  const [loading, setLoading] = useState('');
  const [status, setStatus] = useState('');
  const [ErrorsImg, setErrorsImg]= useState('');
  const [ErrorsTitle, setErrorsTitle]= useState('');
  const [ErrorsDis, setErrorsDis]= useState('');

  const { jwt, loggedIn } = useContext(AuthContext);

  const history = useHistory();

  const onSubmit = async () => {
    valdate()
    const formData = new FormData();
    formData.append('img', img);
    formData.append('title', title);
    formData.append('discraption', discraption);

    try {
      setLoading(true)
      await axios.post( url + 'post', formData, {
        headers: {
          Authorization: jwt,
        },
      });
      history.push('/get-all-post')
      setLoading(false)
    } catch (e) {
      setStatus(e.response.status)
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImgFile(file);
  };

  const valdate = ()=>{
    if(img  == ''){
      setErrorsImg("!يحب اضافه صوره")
    }else{
      setErrorsImg("")
    }
    if(title  == ''){
      setErrorsTitle("!حقل العنوان مطلوب")

    }else{
      setErrorsTitle("")
    }
    if(discraption == ''){
      setErrorsDis("!حقل الوصف مطلوب")

    }else{
      setErrorsDis("")
    }
  };

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
          {
            loggedIn ? 
            <>
            <div className='all'>
              <div className='add-container'>
                <div className='form-container'>
                  <label>Add Image</label>
                  {img ?
                    <img className='imgOfnewPost' alt='Error' src={URL.createObjectURL(img)} />
                    :
                    <>
                      <label style={{ fontSize: "50px" }} for="file-upload" class="custom-file-upload">
                        <i style={{color: "black"}} class="fa-regular fa-square-plus"></i>
                      </label>
                      <input id="file-upload" onChange={handleFileChange} type='file'/>
                      <div style={{color: 'red', fontSize: '15px'}} severity='error'>{ErrorsImg}</div>
                    </>
                    
                  }
                  {status === 500 ? 
                     <>
                     <label style={{ fontSize: "50px" }} for="file-upload" class="custom-file-upload">
                       <i style={{color: "black"}} class="fa-regular fa-square-plus"></i>
                     </label>
                     <input id="file-upload" onChange={handleFileChange} type='file'/></>
                  
                 : ''} 
                  {status === 500 ? <Alert severity='error'>يجب ادخال صوره فقط</Alert> : '' } 
                  <label>Title</label>
                  <input  value={title} onChange={(e) => setTitle(e.target.value)} className='text-input' type='text'placeholder='اضف عنوان لصوره'/>
                  <div style={{color: 'red', fontSize: '15px'}} severity='error'>{ErrorsTitle}</div>
                  <label>Dicraptions</label>
                  <textarea  value={discraption} onChange={(e) => setDiscraption(e.target.value)} type='text' maxLength='1450' placeholder='اضف وصف لصوره'/>
                  <div style={{color: 'red', fontSize: '15px'}} severity='error'>{ErrorsDis}</div>
                  <button className='post-button' onClick={onSubmit} type='submit'>نشر</button>
                </div>
              </div>
            </div>
            </> : <Dialog open={loading == false}>
              <DialogContent>
                  بجب تسجيل الدخوال من اجل  نشر منشور
                <DialogContentText  id="alert-dialog-slide-description">
                  هل تريد تسجيل الدخوال؟
                </DialogContentText>
              </DialogContent>
            <Button onClick={()=> history.push('/get-all-post')}>لا</Button>
          <Button onClick={()=> history.push('/login')}>نعم</Button>
            </Dialog>
          }
          </>
      }
    </>

  );
}

export default AddNewPost