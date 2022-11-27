import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeLatest('FETCH_TASKS', fetchAllTasks);
    yield takeLatest ('DELETE_TASK', deleteTask);
    yield takeLatest ('ADD_TASK', addTask)
}

function* fetchAllTasks() {
    // get all movies from the DB
    try {
        const response = yield axios.get('/api/tasks');
        console.log('get all:', tasks.data);
        yield put({ type: 'SET_TASKS', payload: response.data });

    } catch {
        console.log('get all error');
    }  
}


function* deleteTask(action) {
    try {
      console.log('action.payload is------>', action.payload);
      yield axios.delete(`/api/tasks/${action.payload}`); 
      yield put({ type: 'SET_TASKS'}); //updating the reducer to append the most up-to-date data to DOM
    } catch (error) {
      console.log('Task delete request failed', error);
    }
  }

function* addTask(action){
    try {
        const newTask = yield axios.post(`/api/tasks`, {title: action.payload.title, notes: action.payload.notes});
        console.log('adding new task:', newTask.data);
         yield put({  
             //once that is done, update FETCH_FAVORITES to append the most up-to-date info to the DOM
             type: 'FETCH_TASKS'});
     } catch (err){
         console.log('error adding new task', err );
     } 
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const tasks = (state = [], action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return action.payload;
        default:
            return state;
    }
}


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        tasks,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
