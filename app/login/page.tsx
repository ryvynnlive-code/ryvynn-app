import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleLogin = () => {
        if (isAnonymous) {
            // logic for anonymous login
            console.log('Logged in as anonymous user');
        } else {
            // logic for email login
            console.log(`Logged in with email: ${email}`);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={() => setIsAnonymous(!isAnonymous)}
                    />
                    Anonymous Login
                </label>
            </div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;