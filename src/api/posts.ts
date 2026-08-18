import type {Comment, NewPost, Post} from "../types/post.ts";

const API_URL = "https://dummyjson.com";

type ApiPost = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

type ApiComment = {
    id: number;
    body: string;
    user: {
        username: string;
        fullName: string;
    };
};

// Convert a post from the API into the format used by our app.
function formatPost(post: ApiPost): Post {
    return {
        ...post,
        author: `User ${post.userId}`,
    };
}

export async function getPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts?limit=30`);
    if (!response.ok) throw new Error("Could not load posts");

    const data = await response.json() as {posts: ApiPost[]};
    return data.posts.map(formatPost);
}

export async function getComments(postId: number): Promise<Comment[]> {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);
    if (!response.ok) throw new Error("Could not load comments");

    const data = await response.json() as {comments: ApiComment[]};
    return data.comments.map(comment => ({
        id: comment.id,
        author: comment.user.fullName || comment.user.username,
        body: comment.body,
    }));
}

export async function createPost(draft: NewPost): Promise<Post> {
    const response = await fetch(`${API_URL}/posts/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: draft.title, body: draft.body, userId: 1}),
    });
    if (!response.ok) throw new Error("Could not create post");

    const post = await response.json() as ApiPost;

    // DummyJSON does not save new posts, so we give each one a local id.
    return {
        ...formatPost(post),
        id: Date.now(),
        author: draft.author,
        isLocal: true,
    };
}

export async function deletePost(postId: number): Promise<void> {
    const response = await fetch(`${API_URL}/posts/${postId}`, {method: "DELETE"});
    if (!response.ok) throw new Error("Could not delete post");
}
