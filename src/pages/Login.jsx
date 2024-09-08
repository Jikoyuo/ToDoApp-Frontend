import React, { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/login', {
                username,
                password
            });

            if (response.status === 202) {
                // Extract username from response
                const { username: loggedInUsername } = response.data;

                // Set username state with the username obtained from login
                setUsername(loggedInUsername);

                // Navigate to the ToDoList page with the username
                navigate(`/todolist/${loggedInUsername}`);
            } else {
                setMessage(response.data.message || 'Login failed');
            }
        } catch (error) {
            setMessage('Error: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ marginTop: 2 }}
            >
                Login
            </Button>
            {message && <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>{message}</Typography>}
        </Container>
    );
};

export default Login;
