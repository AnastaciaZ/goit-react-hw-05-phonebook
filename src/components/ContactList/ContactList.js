import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from '../Button/Button';
import s from '../ContactList/ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
    return (
        <TransitionGroup component="ul">
            {contacts.map(({ id, name, number }) => (
                <CSSTransition key={id} timeout={250} classNames={s}>
                    <li className={s.contactList} /*key={id}*/ id={ id}>
                        <p className={s.contactText}>{name}</p>
                        <p className={s.contactText}>{number}</p>
                        <Button label="Delete" onClick={() => onDelete(id)} />
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

export default ContactList;
