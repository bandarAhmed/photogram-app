import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import './updatePost.css';
import { url } from '../../config/url';

function UpdatePost() {
  const [title, setTitle] = useState('');
  const [discraption, setDiscraption] = useState('');
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(false);

  const { jwt, postId } = useContext(AuthContext);
  const history = useHistory()

  if (postId !== undefined) {
    sessionStorage.setItem('postId', postId);
  }
  const git = sessionStorage.getItem('postId', postId)

  const UpdateData = async () => {
    const data = new FormData()
    data.append('title', title)
    data.append('discraption', discraption)

    try {
      setLoading(true)
      await axios.put(url + `post/${git}/update`, data, {
        headers: {
          Authorization: jwt,
        },
      }).then(res => console.log(res))
      setLoading(false)
      history.push('/account/update')
    } catch (e) {
      setLoading(false)
    }
  }
  useEffect(() => {
    getPostData()
  }, []);

  const getPostData = async () => {
    try {
      setLoading(true)
      const getPost = await axios.get(url + `post/${git}/get-post`)
      setTitle(getPost.data.data.title);
      setDiscraption(getPost.data.data.discraption);
      setImages(getPost.data.data.img);
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
            <div className='alll'>
              <div className='add-containerr'>
                <div className='form-containerr'>
                  <Button style={{ position: 'absolute', right: '1%', top: '3%', fontSize: "40px" }} onClick={() => history.push("/timesheet")}
                  ><i className="fa fa-arrow-circle-o-right"></i></Button>
                  <label>Image</label>
                    <img alt='Error' className='imgOfnewPost' src={images} />
                  <label>Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className='text-inputt' type='text' placeholder='قم بتعديل عنوان الصوره' />
                  <label>Dicraptions</label>
                  <textarea value={discraption} onChange={(e) => setDiscraption(e.target.value)} type='text' maxLength='1450' placeholder='قم بتعديل وصف الصوره'/>
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