import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("authenticationToken");
        localStorage.removeItem('username')
        navigate('/')
    }

    return (
        <div className='nav'>
            <div className='nav-left'>
                <Link to='/'>Homepage</Link>
            </div>
            <div className='nav-right'>
            {localStorage.getItem("authenticationToken") && (
                <>
                    <p>You are signed in as {localStorage.getItem('username')}.</p>
                    <button onClick={logout}>Log out</button>
                </>
            )}
            {!localStorage.getItem('authenticationToken') && (
                <>
                    <Link to='/log-in'>Log in</Link>
                    <Link to='/sign-up'>Sign up</Link>
                </>
            )}
            </div> 
        </div>
    )
}