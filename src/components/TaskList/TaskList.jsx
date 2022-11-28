import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate } from 'react-router-dom'; //must define link within each component, otherwise we get an undefined error
import './TaskList.css'



function TaskList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.tasks);

    useEffect(() => {
        dispatch({ type: 'FETCH_TASKS' });
    }, []);
    
    //the extra () and => is so that convert handleDelete to a curried function
    // to close over the post id in callback scope and return an onClick handler function.
    const deleteTask = (id) => () =>{
        console.log();
        dispatch({
          type: 'DELETE_TASK', 
          payload: id
        })
        dispatch({
            type:'FETCH_TASKS'
        })
      }

    return (
        <main className='listDisplayMain'>
           <section className="tasks">
                {tasks.map(task => {
                    return (
                        <div key={task.id} className="taskRows">
                            <h3 className='taskCol1'>X</h3>
                            <h3 className='taskCol3'>{task.notes}</h3>
                            <button className='taskCol4' onClick={deleteTask(task.id)}>Delete</button>
                        </div>
                    );
                })}
            </section>
            <div className='addNewTodoBtnDiv'>
                <button className='mainBtn'>Add a new to-do!</button>
            </div>
        </main>

    );
}

export default TaskList;