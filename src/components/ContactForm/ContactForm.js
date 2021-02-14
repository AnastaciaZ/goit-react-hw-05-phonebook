import React from 'react';
import shortid from 'shortid';
import Button from '../Button/Button';
import s from '../ContactForm/ContactForm.module.css';

class ContactForm extends React.Component { 
    state = {
        name: '',
        number: '',
    };
    nameInputId = shortid.generate();

    handleChange = event => {
    const { name,value } = event.currentTarget;
    this.setState({ [name]: value });
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.name, this.state.number);
        this.reset();
    };
    reset = () => { 
        this.setState({name: '', number: ''});
        };

    render() { 
        return (
            <form className={ s.contactsForm} onSubmit={this.handleSubmit}>
                <label htmlFor={this.nameInputId} className={ s.labelForm}>  
                    Name
           <br />
                    <input
                    className={ s.contactInput}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                        id={this.nameInputId} />
                </label>
                <br/>
                <label className={ s.labelForm}>
                    Number
                     <br />
            <input
                    className={ s.contactInput}
                    type="text"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange} />
                </label>
                <br />
                <Button label="Add contact" type="submit"/>
                </form>
        );
    };
};

export default ContactForm;