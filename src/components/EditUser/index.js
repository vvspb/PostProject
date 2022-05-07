import React, { useContext, useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';

import UserContext from '../../contexts/userContext';

import { Grid, Typography, TextField, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

export const EditUser = () => {
    const api = useApi();
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);

    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');

    const handleClick = () => {
        api.editCurentUser({ name: userName, about: userAbout })
            .then((data) => {
                setUser(data);
            })
            .catch((err) => alert(err));
        navigate('/')
    };

    const handleClickBack = () => {
        navigate('/')
    };

    useEffect(() => {
        // if (user) {
        //     setUserName(user.name);
        //     setUserAbout(user.about);
        // }
        user && setUserName(user.name);
        user && setUserAbout(user.about);
        // setUserName(user?.name)
        // setUserAbout(user?.about)
    }, [user]);

    return (
        <Grid container flexDirection='column' spacing='10' margin='30px'>
            <Grid item>
                <Typography variant='h3'>Редактировать пользователя </Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Имя'
                    variant='outlined'
                    value={userName}
                    onChange={({ target }) => {
                        setUserName(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Доп.Информация'
                    variant='outlined'
                    value={userAbout}
                    onChange={({ target }) => {
                        setUserAbout(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <Button onClick={handleClick} variant='contained' color='primary' size='small'>
                    Сохранить
                </Button>

            </Grid>
        </Grid>
    );
};