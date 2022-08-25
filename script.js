let postsContainer = document.querySelector('.postsContainer');




fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  .then((response) => response.json())
  .then((posts) => {

  posts.map((post) => {
    let postItem = document.createElement('div');
    postItem.classList.add('post-item');
    let postTitleElement = document.createElement('h2');
    postTitleElement.classList.add('title');
    let postContentElement = document.createElement('p');
    postContentElement.classList.add('post-content');
    let postComments = document.createElement('div');
    postComments.classList.add('postComments');
    let commentButton = document.createElement('button');
    commentButton.classList.add('show-comment');



        commentButton.textContent = 'Show Comments';
        postTitleElement.textContent = post.title;
        postContentElement.textContent = post.body;

        postsContainer.append(postItem, commentButton, postComments);
          postItem.append(postTitleElement, postContentElement);

            commentButton.addEventListener ('click',() => {
              if (commentButton.classList.contains('hide-comment')){
                  postComments.innerHTML = ""
                  commentButton.textContent = 'Show Comments'
                  commentButton.classList.toggle('hide-comment')
      
                }  
              else {
                fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                .then((response) => response.json())
                .then((comments) => {
                  comments.map((comment)=> {
                  
                    let commentElement = document.createElement('div')
                    commentElement.classList.add('comment')
                    commentElement.innerHTML = `<h4> Title: ${comment.name} </h4>
                                                <span> Comment by: ${comment.email} </span>
                                                <p> ${comment.body} </p>
                                                <br>`
    
                    postComments.append(commentElement)
                    commentButton.textContent = 'Hide Comments'
                    commentButton.classList.toggle('hide-comment')
          
                  })
                })
              }
          })           
       })
    })