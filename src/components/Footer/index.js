import React from 'react';
import './index.css';
import telegram from '../../../public/assets/svg/telegram.svg';
import instagram from '../../../public/assets/svg/instagram.svg';
import viber from '../../../public/assets/svg/viber.svg';
import whatsapp from '../../../public/assets/svg/whatsapp.svg';
import vk from '../../../public/assets/svg/vk.svg';
import Logo from '../Logo';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer__wrapper'>
                    <div className='footer__col'>
                        <Logo className='logo footer__logo' href='#' title='Логотип' />
                        <p className='footer__copyright'>© «post-news»</p>
                    </div>
                    <div className='footer__col'>
                        <nav className='menu-bottom'>
                            <a href='/catalogue' className='menu-bottom__item'>
                                Посты
                            </a>
                            <a href='/catalogue' className='menu-bottom__item'>
                                Новости
                            </a>
                        </nav>
                    </div>
                    <div className='footer__col'>
                        <nav className='menu-bottom'>
                            <a href='/catalogue' className='menu-bottom__item'>
                                Часто спрашивают
                            </a>
                            <a href='/catalogue' className='menu-bottom__item'>
                                Обратная связь
                            </a>
                            <a href='/catalogue' className='menu-bottom__item'>
                                Контакты
                            </a>
                        </nav>
                    </div>
                    <div className='footer__col'>
                        <div className='contacts'>
                            <p className='contacts__title'>Мы на связи</p>
                            <a className='contacts__tel contacts__link' href='tel:89992457565'>
                                8 (999) 245-75-65
                            </a>
                            <a className='contacts__mail contacts__link' href='mailto:hordog.ru@gmail.com'>
                                all-posts@gmail.com
                            </a>
                            <ul className='socials contacts__socials'>
                                <li className='socials__item'>
                                    <a className='socials__link' href='/#'>
                                        <img src={telegram} alt='telegram' className='socials__icon' />
                                    </a>
                                </li>

                                <li className='socials__item'>
                                    <a className='socials__link' href='/#'>
                                        <img src={whatsapp} alt='whatsapp' className='socials__icon' />
                                    </a>
                                </li>
                                <li className='socials__item'>
                                    <a className='socials__link' href='/#'>
                                        <img src={viber} alt='viber' className='socials__icon' />
                                    </a>
                                </li>
                                <li className='socials__item'>
                                    <a className='socials__link' href='/#'>
                                        <img src={instagram} alt='instagram' className='socials__icon' />
                                    </a>
                                </li>
                                <li className='socials__item'>
                                    <a className='socials__link' href='/#'>
                                        <img src={vk} alt='vk' className='socials__icon' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
