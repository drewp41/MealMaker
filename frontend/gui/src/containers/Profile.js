import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


function Profile(props) {

    const history = useHistory();

    // Redirect the user back to the home page if they aren't logged in
    useEffect(() => {
        if (!props.isAuthenticated)
            history.push('/');
    }, [])

    return (
        <>
            <Header {...props} />
            <p style={{ fontSize: '30px' }}>Profile</p>
            <div style={{ height: '500px' }} />
            <Footer />
        </>
    )
}


export default Profile;