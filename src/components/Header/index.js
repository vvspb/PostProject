import React from 'react';
//import { ButtonClick } from '../Button';
import style from './style.module.css';



export const Header = ({children}) => {
  
    return (
        <div className={style.header}>
            <div className="container">
                <div className={style.header__wrapper}>
                {children}
                </div>
            </div>
        </div>
    );
};
