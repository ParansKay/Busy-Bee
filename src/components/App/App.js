import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import TaskList from '../TaskList/TaskList'

function App() {
  return (
    <div className="App">
      <h1>The Busy Bee App</h1>
      <Router>        
        <Route path="/" exact>
          <TaskList />
        </Route>
      </Router>
    </div>
  );
}


export default App;
