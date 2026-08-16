import { Link } from "react-router-dom";

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="site-shell">
            <header className="topbar">
                <Link className="brand" to="/">KAS</Link>
                <nav>
                    <Link to="/">Feed</Link>
                    <Link to="/create">Create post</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Page;