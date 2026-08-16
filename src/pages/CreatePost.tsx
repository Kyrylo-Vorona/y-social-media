import type {Post} from "@/types/post.ts";
import {Link, useNavigate} from "react-router-dom";
import type {FormEvent} from "react";
import Page from "@/components/Page.tsx";

const CreatePost = ({add}: { add: (post: Omit<Post, "id" | "comments">) => void })=> {
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

export default CreatePost;