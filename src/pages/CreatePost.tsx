import type {NewPost} from "../types/post.ts";
import {Link, useNavigate} from "react-router-dom";
import {useState, type FormEvent} from "react";
import Page from "../components/Page.tsx";

type CreatePostProps = {
    addPost: (post: NewPost) => Promise<void>;
};

const CreatePost = ({addPost}: CreatePostProps) => {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // FormData reads the values using the input names.
        const form = new FormData(event.currentTarget);
        setSubmitting(true);
        setError("");
        try {
            await addPost({
                author: String(form.get("author")).trim(),
                title: String(form.get("title")).trim(),
                body: String(form.get("body")).trim(),
            });
            navigate("/");
        } catch {
            setError("Could not publish the post. Please try again.");
            setSubmitting(false);
        }
    }

    return (
        <Page>
            <section className="form-page">
                <h1>Create a post</h1>
                <form onSubmit={submit}>
                    <label>
                        Your name
                        <input name="author" required/>
                    </label>
                    <label>
                        Title
                        <input name="title" required/>
                    </label>
                    <label>
                        Post
                        <textarea name="body" required rows={6}/>
                    </label>

                    {error && (
                        <p className="status error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="form-actions">
                        <Link to="/">Cancel</Link>
                        <button className="button" disabled={submitting}>
                            {submitting ? "Publishing…" : "Publish post"}
                        </button>
                    </div>
                </form>
            </section>
        </Page>
    );
};

export default CreatePost;
