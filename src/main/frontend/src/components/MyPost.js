import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux에서 상태를 선택하기 위해 추가
import API_BASE_URL from '../Config';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    
    // Redux 스토어에서 사용자 정보를 선택
    const { username } = useSelector(state => state.user.user);

    useEffect(() => {
        fetchMyPosts();
    }, []);

    const fetchMyPosts = async () => {
        try {
            // URL에 사용자 이름(username)을 추가하여 요청 보내기
            const response = await axios.get(`${API_BASE_URL}/post/mypost/${username}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching my posts:', error);
        }
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <h2 className="text-3xl font-bold mb-4">My Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                {posts.map((post) => (
                    <div
                        key={post.postId}
                        className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
                        onClick={() => handlePostClick(post.postId)}
                    >
                        {post.imageUrl && (
                            <div className="mb-4">
                                <img src={post.imageUrl} alt={post.title} className="w-40 h-40 object-cover mx-auto" />
                            </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600">{post.cost}원</p>
                        <p className="text-gray-600">{post.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPost;