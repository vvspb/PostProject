import React, { useEffect, useState } from 'react';

import api from './utils/Api';

import Logo from './components/Logo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Info } from './components/Info';
import { Body } from './components/Body';
import { CreatePost } from './components/CreatePost';


import { Routes, Route, Link } from "react-router-dom";

import './index.css';
import { Item } from './components/Item';


export const App = () => {

    const [user, setUser] = useState("?")

    useEffect(() => {
        api.getUser()
            .then((data) => setUser(data))
    }, [])

    return (

        <div className='appContainer'>
            <Header>
                <Logo />
                <Info name={user?.name} about={user?.about} avatar={user?.avatar} />
            </Header>
        
                <Routes>
                    <Route path="/" element={<Body user={user} />} />
                    <Route path="posts/:itemID" element={<Item />} /> 
                    <Route path="posts/create" element={<CreatePost />} />
                </Routes>
            
            <Footer />
        </div >
    );
};
