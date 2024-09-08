import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const AddTaskModal = ({ open, handleClose, handleAddTask }) => {
    const [taskText, setTaskText] = useState('');
    const [taskType, setTaskType] = useState('low');

    const handleSubmit = () => {
        if (taskText.trim()) {
            handleAddTask(taskText, taskType);
            setTaskText('');
            setTaskType('low');
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    Add New Task
                </Typography>
                <TextField
                    fullWidth
                    label="Task"
                    variant="outlined"
                    margin="normal"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Task Type</InputLabel>
                    <Select
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        label="Task Type"
                    >z
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="urgent">Urgent</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add Task
                </Button>
            </Box>
        </Modal>
    );
};

export default AddTaskModal;
