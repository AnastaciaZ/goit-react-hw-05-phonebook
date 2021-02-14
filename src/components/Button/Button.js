import React from 'react';
import s from '../Button/Button.module.css';


const Button = ({ label, type = 'button', onClick = () => null }) => (
  <button className={s.button} type={type} onClick={onClick}>
    {label}
  </button>
);

export default Button;