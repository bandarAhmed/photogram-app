import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import './updatePost.css';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [discraption, setDiscraption] = useState('');
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const { jwt, postId } = useContext(AuthContext);
  const history = useHistory()

  if (postId !== undefined) {
    sessionStorage.setItem('postId', postId);
}
const git = sessionStorage.getItem('postId', postId)

  const UpdateData = async () => {
    const data = new FormData()
    data.append('upimg',images)
    data.append('title',title)
    data.append('discraption',discraption)
        
    try {
        setLoading(true)
        await axios.put(`http://localhost:4000/post/${git}/update`, data, {
          headers: {
            Authorization: jwt,
          },
        }).then(res=> console.log(res))
        setLoading(false)
        history.push('/account/update')
    } catch (e) {
        console.log(e)
        setLoading(false)
    }
}
  const handleFileChange = (e)=> {
    const file = e.target.files[0]
    setImages(file)
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
          <div className='alll'>
            <div className='add-containerr'>
              <div className='form-containerr'>
                <label>Add Image</label>
                  <input className='imgFilee' onChange={handleFileChange} type='file' />
                <label>Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className='text-inputt' type='text' />
                <label>Dicraptions</label>
                <textarea value={discraption} onChange={(e) => setDiscraption(e.target.value)} type='text' />
                <button className='edit-button' onClick={UpdateData} type='submit'>تعديل</button>
              </div>
            </div>
          </div>
        </>
    }
  </>
  )
}

export default UpdatePost