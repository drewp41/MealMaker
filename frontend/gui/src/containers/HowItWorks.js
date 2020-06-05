import React from 'react';
import Header from './Header';
import Footer from './Footer';


function HowItWorks(props) {
    console.log(props);
    return (
        <>
            <Header {...props} />
            <p style={{ fontSize: '30px' }}>How It Works</p>
            <div style={{ height: '500px' }} />
            <Footer />
        </>
    )
}


export default HowItWorks;