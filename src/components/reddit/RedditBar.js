import sampleThumbnail from '../../img/Nil_Image.png'

function RedditBar({post}) {
  return (
    <div className='flex flex-row bg-secondary text-primary justify-start p-4 m-2 rounded-md shadow-md'>
      <article className='flex-1 flex flex-row justify-left'>
        <figure className='block relative h-20 w-20'>
            <img src={post.data.thumbnail.includes('http') ? post.data.thumbnail : sampleThumbnail } alt='Image' className='rounded-md shadow-sm h-auto w-full block' />
          </figure>
        <div className='flex-1 ml-4'>
          <div className='select-none text-justify text-primary text-lg hover:underline'>
            <a href={`https://www.reddit.com/${post.data.permalink}`} target="_blank">{post.data.title}</a>
          </div>
          <div className='select-none text-justify text-primary text-sm p-1 mt-1 mb-1'>
            <i className='fas fa-user mr-1'></i> {post.data.author}
          </div>
          <div className='select-none text-justify text-primary text-xs p-1 mt-1 mb-1'>
            <i className='fas fa-arrow-up mr-1'></i> {post.data.ups}
          </div>
        </div>
      </article>
    </div>
  );
}

export default RedditBar;
