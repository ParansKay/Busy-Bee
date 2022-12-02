import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import TaskList from '../TaskList/TaskList'
import NewTask from '../NewTask/NewTask';

function App() {
  return (
    <div className="App">
      <h1 className='appHeader'>Here are all my tasks</h1>
      <Router>        
        <Route path="/" exact>
          <TaskList />
        </Route>
        <Route path="/new" exact>
          <NewTask/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
