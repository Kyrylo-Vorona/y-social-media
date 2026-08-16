import {useEffect, useState, type ReactNode} from "react";
import {Link} from "react-router-dom";

type PageProps = {
    children: ReactNode;
};

const Page = ({children}: PageProps) => {
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {
        // Save the theme so it stays selected after a refresh.
        document.documentElement.dataset.theme = darkMode ? "dark" : "light";
        localStorage.setItem("darkMode", String(darkMode));
    }, [darkMode]);

    return (
        <div className="site-shell">
            <header className="topbar">
                <Link className="brand" to="/" aria-label="KAS home">
                    KAS
                </Link>
                <button
                    className="theme-toggle"
                    type="button"
                    aria-pressed={darkMode}
                    onClick={() => setDarkMode(current => !current)}
                >
                    {darkMode ? "Light mode" : "Dark mode"}
                </button>
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Page;
