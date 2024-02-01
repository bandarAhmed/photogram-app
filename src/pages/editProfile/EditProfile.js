import React, { useContext, useEffect, useState } from 'react';
import './editProfile.css';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { Storage } from '@capacitor/storage';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import imagess from '../../components/images/Annotation 2024-01-23 201729.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

function EditProfile() {

    const [password, setPassword] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatr] = useState('');
    const [dalog, setDalog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postId, setPostId] = useState('');

    const history = useHistory()
    const { jwt } = useContext(AuthContext);


    useEffect(() => {
        getData()
    }, [])
    const updatePro = async () => {
        const data = {
            name,
            password,
            avatar
        }
        try {
            setDalog(true)
            setLoading(true)
            const res = await axios.put('http://localhost:4000/account/update', data, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => console.error(res))
            Storage.remove({
                key: "accessToken"
            })

            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    const handelClose = () => {
        setDalog(false)
    }
    const getData = async () => {
        try {
            setLoading(true)
            const posts = await axios.get('http://localhost:4000/get-my-post',
                {
                    headers: {
                        Authorization: jwt
                    }
                })
            const getPost = posts.data.data.map(item => item.img)
            setName(posts.data.data[0].author.name)
            setImages(getPost)
            setAvatr(posts.data.data[0].author.avatar)
            setLoading(false)

        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    
    const handleClick = async (index)=>{
        const response = await axios.get('http://localhost:4000/get-all-post')
        setPostId(response.data.data[index]._id)
        history.push('/post/get-post')
        console.log(response.data.data[0]._id)
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
                    }}/>
                    :
                    <>
                        <Dialog
                            open={dalog}
                            // TransitionComponent={Transition}
                            keepMounted
                            onClose={handelClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>{"انت على وشك تعديل بياناتك"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    هل تود المتابعه؟
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={{ button: "cansel" }}>لا</Button>
                                <Button onClick={() => history.push('/login')}>موافق</Button>
                            </DialogActions>
                        </Dialog>
                        <div className='edit-profile'>
                            <div className='form'>
                                <img src={avatar} className='edit-img' alt='error' />
                                <div className='edit-form'>
                                    <input placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
                                    <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button onClick={updatePro} className='sub-button' type='sumet'>Edit</button>
                            </div>
                        </div>
                        <div className='img-continner'>
                            <div className='img-form'>
                                {
                                    images.map((img, index) => (
                                        <img onClick={()=> handleClick(index)} src={img} key={index} />
                                    )).reverse()
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default EditProfile