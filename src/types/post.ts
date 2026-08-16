export type Post = {
    id: string;
    author: string;
    title: string;
    body: string;
    comments: { author: string; body: string }[];
};