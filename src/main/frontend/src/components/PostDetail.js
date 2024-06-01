import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 추가
import API_BASE_URL from '../Config';

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const currentUser = useSelector(state => state.user.user); // 현재 사용자 정보 가져오기

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/post/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    const handleDeletePost = async () => {
        try {
            // 현재 사용자의 username과 게시물 작성자의 username 비교
            if (currentUser && post && currentUser.username === post.username) {
                await axios.delete(`${API_BASE_URL}/post/${postId}`, {
                    params: {
                        username: currentUser.username
                    }
                });
                navigate('/'); // 삭제 후 홈페이지로 이동
            } else {
                console.error('You are not authorized to delete this post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!post) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <div>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-lg text-gray-800 mb-4">{post.content}</p>
                <div className="text-gray-600 mb-2"><strong>Location:</strong> {post.location}</div>
                <div className="text-gray-600 mb-2"><strong>Cost:</strong> {post.cost}</div>
                <div className="text-gray-600 mb-2"><strong>Author:</strong> {post.authorNickname}</div>
                <div className="text-gray-600 mb-2"><strong>Created at:</strong> {new Date(post.createdAt).toLocaleString()}</div>
                <div className="text-gray-600 mb-2"><strong>Views:</strong> {post.views}</div>
                {post.imageUrl && (
                    <div className="mb-4">
                        <img src={`${API_BASE_URL}${post.imageUrl}`} alt="why" className="w-full h-auto" />
                    </div>
                )}
                {currentUser && currentUser.username === post.username ? (
                    <button onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded">
                        Delete
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default PostDetail;