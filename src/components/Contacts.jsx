import React from 'react';
import { Link } from 'react-router-dom';

function Contacts({ contact_list, setUpChat }) {

    const showContactsList = (list) => {
        return (list.length) ? list.map(contactHtml) : showNoContacts()

    }

    const loadChat = (receiver) => {
        console.log('loading chat for ', receiver)
        setUpChat(receiver)
    }

    const showNoContacts = () => {
        return (
            <div>
                Your contacts is empty
            </div>
        )
    }

    const contactHtml = (contact, key) => {
        return (
            <Link to='/chat' key={key}>
                <div className='flex border-black' onClick={() => loadChat(contact)}>
                    <div className="contact__avatar ml-3 mr-3">
                        <img src={contact.url} alt={contact.name} className='rounded-full h-20 w-20'/>
                    </div>
                    <div className="contact__content">
                        <h2 className='ml-2 message__title text-left'>{contact.name}</h2>
                        <p className='message__peak text-left'>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="contact__stats flex flex-col">
                        <span className="message__time text-right"> 12:01 AM</span>
                        <span className="message__count text-right">41</span>
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <div className='app__contacts h-full p-2'>
            <h2 className='mb-3 mt-6'>My Contacts</h2>
            <div className="contacts__content h-full flex-col">

                {showContactsList(contact_list)}
            </div>
        </div>
    );
}

export default Contacts;