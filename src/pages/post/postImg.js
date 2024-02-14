import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './postImg.css'
import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { url } from '../../config/url';



function PostImg() {

    const [title, setTitle] = useState('');
    const [discraption, setDiscraption] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatr] = useState([]);
    const [liked, setLike] = useState();
    const [createAtt, setCreateAtt] = useState([]);
    const [coutlikes, setLikeCount] = useState('');
    const [id, setId] = useState('');
    const [_id, set_Id] = useState('');
    const [loading, setLoading] = useState(false);

    const { postId, jwt } = useContext(AuthContext);
    const history = useHistory()

    useEffect(() => {
        getData();
        coutlike();
        getId();
    }, [liked, coutlikes, id, _id]);


    if (postId !== undefined) {
        localStorage.setItem('postId', postId);
    }
    const git = localStorage.getItem('postId');

    const putLike = async () => {
        try {
            await axios.post(`http://localhost:4000/post/${git}/like`, null, {
                headers: {
                    Authorization: jwt
                }
            }).then(res => res.data.message === 'LIke add it seeccesfuly' ? setLike(true) : setLike(false))

        } catch (e) {
            console.log(e)
        }
    }

    const coutlike = async () => {
        const like = await axios.get(`http://localhost:4000/post/${git}/cointlike`)
        setLikeCount(like.data.length)
    };


    const getData = async () => {
        try {
            const posts = await axios.get(`http://localhost:4000/post/${git}/get-post`)
            setName(posts.data.data.author.name)
            setImages(posts.data.data.img)
            setAvatr(posts.data.data.author.avatar)
            setDiscraption(posts.data.data.discraption)
            setTitle(posts.data.data.title)
            setId(posts.data.data.author._id)
            setCreateAtt(posts.data.data.createdAt.replaceAll('-', ' ').substring(0, 9))
        } catch (e) {

        }
    }

    const getId = async () => {
        try {

            const user_d = await axios.get(url + `post/findId`, {
                headers: {
                    Authorization: jwt
                }
            })
            set_Id(user_d.data.author._id)
        } catch (e) {

        }
    }
    const deletePost = async () => {
        try {
            setLoading(true)
            if (id === _id) {
                await axios.delete(url + `post/${git}/delete`, {
                    headers: {
                        Authorization: jwt
                    }
                })
                history.push('/account/update')
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
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
                    }} /> :
                    <>
                        <div className='centerBack'>
                            <div className='background'>
                                <div className='name-img'>
                                    <img src={avatar} />
                                    <Button style={{ position: 'absolute', right: '1%', top: '1.5%', fontSize: "20px" }} onClick={() => history.push("/timesheet")}>Posts<i className="fa fa-arrow-circle-o-right"></i></Button>
                                    <p style={{ color: 'white' }}>{name}</p>
                                </div>
                                <div className='posts'>
                                    <img onDoubleClick={() => putLike()} src={images} />
                                    <div className='like-edit'>
                                        <CardActions>
                                            <IconButton onClick={() => putLike()} aria-label="like">
                                                {
                                                    liked ? <FavoriteIcon style={{ color: 'red' }} />
                                                        : <FavoriteIcon style={{ color: 'white' }} />
                                                }
                                                <p style={{ color: 'white', margin: '2px'}}>{coutlikes}</p>

                                            </IconButton>
                                            <p style={{ color: 'white', position: 'absolute', top: '55%' }}>{createAtt}</p>
                                            {
                                                id === _id ? <Button  className='mobile-botten' onClick={() => history.push('/update/post')} variant="outlined" size="auto" style={{ position: 'absolute', right: '10px', color: 'white', border: 'white solid ', fontSize: 'auto' }}>
                                                    Edit My Post</Button>
                                                    : ''
                                            }
                                        </CardActions>
                                        {
                                            id === _id ? <DeleteIcon onClick={deletePost} fontSize="small" size="small" style={{ position: 'absolute', right: '10px', cursor: 'pointer', color: 'white' }} />
                                                : ''
                                        }
                                    </div>
                                    <h2 style={{ color: 'white' }}>{title}</h2>
                                    <h4 style={{ color: 'white' }}>{discraption}</h4>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default PostImg