export type Post = {
    id: number;
    userId: number;
    author: string;
    title: string;
    body: string;
    isLocal?: boolean;
};

export type Comment = {
    id: number;
    author: string;
    body: string;
};

export type NewPost = {
    author: string;
    title: string;
    body: string;
};
