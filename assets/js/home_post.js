{
  //method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/post/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $($("#posts-list-container>ul").prepend(newPost));
          deletePost($(" .delete-post-btn", newPost));
        },
        error: function (err) {
          console.log(`Error :: ${err.responseText}`);
        },
      });
    });
  };

  //method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                        <a class="delete-post-btn" href="/post/distroy/${post._id}">x &nbsp;</a>
                        </small>
                         ${post.content}
                        <br />
                        <small>
                        ${post.user.name}
                        </small>
                    </p>
                    <div class="post-comments">
                        <form action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Add Comment..." required />
                        <input type="hidden" name="post" value=${post._id}" />
                        <input type="submit" value="Add Comment" />
                        </form>

                      

                        <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                        </div>
                    </div>
                    </li>`);
  };

  //method to delete a post from DOM

  let deletePost = function (deleteLink) {
    $("deleteLink").click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`post-${data.data.post_id}`).remove();
        },
        error: function (err) {
          console.log(`Error :: ${err.responseText}`);
        },
      });
    });
  };

  createPost();
}
