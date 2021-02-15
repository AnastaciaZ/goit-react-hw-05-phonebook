import React from 'react';
import s from '../Alert/Alert.module.css'

const AlertMessage = ({ message }) => (
   
        <div className={s.container}>
        <p className={s.textMessage}>{ message}</p>
    </div>  
    
);

export default AlertMessage;