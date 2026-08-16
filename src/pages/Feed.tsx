import type {Post} from "../types/post.ts";
import {useState} from "react";
import Page from "../components/Page.tsx";
import {Link} from "react-router-dom";
import PostCard from "../components/PostCard.tsx";

type FeedProps = {posts: Post[]; loading: boolean; error: string};

const Feed = ({posts, loading, error}: FeedProps) => {
    const [search, setSearch] = useState("");
    const query = search.trim().toLowerCase();

    // Search inside the posts that are already visible in the feed.
    const shownPosts = posts.filter(post =>
        `${post.author} ${post.title} ${post.body}`.toLowerCase().includes(query)
    );

    return <Page>
        <div className="page-heading"><h1>What’s happening?</h1><Link className="button" to="/create">Write a
            post</Link></div>
        <label className="search">Search posts<input value={search} onChange={event => setSearch(event.target.value)}
                                                       placeholder="Search by author, title, or text"/></label>
        {loading && <p className="status">Loading posts…</p>}
        {error && <p className="status error" role="alert">{error}</p>}
        {!loading && !error && <section className="feed">{shownPosts.map(post =>
            <PostCard key={post.id} post={post}/>)}{!shownPosts.length &&
            <p className="empty">No posts found.</p>}</section>}
    </Page>;
}

export default Feed;
