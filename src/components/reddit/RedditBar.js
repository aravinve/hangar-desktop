function RedditBar({post}) {
  return (
    <div class='box'>
      <article class='media'>
        <div class='media-left'>
          <figure class='image is-64x64'>
            <img src={post.data.thumbnail} alt='Image' />
          </figure>
        </div>
        <div class='media-content'>
          <div class='content'>
            <p>
              <strong>{post.data.title}</strong>
              <br />
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default RedditBar;
