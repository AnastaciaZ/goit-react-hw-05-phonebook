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
    contacts:[],
    filter: '',
    error: false,
    message: '',
  };
 
  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    
    if (contact.name === '') { 

     this.setState({ error: true, message: 'Please enter contact name' }) || setTimeout(() => {
        this.setState({ error: false });
      }, 2000)

      return;
    }
    if (contact.number === '') { 
      
      this.setState({ error: true, message: 'Please enter contact number' }) || setTimeout(() => {
        this.setState({ error: false });
      }, 2000)

      return;
    }
   
    const hasContact = this.state.contacts.some(
      (contact) => contact.name === name
    );
    
    hasContact
     ? this.setState({ error: true, message: 'This name is already in contacts!' }) || setTimeout(() => {
        this.setState({ error: false });
      }, 2000)
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
    const {contacts, filter, error, message } = this.state;
       
    return (
      
      <div>
        <Logo /> 
        <div className={s.container}>
          <ContactForm onSubmit={ this.addContact}/>

         <CSSTransition
            in={contacts.length >= 2}
            timeout={250}
            classNames={stylesFilter}
          unmountOnExit>
            
            <Filter
              value={filter}
              onChangeFilter={this.changeFilter} />
            
            </CSSTransition>
          
          {contacts.length > 0 && <ContactList
            contacts={filterContacts}
            onDelete={this.deleteContact}
          />}
        </div>
        <CSSTransition
          in={error}
          timeout={250}
          classNames={styleAlert}
          unmountOnExit>
          <AlertMessage message={ message}/>
        </CSSTransition>
      </div>
     
      );
  };  
};

export default App;
