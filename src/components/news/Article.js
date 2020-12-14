import ContentFrame from './ContentFrame';
import sampleImage from '../../img/Nil_Image.png'

function Article({article, toggleFrame}) {
  return (
    <div className="flex flex-row">
      <div className='flex flex-col w-1/2 pt-8 pb-8 pl-24 pr-16 justify-center'>
      <div className='flex-1'>
        <div className='bg-secondary shadow-md rounded-md'>
          <div className='w-full h-auto relative flex justify-center'>
          <img src={article.urlToImage !== null ? article.urlToImage : sampleImage} alt='articlealt' className='rounded-t-md' />
          </div>
          <div className='flex-auto p-4'>
            {article.author !== null ? (
              <div className='bg-primary text-secondary m-1 px-4 inline-flex items-center justify-center py-2 rounded-sm shadow-md'>
                Author: {article.author}
              </div>
            ) : null}
            {article.source.name !== null ? (
              <div className='bg-primary text-secondary m-1 px-4 inline-flex items-center justify-center py-2 rounded-sm shadow-md'>
                Source: {article.source.name}
              </div>
            ) : null}
          </div>
          <div className='flex-auto p-4'>
            <div className='text-xl text-primary'>{article.title}</div>
          </div>
          <div className='flex-shrink-0 p-2 bg-primary rounded-b-md justify-center flex shadow-lg'>
            &nbsp;
          </div>
        </div>
      </div>
    </div>
    {toggleFrame ? (<ContentFrame
      contentData={article.description}
      contentUrl={article.url}
    />) : null}
    </div>
  );
}

export default Article;
