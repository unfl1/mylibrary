import Nav from '../components/Nav';
import MyPost from '../components/MyPost';
import { useSelector } from 'react-redux'; // useSelector 추가

function MyPostPage() {
    const username = useSelector(state => state.user.username); // Redux 스토어에서 username 가져오기

    return(
        <div>
            <Nav />
            <div>
                {/* username을 MyPost 컴포넌트에 전달 */}
                <MyPost username={username} />
            </div>
        </div>
    )
}

export default MyPostPage;