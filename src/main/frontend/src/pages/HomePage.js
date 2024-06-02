import Nav from '../components/Nav';
import PostList from '../components/PostList'

function HomePage() {
    return(
        <div>
            <Nav />
            <div>
                <PostList />
            </div>
        </div>
    )
}

export default HomePage;