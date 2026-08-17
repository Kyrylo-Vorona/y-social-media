import type {ReactNode} from "react";
import {Link} from "react-router-dom";

type PageProps = {
    children: ReactNode;
};

const Page = ({children}: PageProps) => {
    return (
        <div className="site-shell">
            <header className="topbar">
                <Link className="brand" to="/" aria-label="KAS home">
                    KAS
                </Link>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Page;
