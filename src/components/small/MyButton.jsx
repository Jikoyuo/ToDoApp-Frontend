import React from 'react';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function MyButton({ checked, onClick }) {
    return (
        <IconButton onClick={onClick} color="primary">
            {checked ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
    );
}

export default MyButton;
