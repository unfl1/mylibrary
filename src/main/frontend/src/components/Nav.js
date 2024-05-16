import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/Authactions'; // 수정된 import 경로

function Nav() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
        // 로그아웃 후 리다이렉트 가능
    };

    return (
        <div className="mb-5" >
            <div className="max-w-screen-xl flex flex-wrap items-center p-4 gap-5 ml-20 mt-5 pl-10">
                <Link to="/">
          <span className="self-center text-3xl font-black whitespace-nowrap dark:text-white">
            나만의 도서관
          </span>
                </Link>
            </div>
            <div className="flex md:flex md:justify-between">
                <ul className="hidden md:flex items-center space-x-1 gap-5 mr-20 pr-10">
                    {isLoggedIn ? (
                        <>
                            <li>
                <span className="text-blue-600 font-semibold text-lg">
                  {user.nickname}
                </span>
                                님 안녕하세요!
                            </li>
                            <li>
                                <button className="hover:text-pink-400" onClick={handleLogout}>
                                    로그아웃
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/Login" className="hover:text-purple-600">
                                    로그인
                                </Link>
                            </li>
                            <li>
                                <Link to="/SignUp" className="hover:text-purple-600">
                                    회원가입
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Nav;