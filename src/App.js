import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import './App.css';
import Home from '../src/views/Home/Home';
import Header from '../src/components/Header/Header';

function App() {
  return (
    <Router>
    <Header/>
    <Switch>
      <Route path='/' component={Home} exact></Route>
      <Route path="/home" component={Home} exact></Route>
      <Route path="/*" component={Home} >
        <Redirect to='/home'/>
      </Route>
    </Switch>
    
</Router>
    
  );
}
export default App;
