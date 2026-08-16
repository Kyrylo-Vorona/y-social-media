import { Link } from "react-router-dom";

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="site-shell">
            <header className="topbar">
                <Link className="brand" to="/" aria-label="KAS home">KAS</Link>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Page;
