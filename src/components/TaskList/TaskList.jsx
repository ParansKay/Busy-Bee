import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate } from 'react-router-dom'; //must define link within each component, otherwise we get an undefined error
import { Box, Modal } from '@mui/material';
import './TaskList.css'
import NewTask from '../NewTask/NewTask';

function TaskList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.tasks);

    useEffect(() => {
        dispatch({ type: 'FETCH_TASKS' });
    }, []);

    const timer = setTimeout(()=>{
        history.push("/");
        }, 300);

    //HANLDE POP-UP MODAL
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };

    const deleteTask = (id) => () =>{ //the extra () and => is so that convert handleDelete to a curried function to close over the post id in callback scope and return an onClick handler function.
        console.log();
        dispatch({
          type: 'DELETE_TASK', 
          payload: id
        })
        setTimeout(()=>{
            dispatch({ type: 'FETCH_TASKS'});
            }, 100);
      }

    return (
        <main className='listDisplayMain'>
           <section className="tasks">
                {tasks.map(task => {
                    return (
                        <div key={task.id} className="taskRows">
                            <h3 className='taskCol1'>X</h3>
                            <h3 className='taskCol2'>{task.task}</h3>
                            <h3 className='taskCol3'>{task.notes}</h3>
                            <button className='taskCol4' onClick={deleteTask(task.id)}>Delete</button>
                        </div>
                    );
                })}
            </section>
            <div className='addNewTodoBtnDiv'>
                <button className='mainBtn' onClick={handleClickOpen}>Add a new to-do!</button>
            </div>
            <div>
                <Modal
                open={open}
                onClose={handleClickOpen}
                className="createNewTaskModal"
                style={{
                display: 'flex',
                flexDirection:'column',
                alignContent: 'center',
                position: 'flexible',
                top: '15%',
                left: '0',
                marginLeft: '25%',
                marginRight: '25%',
                outline: 'none'
                }}>
                <div>
                    <NewTask/>  
                </div> 
                </Modal>
      </div>
        </main>

    );
}

export default TaskList;