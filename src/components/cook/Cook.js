import { useState } from 'react'
import SidePane from './Sidebar'
import Dashboard from '../home/Dashboard'
import RecipeCard from './RecipeCard'
import hangarFetch from '../../HangarFetch'
import Loader from '../../Loader'

function Cook() {
  const [recipes, setRecipes] = useState([])
  const [searchRecipe, setSearchRecipe] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(false)

  const loadRecipe = async (searchRecipe) => {
    const appId = process.env.REACT_APP_FOOD_ID
    const apiKey = process.env.REACT_APP_FOOD_KEY
    let testURL = `https://api.edamam.com/search?q=${searchRecipe}&app_id=${appId}&app_key=${apiKey}`;
    const myInit = {
      mode: 'no-cors',
    };
    const myRequest = new Request(testURL, myInit);
    const recipes = await hangarFetch(`cook-${searchRecipe}`, myRequest)
    await setRecipes(recipes.hits)
    if(recipes.hits.length <= 0){
      setAlert(true)
    } else{
      setAlert(false)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setSearchRecipe(e.target.value)
    setAlert(false)
    if(e.target.value === ''){
      setRecipes([])
    }
  }

  const searchRecipeFunction = () => {
    if(searchRecipe !== ''){
      setLoading(true)
      loadRecipe(searchRecipe)
    } else {
      setAlert(true)
    }
  }

  const recipesData =
    recipes !== null && recipes.length > 0
        ? recipes.map((recipeData) => (
            <RecipeCard
              key={recipeData.recipe.url}
              recipe={recipeData.recipe}
            />
          ))
        : null

  const alertMessage = alert ? (<div className='flex flex-col text-center justify-center mt-20'>
  <h2 className='text-2xl text-red-600'>{searchRecipe !== '' ? searchRecipe.concat(' not available!!!') : 'Recipe is Empty. Cannot Search.'} </h2>
  <h2 className='text-4xl text-primary'> {'Try to search for a different recipe!!!'} </h2>
</div>) : null

  return (
    <>
      <div className='flex flex-row mt-24 mb-24 pt-8 pb-8 pl-24 pr-16 justify-center'>
          <SidePane
            handleChange={handleChange}
            searchRecipe={searchRecipeFunction}
          />
          {!loading ? (<div
            className='flex-auto flex flex-col justify-center mt-4 p-4'>
            {recipesData}
            {alertMessage}
          </div>) : <Loader />}
          <Dashboard />
        </div>
    </>
  )
}

export default Cook