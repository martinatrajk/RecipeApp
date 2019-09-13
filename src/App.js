import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Category from './components/Category/Category';
import SingleMeal from './components/SingleMeal/SingleMeal';
import Search from './components/Search/Search';
import MyMeals from './components/MyMeals/MyMeals';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header getInputValue={this.getInputValue} changeRouter={this.changeRouter} />
          <Switch>
            <Route path='/RecipeApp/' exact component={Homepage} />
            <Route path='/RecipeApp/category/:name' component={Category} />
            <Route path='/RecipeApp/recipe/:id' exact component={SingleMeal} />
            <Route path="/RecipeApp/search/:id"  component={Search} />
            <Route path="/RecipeApp/mymeals" component={MyMeals}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}


export default App;
