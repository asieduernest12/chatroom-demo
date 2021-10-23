import React from 'react';

function Contacts({ contact_list }) {

    const showContactsList = (list) => {
        return (list.length) ? list.map(contactHtml) : showNoContacts()

    }

    const showNoContacts = () => {
        return (
            <div>
                Your contacts is empty
            </div>
        )
    }

    const contactHtml = (contact,key) => {
        return (
            <div className='flex' key={key}>
                <span className="contact__avatar w-1/3">
                    <img src={contact.url} alt={contact.name} />
                </span>
                <h2 className='ml-2'>{contact.name}</h2>
            </div>
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