import React from 'react';
import { CSSTransition } from 'react-transition-group';
import srtyles from '../Logo/Logo.module.css';

const Logo = () => (
    <CSSTransition
        in={true}
        appear={true}
        timeout={ 500}
        classNames={srtyles}
        >
    <header>
        <h1 className={srtyles.logo}>Phonebook</h1>
    </header>
       </CSSTransition>
);

export default Logo;