import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate } from 'react-router-dom'; //must define link within each component, otherwise we get an undefined error
import { Box, Modal } from '@mui/material';
import './TaskList.css'
import NewTask from '../NewTask/NewTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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

        // When the user clicks on the button, open the modal
        function handleModal(event) {
            // modal.style.display = "block";
            console.log(event.target);
            if (event.target === modal) {
                modal.style.display = "none";
            } else if (event.target == span){
                modal.style.display = "none";
            }else {
                modal.style.display = "block";
            }
        }

    return (
        <main className='listDisplayMain'>
           <section className="tasks">
                {tasks.map(task => {
                    return (
                        <div key={task.id} className="taskRows">
                            <h3 className='taskCol1'>x</h3>
                            <h3 className='taskCol2'>{task.task}</h3>
                            <h3 className='taskCol3'>{task.notes}</h3>
                            <DeleteOutlineIcon className='taskCol4' onClick={deleteTask(task.id)}/>
                        </div>
                    );
                })}
            </section>
            <div className='addNewTodoBtnDiv'>              
                <button onClick={handleModal} className='mainBtn' id='myBtn'>Add a new to-do!</button>
            </div>
            <div id="myModal" class="modal" onClick={handleModal}>
                <div class="modal-content">
                {/* When the user clicks on <span> (x), close the modal */}
                <div class="closeDiv">
                  <span class="close">&times;</span>    
                </div>
                <div><NewTask/></div>
             </div>

            </div>
        </main>

    );
}

export default TaskList;