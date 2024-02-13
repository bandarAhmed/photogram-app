import React, { useContext, useState } from 'react';
import './AddNewPost.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Alert, CircularProgress } from '@mui/material';
import { url } from '../../config/url';


function AddNewPost() {

  const history = useHistory()
  const { jwt } = useContext(AuthContext);
  const [img, setImgFile] = useState('');
  const [title, setTitle] = useState('');
  const [discraption, setDiscraption] = useState('');
  const [loading, setLoading] = useState('');
  const [status, setStatus] = useState('');

  const onSubmit = async () => {
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
      console.log(e);
      setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
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
            <div className='all'>
              <div className='add-container'>
                <div className='form-container'>
                  <label>Add Image</label>
                  {img ?
                    <img className='imgOfnewPost' alt='Error' src={URL.createObjectURL(img)} />
                    :
                    <>
                      <label style={{ fontSize: "50px" }} for="file-upload" class="custom-file-upload">
                        +
                      </label>
                      <input id="file-upload" onChange={handleFileChange} type='file' />
                    </>
                  }
                  <label>Title</label>
                  <input required value={title} onChange={(e) => setTitle(e.target.value)} className='text-input' type='text' />
                  <label>Dicraptions</label>
                  <textarea required value={discraption} onChange={(e) => setDiscraption(e.target.value)} type='text' maxLength='1450' />
                  {
                    status ? <Alert style={{ fontSize: '20px', maxHeight: '50px', maxWidth: 'auto', marginBottom: "5px" }} className='alert' severity="error"> يحب اضافه جميع الحقول</Alert> : ''
                  }
                  <button className='post-button' onClick={onSubmit} type='submit'>نشر</button>
                </div>
              </div>
            </div>
          </>
      }
    </>

  );
}

export default AddNewPost