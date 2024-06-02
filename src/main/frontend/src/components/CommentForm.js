import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CommentForm = ({ postId, parentId, onCommentSubmit }) => {
  const [content, setContent] = useState('');
  const username = useSelector(state => state.user.user.username); // Redux store에서 username 가져오기

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      content,
      postId,
      username,
      parentCommentId: parentId || null,
    };
    onCommentSubmit(commentData);
    setContent('');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <div className="mb-2">
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button type="submit" className="px-4 py-2 text-black bg-transparent rounded hover:text-blue-500">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;