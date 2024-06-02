import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Redux hook 추가
import CommentForm from './CommentForm';
import API_BASE_URL from '../Config';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showReplyForms, setShowReplyForms] = useState({});

  // Redux 스토어에서 사용자 정보 가져오기
  const user = useSelector(state => state.user.user);

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
        setShowCommentForm(false); // 폼 숨기기
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
        setShowReplyForms({ ...showReplyForms, [parentId]: false }); // 폼 숨기기
      })
      .catch(error => {
        console.error("There was an error submitting the reply!", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`${API_BASE_URL}/comment/${commentId}`, {
      headers: {
        'username': user.username // Redux에서 가져온 사용자 정보 사용
      }
    })
      .then(response => {
        if (response.status === 200) {
          // 삭제 후 페이지 새로고침
          window.location.reload();
        }
      })
      .catch(error => {
        console.error("There was an error deleting the comment!", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="px-4 py-2 text-black bg-transparent rounded hover:text-blue-500 mb-4"
        >
          {showCommentForm ? '댓글창 닫기' : '댓글 쓰기'}
        </button>
      </div>
      {showCommentForm && <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />}
      {comments.map(comment => (
        <div key={comment.id} className="p-4 bg-white border border-gray-200 rounded mb-2">
          <div className="font-bold">{comment.nickname}</div>
          <div>{comment.content}</div>
          <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
          <button
            onClick={() => setShowReplyForms({ ...showReplyForms, [comment.id]: !showReplyForms[comment.id] })}
            className="px-4 py-2 text-black bg-transparent rounded hover:text-blue-500 mt-2"
          >
            {showReplyForms[comment.id] ? 'Hide Reply Form' : 'Reply'}
          </button>
          {showReplyForms[comment.id] && (
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onCommentSubmit={(replyData) => handleReplySubmit(replyData, comment.id)}
            />
          )}
          {comment.replies && comment.replies.map(reply => (
            <div key={reply.id} className="p-2 bg-gray-100 border border-gray-300 rounded ml-4 mt-2">
              <div className="font-bold">{reply.nickname}</div>
              <div>{reply.content}</div>
              <div className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</div>
              {user && user.username === reply.username && (
                <button
                  onClick={() => handleDeleteComment(reply.id)}
                  className="px-4 py-2 text-red-500 bg-transparent rounded hover:text-red-700 mt-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          {user && user.username === comment.username && (
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="px-4 py-2 text-red-500 bg-transparent rounded hover:text-red-700 mt-2"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;