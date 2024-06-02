// src/components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  if (!isLoggedIn) {
    // 로그인하지 않았을 경우 로그인 페이지로 리디렉션
    return <Navigate to="/Login" />;
  }

  return children; // 로그인 상태일 때만 자식 컴포넌트 렌더링
}

export default ProtectedRoute;