import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import API_BASE_URL from '../Config';

const CommentList = ({ postId }) => {
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

  const handleReplySubmit = (replyData, parentId) => {
    axios.post(`${API_BASE_URL}/post/${postId}/comment`, replyData)
      .then(response => {
        const updatedComments = comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data]
            };
          }
          return comment;
        });
        setComments(updatedComments);
      })
      .catch(error => {
        console.error("There was an error submitting the reply!", error);
      });
  };

  return (
    <div>
      <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
      {comments.map(comment => (
        <div key={comment.id} className="p-4 bg-white border border-gray-200 rounded mb-2">
          <div className="font-bold">{comment.nickname}</div>
          <div>{comment.content}</div>
          <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
          {/* 대댓글 폼 */}
          <CommentForm 
            postId={postId} 
            parentId={comment.id} 
            onCommentSubmit={(replyData) => handleReplySubmit(replyData, comment.id)} 
          />
          {/* 대댓글 리스트 */}
          {comment.replies && comment.replies.map(reply => (
            <div key={reply.id} className="p-2 bg-gray-100 border border-gray-300 rounded ml-4 mt-2">
              <div className="font-bold">{reply.nickname}</div>
              <div>{reply.content}</div>
              <div className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentList;