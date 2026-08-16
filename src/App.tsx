import {type FormEvent, useState, useEffect} from "react";
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams} from "react-router-dom";
import "./index.css";
import { type Post } from "./types/post";
import Feed from "./pages/Feed"
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";

function SocialApp() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then((data) => {
                const formattedPosts = data.posts.map((item: any) => ({
                    id: String(item.id),
                    author: `User ${item.userId}`,
                    title: item.title,   
                    body: item.body, 
                    comments: []  
                }));
                setPosts(formattedPosts);
            });
    }, []);
    const remove = (id: string) => setPosts(posts.filter(post => post.id !== id));
    const add = (draft: Omit<Post, "id" | "comments">) => setPosts([{
        ...draft,
        id: crypto.randomUUID(),
        comments: []
    }, ...posts]);
    return <Routes><Route path="/" element={<Feed posts={posts} remove={remove}/>}/><Route path="/create"
                                                                                           element={<CreatePost
                                                                                               add={add}/>}/><Route
        path="/posts/:id" element={<PostDetails posts={posts} remove={remove}/>}/><Route path="*"
                                                                                         element={<Navigate to="/"
                                                                                                            replace/>}/></Routes>;
}

export function App() {
    return <BrowserRouter><SocialApp/></BrowserRouter>;
}

export default App;
