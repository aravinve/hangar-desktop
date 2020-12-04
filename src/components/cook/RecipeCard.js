function RecipeCard({recipe}) {
  return (
    <div className='columns'>
      <div className='column'>
        <div className='card'>
          <div className='columns'>
            <div className='column is-6' style={{ textAlign: 'center' }}>
              <div className='card-image box'>
                <img src={recipe.image} alt='Recipe Image' />
              </div>
            </div>
            <div className='column is-6'>
              <div className='card-header' style={{ padding: '1rem' }}>
                <h3 className='is-title'>{recipe.label}</h3>
              </div>
              <div className='content' style={{ marginTop: '1rem' }}>
                {recipe.healthLabels.map((label) => (
                  <div className='tag is-dark' style={{ margin: '0.5rem' }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <div className='card-content'>
            <div className='columns'>
              <div className='column is-8'>
                <p className='subtitle'>Ingredients:</p>
                <div class='table-container'>
                  <table class='table'>
                    <thead>
                      <tr>
                        <td>Items</td>
                        <td>Weight</td>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.map((element) => (
                        <React.Fragment>
                          <tr>
                            <td>{element.text} </td>
                            <td>{element.weight} </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='column is-4'>
                <p className='subtitle'>Method To Prepare:</p>
                <ol>
                  {recipe.ingredientLines.map((element) => (
                    <li>{element} </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div className='card-footer-item'>{recipe.source}</div>
            <div className='card-footer-item'>
              <a href={recipe.url} target='_blank'>
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard
