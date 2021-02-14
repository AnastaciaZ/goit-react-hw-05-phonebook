import React from 'react';
import s from '../Alert/Alert.module.css'

const AlertMessage = () => (
   
        <div className={s.container}>
        <p className={s.textMessage}>This name is already in contacts!</p>
    </div>  
    
);

export default AlertMessage;