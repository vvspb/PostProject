import React from 'react';
import { Button } from '../Button';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import './index.css'

export const HeadField = () => {
    return (
        <div className='cardHead'>
            <Card>
                <Typography variant='h4' sx={{ padding: 5 }}>
                    Добро пожаловать на мою страничку
                </Typography>
                <div className='btnCont'>
                    <Button/>
                </div>
            </Card>
        </div>
    )
}
