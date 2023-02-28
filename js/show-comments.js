const commentsListNode = document.querySelector('.social__comments');
const commentNode = document.querySelector('.social__comment');
// const commentsCountNode = document.querySelector('.comments-count');
// const commentsLoaderButtonNode = document.querySelector('.comments-loader');

// const getCommentsRange = (postData, commentsQuantity) => {
//   const commentsData = postData.comments;

//   return function () {
//     return commentsData.splice(0, commentsQuantity);
//   };
// };

const createComment = (commentData) => {
  const comment = commentNode.cloneNode(true);
  comment.querySelector('.social__picture').src = commentData.avatar;
  comment.querySelector('.social__picture').alt = commentData.name;
  comment.querySelector('.social__text').textContent = commentData.message;

  return comment;
};

const clearComments = () => {
  commentsListNode.innerHTML = '';
};

const renderComments = (postData, commentsQuantity) => {
  clearComments();

  postData.comments.forEach((commentData) => commentsListNode.append(createComment(commentData)));
};

export {renderComments, clearComments};
