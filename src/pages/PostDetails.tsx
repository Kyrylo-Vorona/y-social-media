import type {Comment, Post} from "../types/post.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Page from "../components/Page.tsx";
import {getComments} from "../api/posts.ts";

type PostDetailsProps = {
    posts: Post[];
    loading: boolean;
    remove: (post: Post) => Promise<void>;
};

const PostDetails = ({posts, loading, remove}: PostDetailsProps) => {
    const postId = Number(useParams().id);
    const post = posts.find(item => item.id === postId);
    const navigate = useNavigate();
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!post) return;
        const currentPost = post;

        // Comments are read-only. New local posts do not have comments yet.
        setComments([]);
        setCommentsError("");
        if (currentPost.isLocal) {
            setCommentsLoading(false);
            return;
        }

        async function loadComments() {
            setCommentsLoading(true);
            try {
                const data = await getComments(currentPost.id);
                setComments(data);
            } catch {
                setCommentsError("Could not load comments.");
            } finally {
                setCommentsLoading(false);
            }
        }

        loadComments();
    }, [post]);

    async function handleDelete() {
        // Always ask for confirmation before deleting a post.
        if (!post || !window.confirm(`Delete “${post.title}”?`)) return;
        setDeleting(true);
        setDeleteError("");
        try {
            await remove(post);
            navigate("/");
        } catch {
            setDeleteError("Could not delete the post. Please try again.");
            setDeleting(false);
        }
    }

    if (loading) return <Page><p className="status">Loading post…</p></Page>;
    if (!post) return <Page><p className="empty">Post not found. <Link to="/">Return to feed</Link></p></Page>;
    return <Page><Link className="back-link" to="/">← Back to feed</Link>
        <article className="post-card post-detail"><p className="post-meta">{post.author}</p><h1>{post.title}</h1>
            <p>{post.body}</p>
            {deleteError && <p className="status error" role="alert">{deleteError}</p>}
            <button className="button-text danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete post"}
            </button>
        </article>
        <section className="comments"><h2>Comments ({comments.length})</h2>
            {commentsLoading && <p className="status">Loading comments…</p>}
            {commentsError && <p className="status error" role="alert">{commentsError}</p>}
            {!commentsLoading && !commentsError && comments.map(comment =>
                <article className="comment" key={comment.id}><strong>{comment.author}</strong><p>{comment.body}</p>
                </article>)}
            {!commentsLoading && !commentsError && !comments.length && <p>No comments yet.</p>}
        </section>
    </Page>;
}

export default PostDetails;
