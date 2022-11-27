import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/TaskList'

function App() {
  return (
    <div className="App">
      <h1>The Busy Bee App</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
