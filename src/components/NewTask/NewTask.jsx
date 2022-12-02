import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useNavigate } from 'react-router-dom'; //must define link within each component, otherwise we get an undefined error
import './NewTask.css'

function NewTask (){

    const dispatch = useDispatch();
    const history = useHistory();
    const tasks = useSelector(store => store.tasks);

    useEffect(() => {
        dispatch({ type: 'FETCH_TASKS' });
    }, []);

    const [newTask, setNewTask] = useState({
        task: '',
        notes: ''
    });
    
    const addNewTask = (event) => {
        dispatch({ 
          type: 'ADD_TASK',
          payload: newTask
      }, []);
    };

    const addTask = (event) => {
        //changing only the title property in newTask to the value in our input field
        setNewTask({...newTask, task: event.target.value});
        console.log( 'new task title is:', newTask.task );
    };

    const addNotes = (event) => {
        //changing only the note property in newTask to the value in our input field
        setNewTask({...newTask, notes: event.target.value});
        console.log( 'new task note is:', newTask.description );
    };

    return(
        <div className='newTaskModal'>
          <h1>What do you want to do?</h1>
          <div>
            <div className='newTaskForm'>
                <input className='taskTitleInput' placeholder='What do you have to do?' defaultValue={newTask.task} onChange={( event )=>addTask( event )}></input>
                <textarea className='taskDetailInput' placeholder='Gimmie notes' defaultValue={newTask.notes} onChange={(event)=>addNotes(event)}></textarea>
            </div>
            <div className='addNewTodoBtnDiv'>
                <button className='scndBtn' onClick={addNewTask}>Add a new to-do!</button>
            </div>
          </div>
        </div>
    )
}

export default NewTask;