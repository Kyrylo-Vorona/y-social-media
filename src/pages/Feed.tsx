import type {Post} from "@/types/post.ts";
import {useState} from "react";
import Page from "@/components/Page.tsx";
import {Link} from "react-router-dom";
import PostCard from "@/components/PostCard.tsx";

const Feed = ({posts, remove}: { posts: Post[]; remove: (id: string) => void })=>  {
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

export default Feed;