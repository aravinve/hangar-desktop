import React, { Component } from 'react';
import SidePane from './Sidebar';
import Dashboard from '../home/Dashboard';
import RecipeCard from './RecipeCard';

class Cook extends Component {
  state = {
    apiUrl: 'https://api.edamam.com/search',
    appId: '',
    apiKey: '',
    recipes: [],
    searchRecipe: '',
  };
  loadRecipe = (searchRecipe) => {
    let testURL = `https://api.edamam.com/search?q=${searchRecipe}&app_id=${this.state.appId}&app_key=${this.state.apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ recipes: data.hits });
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchRecipe = () => {
    this.loadRecipe(this.state.searchRecipe);
  };

  render() {
    const recipesData =
      this.state.recipes != null
        ? this.state.recipes.map((recipeData) => (
            <RecipeCard
              key={recipeData.recipe.url}
              recipe={recipeData.recipe}
            />
          ))
        : null;
    return (
      <React.Fragment>
        <div className='columns'>
          <SidePane
            handleChange={this.handleChange}
            searchRecipe={this.searchRecipe}
          />
          <div
            className='column is-8'
            style={{ marginTop: '4rem', padding: '2rem' }}
          >
            {recipesData}
          </div>
          <Dashboard />
        </div>
      </React.Fragment>
    );
  }
}

export default Cook;
