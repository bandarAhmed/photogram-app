import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './postImg.css'
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function PostImg() {

    const [title, setTitle] = useState('');
    const [discraption, setDiscraption] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [avatar, setAvatr] = useState('');
    // const [dalog, setDalog] = useState(false);
    // const [loading, setLoading] = useState(false);
    const [liked, setLike] = useState(false);
    const [coutlikes, setLikeCount] = useState();
    const [id, setId] = useState('');
    const [_id, set_Id] = useState('');
    
    const { postId, jwt } = useContext(AuthContext);
    const history = useHistory()

    useEffect(() => {
        getData()
        coutlike()
        getId()
    }, [liked, coutlikes, id]);

    if (postId !== undefined) {
        localStorage.setItem('postId', postId);
    }
    const git = localStorage.getItem('postId');

    const putLike = async () => {
        try {
            const like = await axios.post(`http://localhost:4000/post/${git}/like`, null, {
                headers: {
                    Authorization: jwt
                }
            })
            setLike(true)
        } catch (e) {
            console.error(e)
        }
    }

    const coutlike = async () => {
        const like = await axios.get(`http://localhost:4000/post/${git}/cointlike`)
        setLikeCount(like.data.length)
    }
    const getData = async () => {
        try {
            // setLoading(true)
            const posts = await axios.get(`http://localhost:4000/post/${git}/get-post`)
            setName(posts.data.data.author.name)
            setImages(posts.data.data.img)
            setAvatr(posts.data.data.author.avatar)
            setDiscraption(posts.data.data.discraption)
            setTitle(posts.data.data.title)
            // setLoading(false)
            setId(posts.data.data.author._id)
            console.log(posts.data.data.author._id)
        } catch (e) {
            console.log(e)
            // setLoading(false)
        }
    }

    const getId = async ()=> {
        try {
            const user_d = await axios.get(`http://localhost:4000/post/findId`, {
                headers: {
                    Authorization: jwt
                }
            })
            set_Id(user_d.data.author._id)
            console.log(user_d.data.author._id)
        } catch (e) {
            console.log(e)
        }
    }
    const deletePost = async () => {
        try {
            // setLoading(true)
            if(id == _id){ 
                await axios.delete(`http://localhost:4000/post/${git}/delete`,{
                    headers:{
                        Authorization: jwt
                    }
                })
                history.push('/account/update')
            }else if( id != _id){
                return 0
            }
        } catch (e) {
            console.log(e)
            // setLoading(false)
        }
    }

    return (
        <>
            <div className='background'>
                <div className='nav-card'>
                    <CardHeader
                        avatar={
                            <Avatar src={avatar} aria-label="recipe"></Avatar>
                        }
                        title={name}
                    />
                    <Button style={{position: 'absolute', right: '0', top: '4%', fontSize: "40px"}} onClick={() => history.push("/timesheet")}
                    ><i className="fa fa-arrow-circle-o-right"></i></Button>
                </div>
                <Card sx={{ width: '100%', marginRight: "100px", marginLeft: "100px", marginTop: '72px', maxHeight: 'auto', background: "black", color: 'white', border: '1px white solid' }}>
                    <CardMedia
                        onDoubleClick={putLike}
                        style={{ width: "100%", objectFit: 'cover' }}
                        component="img"
                        height="720"
                        image={images}
                        alt="Error"
                    />
                    <CardActions disableSpacing>
                        <IconButton onClick={ putLike} aria-label="like">
                            {
                                liked ? <FavoriteIcon style={{ color: 'red' }} />
                                    : <FavoriteIcon style={{ color: 'white' }} />
                            }
                            <p style={{ color: 'white', margin: '2px' }}>{coutlikes}</p>
                        </IconButton>
                        <Button onClick={() => history.push('/update/post')} variant="outlined" size="small" style={{ position: 'absolute', right: '120px' }}>
                            Edit My Post</Button>
                    </CardActions>
                    {
                        id == _id ? <DeleteIcon onClick={deletePost} fontSize="small" size="small" style={{ position: 'absolute', right: '120px', cursor: 'pointer' }} />
                        : ''
                    }
                       
                    
                    <CardContent>
                        <Typography variant="h6" fontSize={'30px'} color="blcak">
                            {title}
                        </Typography>
                    </CardContent>
                    <CardContent style={{ whiteSpace: 'pre-line' }}>
                        <Typography variant="body1" fontSize={'30px'}>
                            {discraption}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default PostImg