import {FormEvent,useState} from "react";
import {BrowserRouter, Link, Navigate, Route, Routes, useNavigate, useParams} from "react-router-dom";
import "./index.css";

type Post = {
    id: string;
    author: string;
    title: string;
    body: string;
    comments: { author: string; body: string }[];
};

const initialPosts: Post[] = [
    {
        id: "welcome",
        author: "Maya Chen",
        title: "Welcome to Y",
        body: "A small place to share ideas, ask questions, and keep the conversation moving.",
        comments: [{author: "Jon Bell", body: "Happy to be here!"}, {
            author: "Aisha Khan",
            body: "Looking forward to seeing what everyone builds."
        }]
    },
    {
        id: "typescript-tip",
        author: "Aisha Khan",
        title: "A TypeScript tip I keep using",
        body: "Give data a clear type at the boundary of your app. The rest of the code becomes easier to understand.",
        comments: [{author: "Maya Chen", body: "Such a useful habit."}]
    },
    {
        id: "weekend-project",
        author: "Jon Bell",
        title: "What are you building this weekend?",
        body: "I am trying a tiny Bun and React project. Share your plans below.",
        comments: []
    },
];

function Page({children}: { children: React.ReactNode }) {
    return <div className="site-shell">
        <header className="topbar"><Link className="brand" to="/">KAS</Link>
            <nav><Link to="/">Feed</Link><Link to="/create">Create post</Link></nav>
        </header>
        <main>{children}</main>
    </div>;
}

function PostCard({post, remove}: { post: Post; remove: (id: string) => void }) {
    return <article className="post-card"><p className="post-meta">{post.author}</p><Link className="post-link"
                                                                                          to={`/posts/${post.id}`}>
        <h2>{post.title}</h2><p>{post.body}</p></Link>
        <footer className="post-actions"><Link to={`/posts/${post.id}`}>{post.comments.length} comments</Link>
            <button className="button-text danger" onClick={() => remove(post.id)}>Delete</button>
        </footer>
    </article>;
}

function Feed({posts, remove}: { posts: Post[]; remove: (id: string) => void }) {
    const [search, setSearch] = useState("");
    const shownPosts = posts.filter(post => `${post.author} ${post.title} ${post.body}`.toLowerCase().includes(search.toLowerCase()));
    return <Page>
        <div className="page-heading"><h1>What’s happening?</h1><Link className="button" to="/create">Write a
            post</Link></div>
        <label className="search">Search posts<input value={search} onChange={event => setSearch(event.target.value)}/></label>
        <section className="feed">{shownPosts.map(post => <PostCard key={post.id} post={post}
                                                                    remove={remove}/>)}{!shownPosts.length &&
            <p className="empty">No posts found.</p>}</section>
    </Page>;
}

function CreatePost({add}: { add: (post: Omit<Post, "id" | "comments">) => void }) {
    const navigate = useNavigate();

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        add({
            author: String(form.get("author")).trim(),
            title: String(form.get("title")).trim(),
            body: String(form.get("body")).trim()
        });
        navigate("/");
    }

    return <Page>
        <section className="form-page"><h1>Create a post</h1>
            <form onSubmit={submit}><label>Your name<input name="author" required/></label><label>Title<input
                name="title" required/></label><label>Post<textarea name="body" required rows={6}/></label>
                <div className="form-actions"><Link to="/">Cancel</Link>
                    <button className="button">Publish post</button>
                </div>
            </form>
        </section>
    </Page>;
}

function PostDetails({posts, remove}: { posts: Post[]; remove: (id: string) => void }) {
    const post = posts.find(item => item.id === useParams().id);
    const navigate = useNavigate();
    if (!post) return <Page><p className="empty">Post not found. <Link to="/">Return to feed</Link></p></Page>;
    return <Page><Link className="back-link" to="/">← Back to feed</Link>
        <article className="post-card post-detail"><p className="post-meta">{post.author}</p><h1>{post.title}</h1>
            <p>{post.body}</p>
            <button className="button-text danger" onClick={() => {
                remove(post.id);
                navigate("/");
            }}>Delete post
            </button>
        </article>
        <section className="comments"><h2>Comments ({post.comments.length})</h2>{post.comments.map((comment, index) =>
            <article className="comment" key={index}><strong>{comment.author}</strong><p>{comment.body}</p>
            </article>)}{!post.comments.length && <p>No comments yet.</p>}</section>
    </Page>;
}

function SocialApp() {
    const [posts, setPosts] = useState(initialPosts);
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
