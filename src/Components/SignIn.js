import React, { useState } from 'react';
import '../Styles/signIn.css';

const SignIn = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {

        if (username.trim() === '' || password.trim() === '') {
            setMessage('Please fill all the fields');
            return;
        }
        else {
            setMessage(''); // Reset the error message when both fields are not empty
        }


        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                onLogin();
            } else {
                setMessage('Please fill correct details');
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="signIn-container">
            <div className='main-background'>
                <div className='line'></div>
            </div>
            <div className='form'>
                <p>Welcome back! 👋</p>
                <h1>Sign in to your account</h1>
                <label>
                    Username
                    <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button onClick={handleLogin}>CONTINUE</button>
                <br />
                <div className="invalid">
                    {message && <p>{message}</p>}
                </div>
                <p className='reset-password'>Forget your password?</p>
            </div>
            <div className="signUp-text">
                <p>Don’t have an account? <span>Sign up</span></p>
            </div>
        </div>
    );
};
export default SignIn;