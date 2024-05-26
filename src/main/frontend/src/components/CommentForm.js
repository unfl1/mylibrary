import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CommentForm = ({ postId, username, onCommentSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      content,
      postId,
      username
    };
    onCommentSubmit(commentData);
    setContent('');
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
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;