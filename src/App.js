import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Logo from './components/Logo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Info } from './components/Info';
import { Body } from './components/Body';
import { Item } from './components/Item';
import { CreatePost } from './components/CreatePost';
import CustomModal from './components/CustomModal';
import FormModal from './components/FormModal';
import { useApi } from './hooks/useApi';

import ModalContext from './contexts/modalContext'
import UserContext from './contexts/userContext';
import FormModalContext from './contexts/formModalConext';
import VariantContext from './contexts/variantContext';
import PostContext from './contexts/postContext';

import './index.css';
import { EditUser } from './components/EditUser';
import { EditPost } from './components/EditPost';


export const App = () => {
    const api = useApi();
    const [user, setUser] = useState("?")
    const [modalState, setModalState] = useState({ isOpen: false, msg: null, });
    const [modalFormState, setModalFormState] = useState({ isOpen: false, msg: null, })
    const [post, setPost] = useState(null);
    useEffect(() => {
        api.getUser()
            .then((data) => setUser(data))
    }, [])
    const [variant, setVariant] = useState(true);
    return (
        <ModalContext.Provider value={{ modalState, setModalState }}>
            <FormModalContext.Provider value={{ modalFormState, setModalFormState }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <VariantContext.Provider value={{ variant, setVariant }}>
                        <PostContext.Provider value ={{post, setPost}}>
                        <div className='appContainer'>
                            <Header>
                                <Logo />
                                <Info name={user?.name} about={user?.about} avatar={user?.avatar} />
                            </Header>
                            <CustomModal />
                            <FormModal />
                            <Routes>
                                <Route path="/" element={<Body />} />
                                <Route path="posts/:itemID" element={<Item />} />
                                <Route path="posts/create" element={<CreatePost />} />
                                <Route path='user/edit' element={<EditUser />} />
                                <Route path="posts/edit/:itemID" element = {<EditPost/>}/>
                            </Routes>
                            <Footer />
                        </div >
                        </PostContext.Provider>
                    </VariantContext.Provider>
                </UserContext.Provider>
            </FormModalContext.Provider>
        </ModalContext.Provider>
    );
};
