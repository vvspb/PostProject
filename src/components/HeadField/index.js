import React, { useContext } from 'react';
import { ButtonPost } from '../Button';

import {Card, Button, Typography }from '@mui/material';

import './index.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/userContext';

export const HeadField = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

   
    return (
        <div className='cardHead'>
            <Card>
                <Typography variant='h4' sx={{ padding: 5 }}>
                    Добро пожаловать на мою страничку
                </Typography>
               
                <div className='btnCont'>
                    <ButtonPost/>
                </div>
            </Card>
        </div>
    )
}
