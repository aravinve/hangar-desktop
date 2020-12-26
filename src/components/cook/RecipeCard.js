import {useState} from 'react'
import sampleImage from '../../img/Nil_Image.png'

function RecipeCard({recipe}) {

  const [accordion, setAccordion] = useState(false)

  return (
    <div className='flex-1 flex flex-row'>
      <div className='flex bg-secondary rounded-md shadow-md flex-col m-4 w-full pl-10 pr-10 pt-12 pb-4 justify-center'>
        <div className='flex-1'>
          <div className='flex-auto flex flex-row-reverse mb-8'>
            <div className='flex-1'>
              <div className='w-full h-auto relative flex justify-center'>
                <img src={recipe.image !== null ? recipe.image : sampleImage} alt='recipedata' className='rounded-md shadow-md' />
              </div>
            </div>
            <div className='flex-1'>
              <div className='p-1 mt-2 mb-2'>
                <h3 className='text-3xl text-primary'>{recipe.label}</h3>
              </div>
              <div className='flex-auto p-2'>
                {recipe.healthLabels.map((label) => (
                  <div className='bg-primary text-secondary m-1 px-4 text-xs inline-flex items-center justify-center py-2 rounded-sm shadow-md'>
                    <i className="fas fa-tag mr-2"></i> {label}
                  </div>
                ))}
              </div>
              <div className='flex-auto p-2 flex flex-col mt-2 mb-2 justify-start'>
              <div className='text-sm text-primary m-2'><i className="fas fa-user mr-2"></i>Source: {recipe.source}</div>
              <div className="flex flex-row justify-start">
                {recipe.url !== null ? (  <div className='text-primary m-2 bg-white px-4 py-2 rounded-md shadow-lg'>
                  <a href={recipe.url} target='_blank'>
                  <i className="fas fa-external-link-alt mr-2"></i> Visit
                  </a>
                </div>) : null}
                <div className="text-primary m-2 bg-white px-4 py-2 rounded-md shadow-lg text-md">
                  <button className='outline-none focus:outline-none' onClick={() => setAccordion(!accordion)}>
                  <i className="fas fa-info-circle mr-2"></i> {accordion ? 'Hide Detail' : 'Show Detail'}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
          {accordion ? (<>
            <div className='flex-auto p-4'>
            <div className='flex flex-col justify-center p-4'>
              <div className='flex-auto'>
                <p className='text-lg text-primary mt-2 mb-2'>Ingredients:</p>
                <div className='flex flex-row m-2'>
                  <table class='flex-1'>
                    <thead className='bg-primary text-secondary'>
                      <tr className="p-2">
                        <td className="p-2">Items</td>
                        <td className="p-2">Weight</td>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.map((element) => (
                        <>
                          <tr className="p-2">
                            <td className="p-2">{element.text} </td>
                            <td className="p-2">{element.weight} </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='flex-auto p-4'>
                <p className='text-primary text-lg mt-4 mb-4'>Method To Prepare:</p>
                <ol>
                  {recipe.ingredientLines.map((element) => (
                    <li>{element} </li>
                  ))}
                </ol>
              </div>
            </div>
          </div></>) : null}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard
