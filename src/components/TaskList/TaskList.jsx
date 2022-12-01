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
    // const [open, setOpen] = useState(false);
    // const handleClickOpen = () => {
    //     setOpen(!open);
    // };

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

        let modal = document.getElementById("myModal");
        // Get the button that opens the modal
        let btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        let span = document.getElementsByClassName("close")[0];


        // When the user clicks anywhere outside of the modal, close it
        window.onClick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        }

        // When the user clicks on the button, open the modal
        function handleModal() {
            modal.style.display = "block";
        }

        function handleClose() {
            modal.style.display = "none";
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
                {/* <button className='mainBtn' onClick={handleClickOpen}>Add a new to-do!</button> */}
                <button onClick={handleModal} id='myBtn'>Add a new to-do!</button>
            </div>
            {/* <div className='newTaskModalDiv'> */}
                {/* <Modal
                open={open} onClose={handleClickOpen} className="createNewTaskModal">
                <div>
                    <NewTask/>  
                </div> 
                </Modal> */}
            {/* </div> */}
            <div id="myModal" class="modal">
                <div class="modal-content">
                {/* When the user clicks on <span> (x), close the modal */}
                <span class="close" onClick={handleClose}>&times;</span>
               
                <div><NewTask/></div>
             </div>

            </div>
        </main>

    );
}

export default TaskList;