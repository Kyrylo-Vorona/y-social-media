import {Link} from "react-router-dom";
import type {Post} from "../types/post";

type PostCardProps = {
    post: Post;
};

const PostCard = ({post}: PostCardProps) => {
    return (
        <article className="post-card">
            <p className="post-meta">{post.author}</p>
            <Link className="post-link" to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </Link>
            <footer className="post-actions">
                <Link to={`/posts/${post.id}`}>View post</Link>
            </footer>
        </article>
    );
};

export default PostCard;
