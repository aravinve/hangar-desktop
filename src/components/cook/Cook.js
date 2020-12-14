import { useState } from 'react';
import SidePane from './Sidebar';
import Dashboard from '../home/Dashboard';
import RecipeCard from './RecipeCard';

function Cook() {
  const [recipes, setRecipes] = useState([])
  const [searchRecipe, setSearchRecipe] = useState('')

  const loadRecipe = (searchRecipe) => {
    const appId = process.env.REACT_APP_FOOD_ID
    const apiKey = process.env.REACT_APP_FOOD_KEY
    let testURL = `https://api.edamam.com/search?q=${searchRecipe}&app_id=${appId}&app_key=${apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    fetch(myRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRecipes(data.hits)
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  const handleChange = (e) => {
    setSearchRecipe(e.target.value)
  }

  const searchRecipeFunction = () => {
    loadRecipe(searchRecipe);
  }

  const recipesData =
      recipes != null
        ? recipes.map((recipeData) => (
            <RecipeCard
              key={recipeData.recipe.url}
              recipe={recipeData.recipe}
            />
          ))
        : null

  return (
    <>
      <div className='flex flex-row mt-24 mb-24 px-4 py-6 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchRecipe={searchRecipeFunction}
          />
          <div
            className='flex-auto flex flex-col justify-center mt-4 p-4'>
            {recipesData}
          </div>
          <Dashboard />
        </div>
    </>
  )
}

export default Cook