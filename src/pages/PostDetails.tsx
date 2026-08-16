import type {Post} from "@/types/post.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import Page from "@/components/Page.tsx";

const PostDetails = ({posts, remove}: { posts: Post[]; remove: (id: string) => void })=> {
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

export default PostDetails;