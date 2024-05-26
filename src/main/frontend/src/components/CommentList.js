import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import API_BASE_URL from '../Config';
import { useSelector } from 'react-redux';

const CommentList = ({ postId }) => {
  const user = useSelector(state => state.user.user);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/post/${postId}/comment`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, [postId]);

  const handleCommentSubmit = (commentData) => {
    axios.post(`${API_BASE_URL}/post/${postId}/comment`, commentData)
      .then(response => {
        setComments([...comments, response.data]);
      })
      .catch(error => {
        console.error("There was an error submitting the comment!", error);
      });
  };

  return (
    <div>
      <CommentForm postId={postId} username={user.username} onCommentSubmit={handleCommentSubmit} />
      {comments.map(comment => (
        <div key={comment.id} className="p-4 bg-white border border-gray-200 rounded mb-2">
          <div className="font-bold">{comment.nickname}</div> {/* 수정된 부분 */}
          <div>{comment.content}</div>
          <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;