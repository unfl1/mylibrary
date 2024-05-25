import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 불러오기
import API_BASE_URL from '../Config';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); // useNavigate 사용

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/post/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleGoToCreate = () => {
        navigate('/CreatePostPage'); // '/CreatePostPage' 경로로 이동
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Posts</h2>
                <button 
                    onClick={handleGoToCreate} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Write a Post
                </button>
            </div>
            <ul className="space-y-4">
                {posts.map((post, index) => (
                    <li key={index} className="border p-4 rounded-md">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-600">Location: {post.location}</p>
                        <p className="text-gray-600">Cost: {post.cost}</p>
                        <p className="text-gray-600">Author: {post.authorNickname}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;