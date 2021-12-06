import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPg from './components/landingPg'
import Home from './components/home';
import RecipeCreate from './components/recipeCreate'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch> 
          <Route exact path= '/' component= {LandingPg}/> 
          <Route path= '/home' component= {Home}/> 
          <Route path= '/Recipes' component= {RecipeCreate}/> 
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
