import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/Authactions';
import API_BASE_URL from '../Config';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isAuthenticated);
  const [user, setUser] = useState({ username: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiUrl = `${API_BASE_URL}/user/login`;

    try {
      const response = await axios.post(apiUrl, {
        username: user.username,
        password: user.password
      });
      if (response.status === 200) {
        dispatch(login({ username: user.username, nickname: response.data.nickname, isAuthenticated: true }));
        console.log('로그인 성공');
        navigate('/'); // 홈 화면으로 리다이렉트
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 실패', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/logout`);

      if (response.status === 200) {
        dispatch(logout());
        console.log('로그아웃 성공');
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 실패', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
      {!isLoggedIn && (
        <div className="flex shadow-md">
          <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: "24rem", height: "32rem" }}>
            <div className="w-72 ">
              <Link to="/"><h1 className="text-xl font-semibold text-center">나만의 도서관</h1></Link>
              <form className="mt-6" onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">ID</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="ID를 입력해주세요"
                    onChange={handleChange}
                    value={user.username}
                    className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block text-xs font-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="*********"
                    onChange={handleChange}
                    value={user.password}
                    className="block w-full rounded-md border border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 py-1 px-1.5 text-gray-500"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="mb-1.5 block w-full text-center text-white bg-blue-700 hover:bg-blue-900 px-2 py-1.5 rounded-md"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div>
          <h2>로그인 성공!</h2>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;