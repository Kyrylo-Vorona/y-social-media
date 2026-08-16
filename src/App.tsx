import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./index.css";
import type {NewPost, Post} from "./types/post";
import {createPost, deletePost, getPosts} from "./api/posts";
import Feed from "./pages/Feed";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";

function SocialApp() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Load the first posts when the app starts.
        async function loadPosts() {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch {
                setError("Could not load posts. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    async function add(draft: NewPost) {
        const post = await createPost(draft);
        setPosts(current => [post, ...current]);
    }

    async function remove(post: Post) {
        // New posts only exist in this browser, so there is nothing to delete online.
        if (!post.isLocal) await deletePost(post.id);
        setPosts(current => current.filter(item => item.id !== post.id));
    }

    return <Routes>
        <Route path="/" element={<Feed posts={posts} loading={loading} error={error}/>}/>
        <Route path="/create" element={<CreatePost add={add}/>}/>
        <Route path="/posts/:id" element={<PostDetails posts={posts} loading={loading} remove={remove}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>;
}

export function App() {
    return <BrowserRouter><SocialApp/></BrowserRouter>;
}

export default App;
