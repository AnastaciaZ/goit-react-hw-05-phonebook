import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter';
import AlertMessage from './components/Alert/Alert';
import stylesFilter from './components/Filter/Filter.module.css';
import styleAlert from './components/Alert/Alert.module.css';
import s from './App.module.css';
import shortid from 'shortid';
import Logo from './components/Logo/Logo';

class App extends React.Component {
  state = {
    contacts: [
                { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
                {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
                {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
                { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ],
    filter: '',
    error: false,
  };
 
  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    
    if (contact.name === '') { 
      alert('Please enter contact name');
      return;
    }
    if (contact.number === '') { 
      alert('Please enter contact number');
      return;
    }
   
    const hasContact = this.state.contacts.some(
      (contact) => contact.name === name
    );
    
    hasContact
     ? this.setState({ error: true }) || setTimeout(() => {
        this.setState({ error: false });
      }, 2500)
      :this.setState((prevState) => ({
        contacts: [contact, ...prevState.contacts],
      }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));

  };

  componentDidMount() { 
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    
    if (parsedContacts) { 
        this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) { 

    if (this.state.contacts !== prevState.contacts) { 

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
 
 
  render() {
    const filterContacts = this.getFilterContacts();
       
    return (
      
      <div>
        <Logo /> 
        <div className={s.container}>
          <ContactForm onSubmit={ this.addContact}/>

          <CSSTransition
            in={this.state.contacts.length >= 2}
            timeout={250}
            classNames={stylesFilter}
            unmountOnExit>
            <Filter value={this.state.filter} onChangeFilter={this.changeFilter}/>
          </CSSTransition>
          
          <ContactList
            contacts={filterContacts}
            onDelete={this.deleteContact}
          />
        </div>
        <CSSTransition
          in={this.state.error}
          timeout={250}
          classNames={styleAlert}
          unmountOnExit>
          <AlertMessage/>
        </CSSTransition>
      </div>
     
      );
  };  
};

export default App;
