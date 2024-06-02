import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/Authactions'; // 수정된 import 경로

function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate 훅 추가
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
        // 로그아웃 후 리다이렉트 가능
        navigate('/');
        window.location.reload(); // 로그아웃 후 홈 화면으로 이동
    };

    const handleHomeClick = () => {
        // 홈 화면으로 이동하면서 새로고침
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="mb-5">
            <div>
                <Link to="/" onClick={handleHomeClick}>
                    <div className="flex justify-center text-3xl font-black whitespace-nowrap dark:text-white pt-10">
                        나만의 도서관
                    </div>
                </Link>
            </div>
            <div className="flex items-center justify-end w-full pt-5">
                <ul className="hidden md:flex items-center space-x-1 gap-5 mr-20 pr-24">
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
                                <Link to="/Login" className="hover:text-blue-600">
                                    로그인
                                </Link>
                            </li>
                            <li>
                                <Link to="/SignUp" className="hover:text-blue-600">
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