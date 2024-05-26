// PostDetailPage.js

import React from 'react';
import Nav from '../components/Nav';
import PostDetail from '../components/PostDetail';
import CommentList from '../components/CommentList';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
    const { postId } = useParams(); // React Router를 사용하여 postId 가져오기

    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <PostDetail />
            </div>
            <div>
                {/* 수정된 호출 코드 */}
                <CommentList postId={postId} />
            </div>
        </div>
    )
}

export default PostDetailPage;