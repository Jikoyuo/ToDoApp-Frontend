import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const { username } = useParams();

    useEffect(() => {
        if (!username) return; // If no username, do nothing

        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/tasks/get/${username}`);
                // console.log('Task: ', response.task)
                console.log('Fetched tasks:', response); 
                // console.log('Response data:', response.data); // Add this line to log the response data
                // console.log('Response data length:', response.data.length); // Add this line to log the length of the response data
                // console.log('Response headers:', response.headers); // Add this line to log the response headers

                setTasks(response.data);
                console.log(tasks);
                
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [username]);



    const handleAddTask = async () => {
        try {
            const response = await axios.post(`/tasks/add/${username}`, { task: newTask });
            if (response.status === 201) {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setNewTask("");
                location.reload();
            } else {
                console.error('Failed to add task:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding task:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditTask = async () => {
        try {
            const response = await axios.put(`/tasks/edit/${editTask.id}`, { task: editTask.task });
            if (response.status === 200) {
                location.reload();
                setTasks(prevTasks => prevTasks.map(task => task.id === editTask.id ? response.data : task));
                setOpenEditDialog(false);
                setEditTask(null);
            } else {
                console.error('Failed to edit task:', response.data.message);
            }
        } catch (error) {
            console.error('Error editing task:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`/tasks/delete/${taskId}`);
            if (response.status === 200) {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            } else {
                console.error('Failed to delete task:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container
        sx={{
            marginTop:'50px'
        }}
        >
            <Typography sx={{fontSize:'24px', fontWeight:'bold'}}>
                Halo, {username}
            </Typography>
            <TextField
                label="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
            >
                Add Task
            </Button>
            <List
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:'20px',
                backgroundColor:'whitesmoke',
                padding:'40px',
                marginTop:'100px',
                borderRadius:'10px'
            }}
            >


                {tasks.map((task) => (
                    <ListItem key={task.id}
                    sx={{
                        display:'flex',
                        flexDirection:'row',
                        border: '2px solid #000', 
                        borderRadius: '8px', 
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                        backgroundColor: 'white'
                    
                    }}
                    >
                        <ListItemText primary={task.Task} />
                        <IconButton onClick={() => { setEditTask(task); setOpenEditDialog(true); }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteTask(task.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Edit Task"
                        value={editTask?.task || ''}
                        onChange={(e) => setEditTask({ ...editTask, task: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditTask} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ToDoList;
