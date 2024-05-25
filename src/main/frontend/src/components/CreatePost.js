import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import API_BASE_URL from '../Config';

const CreatePost = () => {
  const user = useSelector(state => state.user.user); // Redux 스토어에서 사용자 정보를 가져옵니다.
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postCreateDto = {
      title,
      content,
      location,
      cost: parseInt(cost, 10),
      username: user.username // 사용자 정보에서 username을 가져와서 요청 데이터에 포함합니다.
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/post/create`, postCreateDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Post created:', response.data);
      // 성공적으로 게시물이 생성된 경우, 폼을 초기화합니다.
      setTitle('');
      setContent('');
      setLocation('');
      setCost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
            Cost
          </label>
          <input
            id="cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;