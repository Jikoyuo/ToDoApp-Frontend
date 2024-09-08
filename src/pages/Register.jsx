import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { Button, TextField, Typography, Container, CssBaseline } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axiosInstance.post('/registrasi', {
                username,
                password
            });
            console.log(response.data);
            setMessage('Registration successful, redirecting to login...');
            // Redirect to login page
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds to allow user to see the message
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setMessage('Error registering user');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Register</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                >
                    Register
                </Button>
                {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
            </div>
        </Container>
    );
};

export default Register;
