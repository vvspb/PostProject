import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';


export const Item = () => {
    const api = useApi();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [comments, setComments] = useState(null);
    const params = useParams();


    useEffect(() => {
        api.getPosts(params.itemID).
            then((data) => setItem(data));

       
    },[]);

    useEffect(()=>{
        api.getComment(params.itemID).
        then((data) => setComments(data));
    },)

    const handleComment = (event) => {
        event.preventDefault();
        const {
            target: { comment },
        } = event;

        api.addComment(item._id, { text: comment.value });

    };

    return (
        <Container maxWidth="1000" >
            <div>
                <Button variant="contained" style={{ marginBottom: '20px', marginLeft: '20px' }} onClick={() => navigate('/')} >Назад</Button>
            </div>

            <Paper elevation={2}>
                {item &&
                    <Grid container alignItems="flex-start" style={{ backgroundColor: 'GhostWhite', minHeight: '50vh', padding: '20px' }}  >
                        <Grid container item xs={6} spacing={2}>
                            <Grid item xs={12} >
                                <img
                                    src={`${item.image}?w=162&auto=format`}
                                    alt={item.title}

                                    style={{
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        maxHeight: 330,
                                        maxWidth: 400,
                                    }} />
                            </Grid>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={1}>
                                    <Avatar alt="author" src={item.author !== null && item.author.avatar !== null ? item.author.avatar : ''} />
                                </Grid>
                                <Grid container item direction="column" xs={6} >
                                    <Grid item >
                                        <Typography>{item.author?.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="text.secondary">{dayjs(item.created_at).format('MMMM D, YYYY')}</Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <form onSubmit={handleComment}>
                                <Grid container item xs={12} spacing={2} sx={{ marginTop: '5px', marginLeft: '5px' }}>
                                    <Grid item >
                                        <CommentIcon color="primary" />
                                    </Grid>
                                    <Grid item>
                                        <TextField name="comment" label="Комментарий" multiline rows={3} sx={{ width: '60ch' }} />
                                    </Grid>
                                </Grid>

                                <Grid item style={{ marginLeft: '100px', marginTop: '15px' }}>
                                    <Button type='submit' variant="contained" endIcon={<SendIcon />}>
                                        Отправить
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant="h4">{item.title}</Typography>
                            <Typography variant="body1" gutterBottom>{item.text}</Typography>

                            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                                {comments?.map((comment) => (
                                    <div key={comment._id}>
                                        <ListItem alignItems="flex-start"  >
                                            <ListItemAvatar>
                                                <Avatar alt='avatarComment' src={comment.author.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={comment.text}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ mt: 3 }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >

                                                            {dayjs(comment.created_at).format('MMMM D, YYYY h:mm A')}
                                                        </Typography>

                                                    </React.Fragment>
                                                }


                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </div>
                                ))}

                            </List>

                        </Grid>

                    </Grid>

                }
            </Paper>

        </Container>
    );
};