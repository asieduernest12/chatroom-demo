import React from 'react';

function About(props) {
    return (
        <div className='flex flex-col p-3 h-full justify-center'>
            <h2>
                About this app
            </h2>

            <p  className='mt-3 mb-3'>This app implements a secure messaging feature by utilizing a backend to demonstrate sending and recieving secured messages</p>

            <div className="about__contributors">
                <div className="about__contributor">
                    <h3>Satya</h3>
                    <figcaption>Student</figcaption>
                </div>
            </div>
        </div>
    );
}

export default About;