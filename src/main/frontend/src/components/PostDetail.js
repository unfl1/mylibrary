import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate 불러오기
import API_BASE_URL from '../Config';

const PostDetail = () => {
    const { postId } = useParams();
    const navigate = useNavigate(); // useNavigate 사용
    const [post, setPost] = useState(null);

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

    if (!post) {
        return <div className="text-center">Loading...</div>;
    }

    const handleBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-gray-800 mb-4">{post.content}</p>
            <div className="text-gray-600 mb-2"><strong>Location:</strong> {post.location}</div>
            <div className="text-gray-600 mb-2"><strong>Cost:</strong> {post.cost}</div>
            <div className="text-gray-600 mb-2"><strong>Author:</strong> {post.authorNickname}</div>
            <div className="text-gray-600 mb-2"><strong>Created at:</strong> {new Date(post.createdAt).toLocaleString()}</div>
            <div className="text-gray-600 mb-2"><strong>Views:</strong> {post.views}</div>
            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handleBack} // 뒤로 가기 버튼 클릭 시 handleBack 함수 호출
            >
                Back to Posts
            </button>
        </div>
    );
};

export default PostDetail;