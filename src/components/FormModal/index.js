import React, { useState, useContext } from 'react';

import FormModalContext from '../../contexts/formModalConext';
import UserContext from '../../contexts/userContext';
import Logo from '../Logo';

import { useApi } from '../../hooks/useApi';

import { TextField, Modal, Typography, Button, Box, Grid } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import VariantContext from '../../contexts/variantContext';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
        legendary: {
            main: '#0d9c49',
        }
    },
});

export default function FormModal() {

    const { variant, setVariant } = useContext(VariantContext);
    const { setUser } = useContext(UserContext);
    const { modalFormState, setModalFormState } = useContext(FormModalContext);

    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const api = useApi();

    // const handleClose = () =>
    //     setModalFormState(() => {
    //         return { isOpen: false, msg: null };
    //     });

    const handleNameChange = ({ target }) => {
        setName(target.value);
    };
    const handleAbouteChange = ({ target }) => {
        setAbout(target.value);
    };

    const handleEmailChange = ({ target }) => {
        setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value);
    };

    const signUp = () => {
        api.signUp({ name, about, email, password })
            .then((createdUser) => {
                return api.signIn({ email, password });
            })
            .then((signedInUser) => {
                const { token, data } = signedInUser;
                localStorage.setItem('token', JSON.stringify(token));
                setUser(data);
                setModalFormState(() => {
                    return {
                        isOpen: false,
                        msg: null,
                    };
                });
            });
    };

    const signIn = () => {

        api.signIn({ email, password })
            .then((signedInUser) => {
                const { token, data } = signedInUser;
                localStorage.setItem('token', JSON.stringify(token));
                setUser(data);
                setModalFormState(() => {
                    return {
                        isOpen: false,
                        msg: null,
                    };
                });
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <Modal open={modalFormState.isOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button fullWidth variant='contained' color='primary' size='small' onClick={() => setVariant(true)}>
                                Регистрация
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant='contained' color="secondary" size='small' onClick={() => setVariant(false)}>
                                Логин
                            </Button>
                        </Grid>

                        {variant ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <br />
                                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                                        Введите ваши данные
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Ваше имя' variant='outlined' required value={name} onChange={handleNameChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Ваш род деятельности' variant='outlined' required value={about} onChange={handleAbouteChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Ваш e-mail' variant='outlined' required value={email} onChange={handleEmailChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label='Password'
                                        type='password'
                                        variant='outlined'
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' color='primary' size='small' onClick={signUp}>
                                        Зарегестрироваться
                                    </Button>
                                </Grid>
                            </Grid>) : (
                            <Grid container spacing={2}>
                               
                                <Grid item xs={12} display='flex' justifyContent='center' marginTop='30px'>
                
                                    <Logo />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                                        Введите ваши данные
                                    </Typography>
                                </Grid>
                               
                                <Grid item xs={12}>
                                    <TextField fullWidth label='Ваш e-mail' variant='outlined' required value={email} onChange={handleEmailChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label='Password'
                                        type='password'
                                        variant='outlined'
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' color='primary' size='small' onClick={signIn}>
                                        Войти
                                    </Button>
                                </Grid>
                            </Grid>)
                        }

                    </Grid>
                </Box>
            </Modal>
        </ThemeProvider>
    );
}
