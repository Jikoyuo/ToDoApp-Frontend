import React from 'react';
import { Box, Typography } from '@mui/material';
import MyButton from '../small/MyButton';

const TodoTask = ({ text, checked, onClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#051956',
        color: 'white',
        borderRadius: '15px',
        maxHeight: '70px',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'row',
        gap: '15px',
        padding: '10px',
        alignItems: 'center',
        justifyContent: 'left',
        transition: 'all 0.3s ease-in-out', // Animasi saat berpindah
        opacity: checked ? 0.5 : 1,
        transform: checked ? 'translateY(20px)' : 'translateY(0)', // Animasi turun
      }}
    >
      <MyButton checked={checked} onClick={onClick} />
      <Typography
        sx={{
          textDecoration: checked ? 'line-through' : 'none'
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default TodoTask;
